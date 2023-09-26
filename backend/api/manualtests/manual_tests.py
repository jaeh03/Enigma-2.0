import requests

# Define the URL of your transcribe_audio endpoint
url = "http://localhost:8000/api/transcribe-audio/"

# Replace 'your-audio-file.wav' with the actual path to your audio file
audio_file_path = r"C:\Users\John_\Documents\Capstone\Enigma-2.0\backend\api\manualtests\TestAudio.wav"


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