#import assemblyai as aai
import os
import openai
import requests
import time
import traceback
import asyncio
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from pytube import YouTube
from io import BytesIO
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
import assemblyai as aai

# Create your views here.

openai.api_key = os.getenv('SUPERSECRETKEY') # TODO: Replace .env key with your API key
aai.settings.api_key = os.getenv('ASSEMBLYAI_API_KEY')

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
            if 'audio' in request.data:
                audio_file = request.data['audio']

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
    try:
        # Testing only
        # The Missile Knows Where It Is
        yt = YouTube("https://www.youtube.com/watch?v=bZe5J8SVCYQ")

        # Use this for deployment
        # yt = YouTube(url)

        # Get audio stream
        video = yt.streams.filter(only_audio=True).first()
        audio = BytesIO()
        video.stream_to_buffer(audio)

        # Send audio to transcribe-audio endpoint via POST
        # response = requests.post(
        #     'http://localhost:8000/api/transcribe-audio/',
        #     data={'audio' : audio.getvalue()}
        # )

        # Download file as mp3
        # with open('audio.mp3', 'wb') as f:
        #     f.write(audio.getbuffer())

        return JsonResponse({"message": "Download successful"}, status=status.HTTP_200_OK)
    except Exception as e:
        return JsonResponse({"error": "Download Failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([AllowAny]) 
def auto_chapter(request):
    """
    Upload audio files and process them to generate summaries using AssemblyAI.
    """
    if request.method == 'POST':
        audio_file = request.FILES.get('audio_file')

        if not audio_file:
            return Response({"message": "Missing audio file."}, status=status.HTTP_400_BAD_REQUEST)

        # Save the uploaded file temporarily
        temp_filename = "/tmp/uploaded_audio.mp3"
        with open(temp_filename, 'wb+') as destination:
            for chunk in audio_file.chunks():
                destination.write(chunk)

        # Transcribe the audio using AssemblyAI
        config = aai.TranscriptionConfig(auto_chapters=True)
        transcript = aai.Transcriber().transcribe(temp_filename, config)

        chapters_list = []
        for chapter in transcript.chapters:
            chapters_list.append(f"{chapter.start}-{chapter.end}: {chapter.headline}")

        # Return a response
        return Response({"message": "Transcription successful!", "chapters": chapters_list}, status=status.HTTP_200_OK)

    return Response({"message": "Method not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)



