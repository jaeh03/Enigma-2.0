import React from "react";
import './audio-summary-transcription.css';

function AudioSummaryTranscription (props) {
  const { transcript, summary, timestamps } = props;

  const jumpToSection = (timestamp) => {
    // Implement your jumpToSection logic here
  };

    return (
      <div>
        hello
        </div>
      
    );
  };

  export default AudioSummaryTranscription;
  
  // return (
    
    
    // <div className="root">
    //   <div>Hiiiii</div>
    //   <audio ref={myAudio} controls className="audio-player">
    //     <source src="/assets/summaryAudio.mp3" type="audio/mpeg" />
    //   </audio>

    //   <div className="title-area">
    //     <div className="text-above-textarea">Transcript</div>
    //     <div className="text-above-summary">Summarization</div>
    //   </div>

    //   <div className="parent">
    //     <div className="container">
    //       <textarea
    //         className="textarea"
    //         placeholder="Transcription"
    //         disabled
    //         value={transcript}
    //       ></textarea>
    //       <div className="line"></div>

    //       <div className="summary-and-timestamps">
    //         <ul>
    //           {summary.split('\n').map((line, i) => (
    //             <li key={i}>
    //               <span className="timestamp" onClick={() => jumpToSection(timestamps[i])}>
    //                 {timestamps[i]}
    //               </span>{' '}
    //               {line}
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </div>
//   );
// }


// export default AudioSummaryTranscription;