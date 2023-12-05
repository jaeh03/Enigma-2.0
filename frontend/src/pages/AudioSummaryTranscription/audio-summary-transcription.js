import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import JsPDF from "jspdf";
import ReactPlayer from "react-player";
import "./audio-summary-transcription.css";
import "./PdfGenerator.css";

function AudioSummaryTranscription() {
  const location = useLocation();
  const audioRef = useRef(null);
  const playerRef = useRef(null);
  const {
    contentType,
    contentData,
    summaryData,
    transcriptionData,
    autoChapters,
  } = location.state;

  const youtubeEmbedBaseURL = "https://www.youtube.com/embed/";

  const getYouTubeVideoID = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("v");
  };

  console.log("Content Type:", contentType); // Debug log
  console.log("Content Data:", contentData); // Debug log

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
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }

  const parsedChapters = [];
  const chapters = autoChapters;
  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    const chapterMatch = chapter.match(/(\d+)-(\d+): (.+)/);

    if (chapterMatch) {
      const start = parseInt(chapterMatch[1], 10);
      const end = parseInt(chapterMatch[2], 10);
      const content = chapterMatch[3];
      const gist = chapterMatch[4];

      // Now you can access and manipulate the start, end, and content for each chapter
      console.log(`Chapters ${i + 1}:`);
      console.log(`Start: ${start}`);
      console.log(`End: ${end}`);
      console.log(`Content: ${content}`);
      console.log("\n");

      // Add the parsed chapter to the array
      parsedChapters.push({
        start,
        end,
        content,
      });
    }
  }

  // const embedUrl = `${youtubeEmbedBaseURL}${videoID}?start=20`;
  const renderMediaContent = () => {
    if (contentType === "video") {
      // Render YouTube video iframe
      const videoID = getYouTubeVideoID(contentData);
      const embedUrl = `${youtubeEmbedBaseURL}${videoID}`;
      return (
        <ReactPlayer
          ref={playerRef}
          url={embedUrl}
          controls={true}
          playing={false}
          width="100%"
          height="100%"
        />
      );
    } else if (contentType === "audio") {
      console.log("Rendering audio player"); // Debug log
      const audioUrl = URL.createObjectURL(contentData);
      console.log("Audio URL:", audioUrl); // Debug log
      return (
        <audio controls ref={audioRef}>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      );
    }
  };

  // For video player
  // const navigateToTimestamp = (timestamp) => {
  //   const iframe = document.querySelector('iframe');
  //   if (iframe) {
  //     const videoID = getYouTubeVideoID(contentData);
  //     const embedUrl = `${youtubeEmbedBaseURL}${videoID}?start=${timestamp / 100}`;

  //     iframe.contentWindow.postMessage(
  //       {
  //         event: 'seekTo',
  //         data: timestamp / 1000, // Convert timestamp to seconds
  //         embedUrl: embedUrl,
  //       },
  //       '*'
  //     );
  //   }
  // };

  const navigateToTimestamp = (timestamp) => {
    if (typeof timestamp === "string") {
      const [minutes, seconds] = timestamp.split(":").map(Number);
      if (!isNaN(minutes) && !isNaN(seconds)) {
        const totalSeconds = minutes * 60 + seconds;
        if (playerRef.current) {
          playerRef.current.seekTo(totalSeconds, "seconds");
        }
      } else {
        console.error("Invalid timestamp:", timestamp);
      }
    } else {
      console.error("Timestamp should be a string:", timestamp);
    }
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
              <div>{summaryData}</div>
              <br></br>
              {parsedChapters.map((chapter, index) => (
                <div key={index}>
                  <a
                    className="timestamps"
                    onClick={() => navigateToTimestamp(msToMMSS(chapter.start))}
                  >
                    {msToMMSS(chapter.start)}
                  </a>
                  -
                  <a
                    className="timestamps"
                    onClick={() => navigateToTimestamp(msToMMSS(chapter.end))}
                  >
                    {msToMMSS(chapter.end)}
                  </a>
                  : {chapter.content}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="line-breaker"></div>
        <div className="right-half">
          <div className="upper-half">
            <div className="media">
              <div className="text-wrapper-2">
                {contentType === "video" ? "Video" : "Audio"}
              </div>
              <div className="textarea-media">{renderMediaContent()}</div>
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
