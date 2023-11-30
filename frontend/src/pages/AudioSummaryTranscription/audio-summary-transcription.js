import React from "react";
import { useLocation } from "react-router-dom";
import JsPDF from "jspdf";
import "./audio-summary-transcription.css";
import "./PdfGenerator.css";

function AudioSummaryTranscription() {
  const location = useLocation();
  const { contentType, contentData, summaryData, transcriptionData } = location.state;

  console.log("Content Type:", contentType); // Debug log
  console.log("Content Data:", contentData); // Debug log

  const generatePdf = () => {
    const report = new JsPDF("portrait", "pt", "a4");
    report.html(document.querySelector("#report")).then(() => {
      report.save("report.pdf");
    });
  };

  const renderMediaContent = () => {
    if (contentType === 'video') {
      // Render YouTube video iframe
      return (
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/nb6ou_k4OzM" // Assuming this is a video URL
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
        ></iframe>
      );
    } else if (contentType === 'audio') {
      console.log("Rendering audio player"); // Debug log
      const audioUrl = URL.createObjectURL(contentData);
      console.log("Audio URL:", audioUrl); // Debug log
      return (
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      );
    }
  };

  return (
    <div className="summary-page">
      <div className="export-btn-div">
        <button className="export-btn" onClick={generatePdf}>
          Export Notes
          <i className="fa-regular fa-file-export" style={{ marginLeft: "5px" }}></i>
        </button>
      </div>

      <div className="summary-container">
        <div className="left-half">
          <div className="summarization" id="report">
            <div className="text-wrapper-2">Summarization</div>
            <div className="textarea">
              <div>
                {summaryData}
              </div>
              <br></br>
            </div>
          </div>
        </div>
        <div className="line-breaker"></div>
        <div className="right-half">
          <div className="upper-half">
            <div className="media">
              <div className="text-wrapper-2">{contentType === 'video' ? 'Video' : 'Audio'}</div>
              <div className="textarea-media">
                {renderMediaContent()}
              </div>
            </div>
          </div>
          <div className="lower-half">
            <div className="transcription">
              <div className="text-wrapper-2">Transcription</div>
              <textarea
                className="textarea-transcript"
                value={transcriptionData}
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
