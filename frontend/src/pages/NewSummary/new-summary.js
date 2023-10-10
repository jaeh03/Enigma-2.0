import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import './new-summary.css';
import {useNavigate} from 'react-router-dom';
import { useState } from "react";

function NewSummary({ className }) {
    // const selectedPage = ''; // Replace with the actual selectedPage value
    // const uploadDesc = ''; // Replace with the actual uploadDesc value

    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(false); // State to disable all buttons
    const [selectedBox, setSelectedBox] = useState(null);
  
    const handleBoxClick = (itemId) => {
      setSelectedBox(itemId);
      setIsDisabled(true); // Disable all buttons when one is clicked
  };
  
    const selectPage = (page) => {
      // Implement your selectPage logic here
    };
  
    const navigateToSummarize = () => {
      // 👇️ navigate to /audio-summary-transcription page
      navigate('/audio-summary-transcription');
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedName, setSelectedName] = useState("");

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      setSelectedName(file.name);
      setIsDisabled(true); // Disable all buttons when a file is selected
  
      // Additional validation logic
    };

    const [rating, setRating] = useState(null);
    const [response, setResponse] = useState('');

    const handleRatingClick = (selectedRating) => {
      setRating(selectedRating);
      switch (selectedRating) {
        case 'good':
          setResponse('Thank you for your feedback! We are glad you found it good.');
          break;
        case 'great':
          setResponse('Awesome! Your feedback is greatly appreciated.');
          break;
        case 'bad':
          setResponse('We are sorry for your inconvience');
          break;
        default:
          setResponse('');
          break;
      }
    };

  
    return (
      <div className={`background ${className}`}>
        <div className="title">
        <h1 className="text-wrapper">New Summary</h1>
        </div>
        {/* Three Boxes (2 Buttons and one text area) */}

        <div class="container">
          <div class={`box ${selectedBox === 1 ? 'focused-box' : ''}`} id="box1"
          onClick={() => handleBoxClick(1)}
          disabled={isDisabled}>
          <FontAwesomeIcon class="icon-img" icon={faYoutube} />
          <textarea className="video-link" placeholder="video link" disabled={isDisabled}/>
          </div>


          <button class={`box ${selectedBox === 1 ? 'focused-box' : ''}`} id="box2"
          onClick={() => handleBoxClick(2)}
          disabled={isDisabled}>

          <FontAwesomeIcon class="icon-img2" icon={faUpload} />
          {/* <p id="file-label">{selectedName || "Click box to upload"}</p> */}
          <input className="input-file"
            type="file"
            id="file-input"
            onChange={handleFileChange
            }
          ></input>
          <label htmlFor="file-input" id="file-input-label">{selectedName || "upload file"}</label>

          </button>
          <button class={`box ${selectedBox === 1 ? 'focused-box' : ''}`} id="box3"
          onClick={() => handleBoxClick(1)}
          disabled={isDisabled}
          >
            <FontAwesomeIcon class="icon-img3" icon={faFileLines} />
            <p className="summary-title">input summary</p>
          </button>
          
        </div>

        <button className="next-button" onClick={navigateToSummarize}>
          Next
        </button>

        {/* Feedback Questionaire */}

      <div class="feedback-group">
        <div >
        <h2 class="feedback-question">How would you rate your summarization today?</h2>
        </div>
        {!rating && (
      <div class="feedback-container"> 
        <button className="feedbackBtn" onClick={() => handleRatingClick('good')}>Good</button>
        <button className="feedbackBtn" onClick={() => handleRatingClick('great')}>Great</button>
        <button className="feedbackBtn" onClick={() => handleRatingClick('bad')}>Bad</button>
      </div>
      )}
      {rating && (
        <div className="response-div">
          <p>{response}</p>
        </div>
      )}
      </div>
      </div>
    );
}

export default NewSummary;