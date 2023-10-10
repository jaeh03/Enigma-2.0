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

  
    const handleBoxClick = (boxNumber) => {
      setSelectedBox(boxNumber);
  
      // Enable/disable options based on the selected box.
      if (boxNumber === 1) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
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
      if (file) {
        setSelectedFile(file);
        setSelectedName(file.name);
      } else {
        // Handle the case where no file is selected, e.g., display an error message or reset the selected file and name.
        const message = "No File selected"
        setSelectedName(message)
      }
      // setIsDisabled(true); // Disable all buttons when a file is selected

      // const selectedFile = event.target.files[0];
      // const selectedName = selectedFile ? selectedFile.name : null;
      // setSelectedFile(selectedFile);
      // setSelectedName(selectedFile.name);

      // Handle file selection here
  
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


          <button class={`box ${selectedBox === 2 ? 'focused-box' : ''}`} id="box2"
          onClick={() => handleBoxClick(2)}
          disabled={isDisabled}>

          <FontAwesomeIcon class="icon-img2" icon={faUpload} />
          <input className="input-file"
            type="file"
            id="file-input"
            onChange={handleFileChange}
          ></input>
          <label htmlFor="file-input" id="file-input-label">
          {selectedBox === 2 ? selectedName || selectedName : "Upload file"}
          </label>

          </button>
          <button class={`box ${selectedBox === 3 ? 'focused-box' : ''}`} id="box3"
          onClick={() => handleBoxClick(3)}
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