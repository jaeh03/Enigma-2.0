import os
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import openai

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
            max_tokens=100,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=1
        )
        print("Response: ", response)
        summary = response["choices"][0]["text"]
        return JsonResponse({"summary": summary})
        # return JsonResponse({"message" : "Summarizing text"})
    return JsonResponse({"error": "Invalid request method"})

@csrf_exempt
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

@csrf_exempt
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