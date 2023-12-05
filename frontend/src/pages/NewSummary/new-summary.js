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
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedName, setSelectedName] = useState("");
    const [videoLink, setVideoLink] = useState("");
 
  
    const handleBoxClick = (boxNumber) => {
      setSelectedBox(boxNumber);
  
      // Enable/disable options based on the selected box.
      if (boxNumber === 1) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
  
    const navigateToSummarize = () => {
      if (selectedBox === 1) {
        navigate("/buffer-page", { state: { videoLink } });
      } else if (selectedBox === 2) {
        if (
          selectedFile &&
          typeof selectedFile === "object" &&
          selectedFile.name
        ) {
          navigate("/buffer-page", { state: { selectedFile } });
        } else {
          alert("Please select a file before clicking the button.");
        }
      } else if (selectedBox === 3) {
        navigate("/text-summary");
      }
    };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedFile(file);
        setSelectedName(file.name);
      } else {
        setSelectedName("No File selected");
      }
    };
  

    const [rating, setRating] = useState(null);
    const [response, setResponse] = useState('');

    const handleRatingClick = (selectedRating) => {
      setRating(selectedRating);
      switch (selectedRating) {
        case 'good':
          setResponse('Thank you for your positive feedback!');
          break;
        case 'great':
          setResponse('Awesome! Your feedback is greatly appreciated.');
          break;
        case 'bad':
          setResponse("We're sorry to hear that your experience wasn't up to your expectations.");
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
        <div
          className={`box ${selectedBox === 1 ? "focused-box" : ""}`}
          id="box1"
          onClick={() => handleBoxClick(1)}
          disabled={isDisabled}
        >
          <FontAwesomeIcon className="icon-img" icon={faYoutube} />
          <textarea
            className="video-link"
            placeholder="video link"
            onBlur={(event) => {
              setVideoLink(event.target.value);
            }}
            disabled={isDisabled}
          ></textarea>
        </div>

        <label
          htmlFor="file-input"
          className={`box ${selectedBox === 2 ? "focused-box" : ""}`}
          id="box2"
          onClick={() => handleBoxClick(2)}
        >
          <FontAwesomeIcon className="icon-img2" icon={faUpload} />
          <input
            className="input-file"
            type="file"
            id="file-input"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {selectedName || "Upload file"}
        </label>

        <button
          className={`box ${selectedBox === 3 ? "focused-box" : ""}`}
          id="box3"
          onClick={() => handleBoxClick(3)}
          disabled={isDisabled}
        >
          <FontAwesomeIcon className="icon-img3" icon={faFileLines} />
          <p className="input-summaryBtn">input summary</p>
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