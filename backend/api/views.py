#import assemblyai as aai
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
from pytube import YouTube
from io import BytesIO

# Create your views here.

openai.api_key = os.getenv('SUPERSECRETKEY') # TODO: Replace .env key with your API key

#aai.settings.api_key = os.getenv('ASSEMBLYAI_API_KEY')
@csrf_exempt
@api_view(['POST'])
def hello_backend(request):
    if request.method == "POST":
        return JsonResponse({"message": "Hello from Enigma's backend. Testing hot reload!"})
    else:
        return JsonResponse({"message": f"Invalid request method used: {request.method}"})

def test_view(request):
    return JsonResponse({"message": "Test successful!"})

def isSpecialCharacter(char):
    special_characters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '{', '}', '[', ']', '|', '\\', ':', ';', '"', "'", '<', '>', ',', '.', '?', '/', '~', '`']
    return char in special_characters


# Summary selector
# Pass summary text into the text field in the request body
# Requests need to pass in a summary type via the summaryType field in the request body, otherwise it will default to paragraph
# Currently available summary types:
#   paragraph
#   point
#   transcript
@csrf_exempt
@api_view(['POST'])
def summarize_selector(request):
    if request.method == "POST":
        try:
            data = request.data
            text = data.get("text", "")
            summary_type = data.get("summaryType", "paragraph")

            if summary_type == "paragraph":
                summarize_text(text)
            elif summary_type == "point":
                summarize_text_point(text)
            elif summary_type == "transcript":
                summarize_text_transcript(text)
            else:
                return JsonResponse({"error": "Invalid summarization type"})
            
        except Exception as e:
            print(e)
            return JsonResponse({"error": "Something went wrong"})
    return JsonResponse({"error": "Invalid request method (POST only)"})


# Regular text summarization
@csrf_exempt
@api_view(['POST'])
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
            max_tokens=100,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=1
        )
        print("Response: ", response)
        # Get the summary from the response and clean up whitespaces
        summary = response["choices"][0]["text"].strip()

        # Remove special characters from the front of the summary and clean up whitespaces again
        if summary and isSpecialCharacter(summary[0]):
            summary = summary[1:].strip()

        return JsonResponse({"summary": summary})
        # return JsonResponse({"message" : "Summarizing text"})
    return JsonResponse({"error": "Invalid request method"})

# Summarization in point form
@csrf_exempt
@api_view(['POST'])
def summarize_text_point(request):
    if request.method == "POST":
        # # Log the raw request data
        # raw_data = request.body.decode("utf-8")
        # print("Raw request data:", raw_data)

        # # Parse the JSON data
        # response = openai.Completion.create(
        #     model="text-davinci-003",
        #     prompt=raw_data + "\n\nTL;DR in point form",
        #     temperature=0.7,
        #     max_tokens=60,
        #     top_p=1,
        #     frequency_penalty=0,
        #     presence_penalty=1
        # )
        # print("Response: ", response)
        # summary = response["choices"][0]["text"]
        # return JsonResponse({"summary": summary})
        return JsonResponse({"message" : "Summarizing text in point form"})
    return JsonResponse({"error": "Invalid request method"})

# Summarization of a transcript
@csrf_exempt
@api_view(['POST'])
def summarize_text_transcript(request):
    if request.method == "POST":
        # # Log the raw request data
        # raw_data = request.body.decode("utf-8")
        # print("Raw request data:", raw_data)

        # # Parse the JSON data
        # response = openai.Completion.create(
        #     model="text-davinci-003",
        #     prompt=raw_data + "\n\nTL;DR in point form",
        #     temperature=0.7,
        #     max_tokens=60,
        #     top_p=1,
        #     frequency_penalty=0,
        #     presence_penalty=1
        # )
        # print("Response: ", response)
        # summary = response["choices"][0]["text"]
        # return JsonResponse({"summary": summary})
        return JsonResponse({"message" : "Summarizing text transcript"})
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
@api_view(['GET'])
def dlAudioTest(url):
    yt = YouTube("https://www.youtube.com/watch?v=tY_3bDHdiiA")
    video = yt.streams.filter(only_audio=True).first()
    audio = BytesIO()
    video.stream_to_buffer(audio)
    with open('audio.mp3', 'wb') as f:
        f.write(audio.getbuffer())

    return Response({'response': 'download worked', 'audio': audio}, status=status.HTTP_200_OK)