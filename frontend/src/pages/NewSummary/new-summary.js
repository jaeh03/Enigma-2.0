import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import './new-summary.css';
import {useNavigate} from 'react-router-dom';




function NewSummary({ className }) {
    const selectedPage = ''; // Replace with the actual selectedPage value
    const uploadDesc = ''; // Replace with the actual uploadDesc value
    const navigate = useNavigate();
  
    const fileSelected = (event) => {
      // Implement your fileSelected logic here
    };
  
    const selectPage = (page) => {
      // Implement your selectPage logic here
    };
  
    const navigateToSummarize = () => {
      // 👇️ navigate to /audio-summary-transcription page
      navigate('/audio-summary-transcription');
    };
    return (
      <div className={`background ${className}`}>
        <div className="title">
        <h1 className="text-wrapper">New Summary</h1>
        </div>
        {/* Three Boxes (2 Buttons and one text area) */}
        <div class="container">
          <div class="box" id="box1">
          <FontAwesomeIcon class="icon-img" icon={faYoutube} />
          <textarea className="video-link" placeholder="video link" />
          
          </div>
          <div class="box" id="box2">
          <FontAwesomeIcon class="icon-img2" icon={faUpload} />
            Upload
          </div>
          <button class="box" id="box3">
            <FontAwesomeIcon class="icon-img3" icon={faFileLines} />
            <p className="summary-title">Summary</p>
          </button>
        </div>

        <button className="next-button" onClick={navigateToSummarize}>
          Next
        </button>
      </div>
    );
}

export default NewSummary;

