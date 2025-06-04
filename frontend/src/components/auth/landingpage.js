// src/components/LandingPage.js

import React, { useState } from "react";
import Register from "./register";
import Login from "./login";
import "./landingpage.css";

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <div className="landing-container">
        <div className="left-panel">
          <div className="image-carousel" style={{ marginBottom: "7px" }}>
            <img src="/assets/scenary1.webp" alt="Scenery 1" />
            <img src="/assets/scenary2.jpg" alt="Scenery 2" />
            <img src="/assets/scenary5.webp" alt="Scenery 3" />
            <img src="/assets/scenary4.jpg" alt="Scenery 4" />
          </div>
          <h3>Welcome to NomadNotes !!!</h3>

          <p className="typing-effect" style={{ marginTop: "4px" }}>
             Explore,Capture and Upload your memories. 
          </p>
        </div>

        <div className="right-panel">
          <div className="auth-form">
            {showLogin ? <Login /> : <Register />}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 NomadNotes. All rights reserved.</p>
    </footer>
  );
}

export default LandingPage;
