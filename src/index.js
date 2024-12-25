import React from "react";
import ReactDOM from "react-dom/client"; // React 18 import
import App from "./App";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container); // Only pass the container here

root.render(<App />); // No need to pass the container again
