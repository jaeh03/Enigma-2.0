

function MainPageUpload() {
  const selectedPage = ''; // Replace with the actual selectedPage value
  const uploadDesc = ''; // Replace with the actual uploadDesc value
  const nextPageUrl = ''; // Replace with the actual nextPageUrl value

  const fileSelected = (event) => {
    // Implement your fileSelected logic here
  };

  const selectPage = (page) => {
    // Implement your selectPage logic here
  };
  return (
    <div className="container">
      <div className="header-text">
        <h1 className="title">try noww to get lectures summarized</h1>
        <div className="in-seconds">in seconds</div>
        <p className="app-description">
          Upload your choice of video or audio and get summarized audio to text.
          It allows you to extract the most valuable <br />
          information quickly and easily from lectures and presentations. Say
          goodbye to missed deadlines and wasted time, <br />
          and start using your time more efficiently.
        </p>
        <div className="generate-title">
          <div className="upload-section">
            <input
              type="file"
              id="upload"
              className={selectedPage === 'buffer' ? 'my-custom-class' : ''}
              onChange={fileSelected}
              onClick={() => selectPage('buffer')}
              hidden
            />
            <label
              htmlFor="upload"
              className={`file-label ${selectedPage === 'buffer' ? 'file-label-active' : ''}`}
              style={{ width: '30%' }}
            >
              <img src="/assets/upload-icon.png" className="upload-icon" />
              <p className="upload-title">Upload File</p>
              <p className="upload-desc">{uploadDesc}</p>
            </label>
            <a onClick={() => selectPage('text-summary')}>
              <label
                className={`btn-summary ${selectedPage === 'text-summary' ? 'btn-summary-active' : ''}`}
                style={{ width: '30%' }}
              >
                <img src="/assets/input-icon.png" className="upload-icon" />
                <p className="summary-title">Generate Text Summary</p>
                <p className="btn-desc">input text to get summary</p>
              </label>
            </a>
          </div>
          <div className="btn-next-div">
            <a href={nextPageUrl} className={`btn-next ${!selectedPage ? 'disabled' : ''}`}>
              Next
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPageUpload;