import os
import requests

# Define the URL of your transcribe_audio endpoint
url = "http://localhost:8000/api/transcribe-audio/"

# Get the directory of the current script
script_directory = os.path.dirname(os.path.abspath(__file__))

# Specify the relative path to your audio file from the script's directory
audio_file_relative_path = "backend\api\manualtests\TestAudio.wav"

# Combine the script's directory with the relative path to get the absolute path
audio_file_path = os.path.join(script_directory, audio_file_relative_path)

# Create a dictionary with the audio file as a multipart file
files = {'audio_file': open(audio_file_path, 'rb')}

# Send the POST request
response = requests.post(url, files=files)

# Check the response status code
if response.status_code == 200:
    # Print the transcription
    transcription = response.json().get('transcription')
    print("Transcription:")
    print(transcription)
else:
    print("Error:", response.status_code)
    print(response.text)
