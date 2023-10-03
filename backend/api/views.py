import assemblyai as aai
import os
import openai
import requests
import time
import traceback
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

openai.api_key = os.getenv('SUPERSECRETKEY') # TODO: Replace .env key with your API key

aai.settings.api_key = os.getenv('ASSEMBLYAI_API_KEY')
@csrf_exempt
def hello_backend(request):
    if request.method == "POST":
        return JsonResponse({"message": "Hello from Enigma's backend. Testing hot reload!"})
    else:
        return JsonResponse({"message": f"Invalid request method used: {request.method}"})



@csrf_exempt
def summarize_text(request):
    if request.method == "POST":
        # Log the raw request data
        raw_data = request.body.decode("utf-8")
        print("Raw request data:", raw_data)

        # Parse the JSON data
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=raw_data + "\n\nTL;DR",
            temperature=0.7,
            max_tokens=60,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=1
        )
        print("Response: ", response)
        summary = response["choices"][0]["text"]
        return JsonResponse({"summary": summary})
    return JsonResponse({"error": "Invalid request method"})

@csrf_exempt
def transcribe_audio(request):
    if request.method == "POST":
        try:
            # Check if an audio file was uploaded
            if 'audio_file' in request.FILES:
                audio_file = request.FILES['audio_file']

                # Set your OpenAI API key from the environment variable
                openai.api_key = os.getenv('SUPERSECRETKEY')

                # Transcribe the audio using the OpenAI Audio API
                response = openai.Audio.transcribe("whisper-1", audio_file)

                # Extract the transcribed text from the response
                transcription = response["text"]

                # Save the transcription to your database or return it as JSON
                return JsonResponse({'transcription': transcription})
            else:
                return JsonResponse({'error': 'No audio file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Handle exceptions and print traceback for debugging
            traceback.print_exc()
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
@csrf_exempt
def detect_topic(request):
    # Replace with your API token

# URL of the file to transcribe
    FILE_URL = "https://github.com/AssemblyAI-Examples/audio-examples/raw/main/20230607_me_canadian_wildfires.mp3"

# AssemblyAI transcript endpoint (where we submit the file)
transcript_endpoint = "https://api.assemblyai.com/v2/upload"

# Request parameters where Topic Detection has been enabled
data = {
    "audio_url": FILE_URL,
    "iab_categories": True
}

# HTTP request headers
headers = {
    "Authorization": f"Bearer {os.getenv('ASSEMBLYAI_API_KEY')}",
    "Content-Type": "application/json"
}

# Submit for transcription via HTTP request
response = requests.post(transcript_endpoint, json=data, headers=headers)

# Check if the request was successful
if response.status_code != 200:
    raise Exception(f"Transcription request failed with status code {response.status_code}: {response.text}")

# Get the transcript ID from the response
transcript_id = response.json().get("id")

# Polling for transcription completion
polling_endpoint = f"https://api.assemblyai.com/v2/transcript/{transcript_id}"

while True:
    transcription_result = requests.get(polling_endpoint, headers=headers).json()

    if transcription_result['status'] == 'completed':
        # Print the results
        print(json.dumps(transcription_result, indent=2))
        break
    elif transcription_result['status'] == 'failed':
        raise Exception(f"Transcription failed: {transcription_result['error']['message']}")
    else:
        time.sleep(5)  # Poll every 5 seconds


@csrf_exempt
def auto_chapter(request):
    # Replace with your AssemblyAI API token
    #YOUR_API_TOKEN = "5108746344074b748a78b229c6b4b87d"

    # API endpoint and headers
    base_url = "https://api.assemblyai.com/v2"
    headers = {
        "authorization": f"Bearer {os.getenv('ASSEMBLYAI_API_KEY')}"
    }

    # Upload your local audio file to the AssemblyAI API
    with open("./my-audio.mp3", "rb") as f:
        response = requests.post(f"{base_url}/upload", headers=headers, data=f)

    # Check if the upload was successful
    if response.status_code != 200:
        raise Exception(f"Audio file upload failed with status code {response.status_code}: {response.text}")

    # Get the upload URL returned by the AssemblyAI API
    upload_url = response.json()["upload_url"]

    # Create a JSON payload with the audio URL
    data = {
        "audio_url": upload_url  # You can also use a URL to an audio or video file on the web
    }

    # Make a POST request to start the transcription
    url = f"{base_url}/transcript"
    response = requests.post(url, json=data, headers=headers)

    # Get the transcript ID from the response
    transcript_id = response.json()['id']
    polling_endpoint = f"https://api.assemblyai.com/v2/transcript/{transcript_id}"

    # Poll for the completion of transcription
    while True:
        transcription_result = requests.get(polling_endpoint, headers=headers).json()

        if transcription_result['status'] == 'completed':
            print(transcription_result['text'])
            break

        elif transcription_result['status'] == 'error':
            raise RuntimeError(f"Transcription failed: {transcription_result['error']}")

        else:
            time.sleep(3)