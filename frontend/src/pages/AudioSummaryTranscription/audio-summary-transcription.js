import "./audio-summary-transcription.css";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import JsPDF from "jspdf";
import "./PdfGenerator.css"; // Create a CSS file for styling

function AudioSummaryTranscription() {
  const location = useLocation();
  const state = location.state;

  const generatePdf = () => {
    const report = new JsPDF("portrait", "pt", "a4");
    report.html(document.querySelector("#report")).then(() => {
      report.save("report.pdf");
    });
  };

  function msToMMSS(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  const parsedChapters = [];
  const chapters = state.autoChatpers
  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    const chapterMatch = chapter.match(/(\d+)-(\d+): (.+)/);
  
    if (chapterMatch) {
      const start = parseInt(chapterMatch[1], 10);
      const end = parseInt(chapterMatch[2], 10);
      const content = chapterMatch[3];
  
      // Now you can access and manipulate the start, end, and content for each chapter
      console.log(`Chapters ${i + 1}:`);
      console.log(`Start: ${start}`);
      console.log(`End: ${end}`);
      console.log(`Content: ${content}`);
      console.log('\n');

      // Add the parsed chapter to the array
      parsedChapters.push({
        start,
        end,
        content,
      });
    }
  }

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
            <div className="text-wrapper-2">Summarization</div>
            <div className="textarea">
            {parsedChapters.map((chapter, index) => (
    <div key={index}>
      <a href="https://www.google.ca" target="_blank" rel="noopener noreferrer">{msToMMSS(chapter.start)}</a> -  
      <a href={`your-link-here-for-end-${chapter.end}`}>{" "+msToMMSS(chapter.end)}</a> : {chapter.content}
    </div>
  ))}
            </div>
          </div>
        </div>
        <div className="line-breaker"></div>
        <div className="right-half">
          <div className="upper-half">
            <div className="video">
              <div className="text-wrapper-2">Video</div>
              <div className="textarea-video">
                <video className="video" controls></video>
              </div>
            </div>
          </div>
          <div className="lower-half">
            <div className="transcription">
              <div className="text-wrapper-2">Transcription</div>
              <textarea
                className="textarea-transcript"
                value={state.transcriptionData}
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
