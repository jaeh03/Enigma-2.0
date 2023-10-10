import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import './main-page.css';
import {useNavigate} from 'react-router-dom';
import { useState } from "react";


function MainPageUpload ({ className }) {

  const selectedPage = ''; // Replace with the actual selectedPage value
  const uploadDesc = ''; // Replace with the actual uploadDesc value
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedName, setSelectedName] = useState("");
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
  
  const fileSelected = (event) => {
    // Implement your fileSelected logic here
  };

  const selectPage = (page) => {
    // Implement your selectPage logic here
  };

  const navigateToSummarize = () => {
    // navigate to /audio-summary-transcription page
    navigate('/audio-summary-transcription');
  };

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

 
  };
  return (
    <div className={`main ${className}`}>
      <p className="text-wrapper">try now to get lectures summarized</p>
      <div className="div">in seconds</div>
      <p className="p">
        Upload your choice of video or audio and get summarized audio to text. It allows you to extract the most <br></br>
        valuable information quickly and easily from lectures and presentations. Say goodbye to missed deadlines and <br></br>
        wasted time, and start using your time more efficiently.
      </p>
      
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

          <button className="next-button" onClick={navigateToSummarize}>Next</button>

      
     
    </div>
  );
};
export default MainPageUpload;


// function MainPageUpload() {
//   const selectedPage = ''; // Replace with the actual selectedPage value
//   const uploadDesc = ''; // Replace with the actual uploadDesc value
//   const nextPageUrl = ''; // Replace with the actual nextPageUrl value

//   const fileSelected = (event) => {
//     // Implement your fileSelected logic here
//   };

//   const selectPage = (page) => {
//     // Implement your selectPage logic here
//   };
//   return (
//     <div className="container">
//       <div className="header-text">
//         <h1 className="title">try noww to get lectures summarized</h1>
//         <div className="in-seconds">in seconds</div>
//         <p className="app-description">
//           Upload your choice of video or audio and get summarized audio to text.
//           It allows you to extract the most valuable <br />
//           information quickly and easily from lectures and presentations. Say
//           goodbye to missed deadlines and wasted time, <br />
//           and start using your time more efficiently.
//         </p>
//         <div className="generate-title">
//           <div className="upload-section">
//             <input
//               type="file"
//               id="upload"
//               className={selectedPage === 'buffer' ? 'my-custom-class' : ''}
//               onChange={fileSelected}
//               onClick={() => selectPage('buffer')}
//               hidden
//             />
//             <label
//               htmlFor="upload"
//               className={`file-label ${selectedPage === 'buffer' ? 'file-label-active' : ''}`}
//               style={{ width: '30%' }}
//             >
//               <img src="/assets/upload-icon.png" className="upload-icon" />
//               <p className="upload-title">Upload File</p>
//               <p className="upload-desc">{uploadDesc}</p>
//             </label>
//             <a onClick={() => selectPage('text-summary')}>
//               <label
//                 className={`btn-summary ${selectedPage === 'text-summary' ? 'btn-summary-active' : ''}`}
//                 style={{ width: '30%' }}
//               >
//                 <img src="/assets/input-icon.png" className="upload-icon" />
//                 <p className="summary-title">Generate Text Summary</p>
//                 <p className="btn-desc">input text to get summary</p>
//               </label>
//             </a>
//           </div>
//           <div className="btn-next-div">
//             <a href={nextPageUrl} className={`btn-next ${!selectedPage ? 'disabled' : ''}`}>
//               Next
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MainPageUpload;