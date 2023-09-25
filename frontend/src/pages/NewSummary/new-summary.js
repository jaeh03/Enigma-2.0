import React from "react";
import './new-summary.css';
import {useNavigate} from 'react-router-dom';
import youtubeIcon from '../../images/youtube.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';


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
          {/* <img
            className="you-tube"
            alt="You tube"
            src="https://cdn.animaapp.com/projects/64252e1554bf0badf3b6075d/releases/64fd585518c1533d05dd887e/img/youtube.svg"
          /> */}
          {/* <img className="yotube-img" src={youtubeIcon} alt="youtube icon" /> */}
          <FontAwesomeIcon icon={faYoutube} />
          <textarea className="text-area" placeholder="video link" />
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

