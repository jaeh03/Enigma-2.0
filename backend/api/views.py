import os
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import openai
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

openai.api_key = os.getenv('SUPERSECRETKEY') # TODO: Replace .env key with your API key

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


@api_view(['POST'])
def transcribe_audio(request):
    if request.method == "POST":
        audio_file = request.FILES.get('audio_file')
       
        if audio_file:
            # Read the audio file content
            audio_data = audio_file.read()

            # Perform audio transcription using OpenAI API
            response = openai.Transcription.create(
                audio=audio_data,
                content_type="audio/wav",
                language="en-US"
            )
           
            # Check if there are transcriptions in the response
            if 'transcriptions' in response:
                # Extract the transcribed text from the first transcription (assuming only one transcription)
                transcription = response['transcriptions'][0]['text']

                # Save the transcription to your database or return it as JSON
                return Response({'transcription': transcription}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'No transcriptions found in the response'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error': 'No audio file provided'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
