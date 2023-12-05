import React from "react";
import "./text-summary.css";
import axios from "axios";
import { useState } from "react";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

const TextSummary = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isPointForm, setIsPointForm] = useState(false);
  
  const SummarizeText = async () => {
    setOutputText("Summarizing...");
    try{
      const response = await client.post("/summarize/", {text: inputText, summaryType: isPointForm ? "point" : "paragraph"});
      console.log(response.data.summary);
      setOutputText(response.data.summary);
    } catch (error) {
      setOutputText("Error summarizing text");
    }
  };
  
  return (
    <div className="background-text">
      <div className="title-area">
        <div className="fab fa-react">Text Summary</div>
      </div>
        <div className="text-summary-container">
        <div className="text-half">
          {/* Input text area */}
            <textarea className="textarea"
            placeholder="Enter text here..."
            value = {inputText}
            onChange={(e) => setInputText(e.target.value)}
            />
        </div>
        <div className="text-line"></div>
        <div className="text-half">
          {/* Output text area */}
            <textarea className="textarea" disabled value={outputText}/>
        </div>
        </div>

        <div className="pointFormContainer">
        <text className="pointForm">
          Point Form
        </text>
        <div className="toggle-switch">
            <input className="checkbox" type="checkbox" id="flexSwitchCheckDefault" checked={isPointForm} onChange={() => setIsPointForm(!isPointForm)} />
            <label className="label" for="flexSwitchCheckDefault">
            <span className="inner" /> 
          <span className="switch" /></label>
          </div>
        <div className="button-container">
          <button className="btnSummarize" onClick={SummarizeText}>Summarize</button>
 
        </div>
    </div>
    </div>
  );
};

export default TextSummary;