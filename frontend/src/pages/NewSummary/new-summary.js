import React from "react";
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <p className="text-wrapper">New Summary</p>
        <div class="container">
          <div class="box" id="box1">
          <FontAwesomeIcon icon={faYoutube} />
          <textarea className="text-area" placeholder="video link" />
          Youtube
          </div>
          <div class="box" id="box2">
            Upload
          </div>
          <button class="summaryButton" id="box3">
            Summary
          </button>
        </div>

        <button className="next-button" onClick={navigateToSummarize}>
          Next
        </button>
      </div>
    );
}

export default NewSummary;

