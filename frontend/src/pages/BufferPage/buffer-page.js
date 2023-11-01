import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import './buffer-page.css';
import soundImg from '../../images/sound.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const client = axios.create({
	baseURL: "http://127.0.0.1:8000/api/",
});

function BufferPage() {
	const location = useLocation();
	const state = location.state;
	const navigate = useNavigate();
	const [transcriptionData, setTranscriptionData] = useState("");

	useEffect(() => {
		if (state && state.videoLink) {
			// Process the video link
			processVideoLink(state.videoLink);
		} else if (state && state.selectedFile) {
			// Process the selected file
			processSelectedFile(state.selectedFile);
		}
	}, [state]); // Re-run the effect when state changes

	function processVideoLink(videoLink) {
		// implement validation
		DownloadAudio(videoLink).then((audioData) => {
			TranscribeAudioData(audioData).then((transcriptionData) => {
				console.log('Transcription:', transcriptionData)
				setTranscriptionData(transcriptionData)
				navigate("/audio-summary-transcription", { state: { transcriptionData } });
			})
			.catch((error) => {
				console.log('Error transcribing video link: ' + error)
			})
		})
	}

	return (
		<div className="summary-page">
			<img className="sound-img" src={soundImg} alt="sound image" />
			<div className="text-description">
				We are processing your file. This may take <br></br>
				a few seconds.
			</div>
		</div>

	);
};



async function DownloadAudio(videoLink) {
	try {
		console.log('Calling downloadAudio')
		const response = await client.post('/download_Audio/', { url: videoLink })
		console.log('Audio downloaded')

		const audioData = atob(response.data.audio_data)
		const uint8Array = new Uint8Array(audioData.length);
        for (let i = 0; i < audioData.length; i++) {
            uint8Array[i] = audioData.charCodeAt(i);
        }

		return uint8Array
	} catch (error) {
		console.log("Error calling downloadAudio: " + error)
	}
}

async function TranscribeAudioData(audioData) {
	try {
		const audioArrayBuffer = audioData.buffer;
		const audioBlob = new Blob([audioArrayBuffer], { type: 'audio/wav' });

		const formData = new FormData()
		formData.append('audio', audioBlob, 'audio.wav')

		const transcrptionResponse = await client.post('/transcribe-audio/', formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})

		return transcrptionResponse.data.transcription
	} catch (error) {
		console.log("Error calling transcribeAudio: " + error)
	}
}

function processSelectedFile(selectedFile) {
	// implement validation
}

export default BufferPage;