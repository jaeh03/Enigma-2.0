import React from "react";
import './buffer-page.css';

const BufferPage = () => {
  return (
<div class="page-container">
	<div>
		<img class="buffer-img" src="/assets/bufferImg.png"/>
		<div>
			<p class="buffer-description">We are processing your file. This may <br/>take a few seconds</p>
			<div class="buffer-description">
				{{ loadText }}
			</div>
		
		</div>
	</div>

</div>
  );
};

export default BufferPage;