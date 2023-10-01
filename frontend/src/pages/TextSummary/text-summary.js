import React from "react";
import "./text-summary.css";

const TextSummary = () => {
  return (
    <div className="background">
      <div className="title-area">
        <div className="text-above-textarea">Text Summary</div>
      </div>
        <div className="text-summary-container">
        <div className="text-half">
            <textarea className="textarea" placeholder="Enter text here..."/>
        </div>
        <div className="text-line"></div>
        <div className="text-half">
            <textarea className="textarea" disabled/>
        </div>
        </div>

        <div className="button-container">
        <button className="btn btn-primary btn-summarize">
            Summarize
        </button>
        </div>
    </div>
  );
};

export default TextSummary;