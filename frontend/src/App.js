import "./App.css";
import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

// Get CSRF token from cookies
const csrftoken = document.cookie
  .split(";")
  .find((row) => row.trim().startsWith("csrftoken="))
  .split("=")[1];

// Set up Axios to use the CSRF token
axios.defaults.headers.post["X-CSRFToken"] = csrftoken;

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function App() {
  const handleButtonClick = async () => {
    try {
      const response = await client.post("/api/hello/"); // Changed from .get to .post
      alert(response.data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Hello from Enigma's frontend</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button id="form_btn" variant="light" onClick={handleButtonClick}>
                Click to communicate with Enigma's backend!
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;
