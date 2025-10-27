// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // 방금 만든 App.jsx
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
