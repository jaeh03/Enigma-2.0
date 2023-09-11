import React from "react";
import "./audio-summary-transcription.css";

function AudioSummaryTranscription() {
  return (
    <div className="summary-page">
      <div className="export-btn-div">
        <button className="export-btn">
          Export Notes
          <i
            class="fa-regular fa-file-export"
            style={{ marginLeft: "5px" }}
          ></i>
        </button>
      </div>

      <div className="summary-container">
        <div className="left-half">
          <div className="summarization">
            <div className="text-wrapper-2">Summarization</div>
            <textarea className="textarea" />
          </div>
        </div>
        <div className="line-breaker"></div>
        <div className="right-half">
          <div className="upper-half">
            <div className="video">
              <div className="text-wrapper-2">Video</div>
              <div className="textarea-video" >
              <video className="video" controls></video>
              </div>
            </div>
          </div>
          <div className="lower-half">
            <div className="transcription">
              <div className="text-wrapper-2">Transcription</div>
              <textarea className="textarea-transcript" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioSummaryTranscription;