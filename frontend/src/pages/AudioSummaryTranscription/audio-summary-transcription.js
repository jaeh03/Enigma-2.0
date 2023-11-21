import "./audio-summary-transcription.css";
import React, { useState, useRef } from "react";
// import ReactPlayer from 'react-player';
import { useLocation } from "react-router-dom";
import JsPDF from "jspdf";
import "./PdfGenerator.css"; // Create a CSS file for styling


function AudioSummaryTranscription() {
  const location = useLocation();
  const state = location.state;
  const playerRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);

  const handleReady = (player) => {
    // Store the player reference
    playerRef.current = player;

    // Fetch video duration
    setVideoDuration(player.getDuration());
  };

  const navigateToTimestamp = (timestamp) => {
    // Check if the player reference is available
    if (playerRef.current) {
      // Seek to the specific timestamp in the video
      playerRef.current.seekTo(timestamp, 'seconds');
    }
  };

  const videoStyle = {
    height: '100%',
    width: '100%',
    // Add any other styles if needed
  };

  const generatePdf = () => {
    const report = new JsPDF("portrait", "pt", "a4");
    report.html(document.querySelector("#report")).then(() => {
      report.save("report.pdf");
    });

  
  };

  // function msToMMSS(milliseconds) {
  //   const totalSeconds = Math.floor(milliseconds / 1000);
  //   const minutes = Math.floor(totalSeconds / 60);
  //   const seconds = totalSeconds % 60;
  //   return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  // }

  // const parsedChapters = [];
  // const chapters = state.autoChatpers
  // for (let i = 0; i < chapters.length; i++) {
  //   const chapter = chapters[i];
  //   const chapterMatch = chapter.match(/(\d+)-(\d+): (.+)/);
  
  //   if (chapterMatch) {
  //     const start = parseInt(chapterMatch[1], 10);
  //     const end = parseInt(chapterMatch[2], 10);
  //     const content = chapterMatch[3];
  
  //     // Now you can access and manipulate the start, end, and content for each chapter
  //     console.log(`Chapters ${i + 1}:`);
  //     console.log(`Start: ${start}`);
  //     console.log(`End: ${end}`);
  //     console.log(`Content: ${content}`);
  //     console.log('\n');

  //     // Add the parsed chapter to the array
  //     parsedChapters.push({
  //       start,
  //       end,
  //       content,
  //     });
  //   }
  // }

  return (
    <div className="summary-page">
      <div className="export-btn-div">
        <button className="export-btn" onClick={generatePdf}>
          Export Notes
          <i
            className="fa-regular fa-file-export"
            style={{ marginLeft: "5px" }}
          ></i>
        </button>
      </div>

      <div className="summary-container">
        <div className="left-half">
          <div className="summarization" id="report">
            <div className="text-wrapper-ast">Summarization</div>
            <div className="textarea">
            <div>
        <button onClick={() => navigateToTimestamp(30)}>30 seconds</button>
        <button onClick={() => navigateToTimestamp(60)}>1 minute</button>
        {/* Add more buttons for other timestamps */}
      </div>
              <div>
                {/* {state.summaryData} */}
              </div>
              <br></br>
            {/* {parsedChapters.map((chapter, index) => (
        <div key={index}>
        <a href="https://www.google.ca" target="_blank" rel="noopener noreferrer">{msToMMSS(chapter.start)}</a> -  
        <a href={`your-link-here-for-end-${chapter.end}`}>{" "+msToMMSS(chapter.end)}</a> : {chapter.content}
        </div>
  ))} */}
            </div>
          </div>
        </div>
        <div className="line-breaker"></div>
        <div className="right-half">
          <div className="upper-half">
            <div className="video">
              <div className="text-wrapper-ast">Video</div>
              <div className="textarea-video">
                {/* <video className="video" controls></video> */}
                <div className="video">
                {/* <ReactPlayer
        url="https://www.youtube.com/watch?v=ywg7cW0Txs4"
        controls
        onReady={handleReady}
        width="100%"
        height="100%"/> */}
                </div>
              </div>
            </div>
          </div>
          <div className="lower-half">
            <div className="transcription">
              <div className="text-wrapper-ast">Transcription</div>
              <textarea
                className="textarea-transcript"
                // value={state.transcriptionData}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioSummaryTranscription;
