import React from "react";
import './buffer-page.css';

function BufferPage() {
  return (
		<div className="summary-page">
			<img className="sound-img" src={soundImg} alt="sound image" />
			<div className="text-description">
				We are processing your file. This may take <br></br>
				a few seconds.
			</div>
		</div>
		
  );
};

export default BufferPage;