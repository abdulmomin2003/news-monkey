import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { SavedProvider } from "./components/savedContext"; // Import the SavedProvider

const App = () => {
  const pageSize = 9; // Define page size
  const country = "us"; // Default country
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  // Ensure the API key is loaded
  if (!apiKey) {
    console.error(
      "API key is missing. Please set REACT_APP_NEWS_API_KEY in your environment."
    );
  }

  return (
    <SavedProvider>
      <Router>
        {/* Add padding to avoid Navbar overlapping */}
        <div style={{ paddingTop: "70px" }}>
          <Navbar />
        </div>
        <Routes>
          {/* Default Route for General News */}
          <Route
            path="/"
            element={
              <News
                key="general" // Key is used to force re-render when switching categories
                pageSize={pageSize}
                country={country}
                category="general"
                apiKey={apiKey}
              />
            }
          />
          {/* Dynamic Routes for Other Categories */}
          <Route
            path="/:category"
            element={
              <News
                pageSize={pageSize}
                country={country}
                apiKey={apiKey} // Pass the API key to News
              />
            }
          />
        </Routes>
      </Router>
    </SavedProvider>
  );
};

export default App;
