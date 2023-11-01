import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import "./main-page.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

function MainPageUpload({ className }) {
  const selectedPage = ""; // Replace with the actual selectedPage value
  const uploadDesc = ""; // Replace with the actual uploadDesc value
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [isDisabled, setIsDisabled] = useState(false); // State to disable all buttons
  const [selectedBox, setSelectedBox] = useState(null);

  const handleButtonAuto = async () => {
    try {
      const response = await client.post("/auto_chapter/"); // Changed from .get to .post
      alert(response.data.message);
    } catch (error) {
      alert(`Error calling backend: ${error}`);
    }
  };

  const handleBoxClick = (boxNumber) => {
    setSelectedBox(boxNumber);

    // Enable/disable options based on the selected box.
    if (boxNumber === 1) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const fileSelected = (event) => {
    // Implement your fileSelected logic here
  };

  const selectPage = (page) => {
    // Implement your selectPage logic here
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
      const message = "No File selected";
      setSelectedName(message);
    }
  };

  const handleButtonClick = async () => {
    if (selectedFile && typeof selectedFile === "object" && selectedFile.name) {
      const formData = new FormData();
      formData.append("audio_file", selectedFile);

      try {
        const response = await client.post("/auto_chapter/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert(response.data.message);

        // Print chapters to the browser's console
        console.log("Chapters:", response.data.chapters);
      } catch (error) {
        alert(`Error calling backend: ${error.message}`);
      }
    } else {
      alert("Please select a file before clicking the button.");
    }
    console.log(
      "The file name is " +
        (selectedFile ? selectedFile.name : "No file selected")
    );
  };

  return (
    <div className={`main ${className}`}>
      <p className="text-wrapper">try now to get lectures summarized</p>
      <div className="div">in seconds</div>
      <p className="p">
        Upload your choice of video or audio and get summarized audio to text.
        It allows you to extract the most <br></br>
        valuable information quickly and easily from lectures and presentations.
        Say goodbye to missed deadlines and <br></br>
        wasted time, and start using your time more efficiently.
      </p>

      <div className="container">
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

        <button
          className={`box ${selectedBox === 2 ? "focused-box" : ""}`}
          id="box2"
          onClick={() => handleBoxClick(2)}
          disabled={isDisabled}
        >
          <FontAwesomeIcon className="icon-img2" icon={faUpload} />
          <input
            className="input-file"
            type="file"
            id="file-input"
            onChange={handleFileChange}
          ></input>
          <label htmlFor="file-input" id="file-input-label">
            {selectedBox === 2 ? selectedName || selectedName : "Upload file"}
          </label>
        </button>
        <button
          className={`box ${selectedBox === 3 ? "focused-box" : ""}`}
          id="box3"
          onClick={() => handleBoxClick(3)}
          disabled={isDisabled}
        >
          <FontAwesomeIcon className="icon-img3" icon={faFileLines} />
          <p className="summary-title">input summary</p>
        </button>
      </div>

      <button className="next-button" onClick={navigateToSummarize}>
        Next
      </button>
    </div>
  );
}
export default MainPageUpload;
