import os
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import openai

# Create your views here.

openai.api_key = os.getenv('OPEN_API_KEY') # TODO: Replace .env key with your API key

@csrf_exempt
def hello_backend(request):
    if request.method == "POST":
        return JsonResponse({"message": "Hello from Enigma's backend. Testing hot reload!"})
    else:
        return JsonResponse({"message": f"Invalid request method used: {request.method}"})

def test_view(request):
    return JsonResponse({"message": "Test successful!"})

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
