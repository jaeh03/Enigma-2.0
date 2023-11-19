import "./audio-summary-transcription.css";
import React from "react";
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
              <div>
                {state.summaryData}
              </div>
              <br></br>
            </div>
          </div>
        </div>
        <div className="line-breaker"></div>
        <div className="right-half">
          <div className="upper-half">
            <div className="video">
              <div className="text-wrapper-2">Video</div>
              <div className="textarea-video">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/EthDXAPgC9U?si=BnZI_AvRNRoWnSYR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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
