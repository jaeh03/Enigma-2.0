import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPageUpload from "./pages/MainPageUpload/main-page-upload";
import About from "./pages/About/about-page";
import AudioSummaryTranscription from "./pages/AudioSummaryTranscription/audio-summary-transcription";
import BufferPage from "./pages/BufferPage/buffer-page";
import axios from "axios";
import EnigmaNavbar from "./components/EnigmaNavbar/Navbar";

//TODO: implement the backend before making the post requests
const client = axios.create({
  baseURL: "http://127.0.0.1:8000", // url where Django backend is running
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bg">
        <EnigmaNavbar />
        <Routes>
          <Route exact path="/" element={<MainPageUpload />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/audio-summary-transcription"
            element={<AudioSummaryTranscription />}
          />
          <Route path="/buffer-page" element={<BufferPage />} />
        </Routes>
      </div>
    );
  }
}
