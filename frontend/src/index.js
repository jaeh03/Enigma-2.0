import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const root = document.getElementById("root");
const appRoot = ReactDOM.createRoot(root);

appRoot.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
