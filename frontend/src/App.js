import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPageUpload from "./pages/MainPageUpload/main-page-upload";
import About from "./pages/About/about-page";
import AudioSummaryTranscription from "./pages/AudioSummaryTranscription/audio-summary-transcription";
import BufferPage from "./pages/BufferPage/buffer-page";
import TextSummary from "./pages/TextSummary/text-summary";
import axios from "axios";
import EnigmaNavbar from "./components/EnigmaNavbar/Navbar";
import Button from "react-bootstrap/Button"; // if you are using react-bootstrap
import NewSummary from "./pages/NewSummary/new-summary";

//TODO: implement the backend before making the post requests
const client = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

const handleButtonClick = async () => {
  try {
    const response = await client.post("/hello/"); // Changed from .get to .post
    alert(response.data.message);
  } catch (error) {
    alert(`Error calling backend: ${error}`);
  }
};

export default class App extends React.Component {
  render() {
    return (
      <div className="bg">
        <EnigmaNavbar />
        <Button id="form_btn" variant="success" onClick={handleButtonClick}>
          Click to communicate with Enigma's backend!
        </Button>
        <Routes>
          <Route exact path="/" element={<MainPageUpload />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/audio-summary-transcription"
            element={<AudioSummaryTranscription />}
          />
          <Route path="/buffer-page" element={<BufferPage />} />
          <Route path="/new-summary" element={<NewSummary />} />
          <Route path="/text-summary" element={<TextSummary />} />
        </Routes>
      </div>
    );
  }
}
