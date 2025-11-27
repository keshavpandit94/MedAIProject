import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import About from "./screens/About";
import Contact from "./screens/Contact";
import DoctorAgent from "./aiAgent/DoctorAgent";
import ReportReader from "./aiAgent/ReportReaderAgent";
import PrescriptionReader from "./aiAgent/PrescriptionReaderAgent";
import AiAgentPage from "./screens/AiAgentPage"; // New Agent Page Import

export default function App() {
  const location = useLocation();

  // Paths where navbar should NOT appear (Agent screens)
  const noNavbarPaths = [
    "/doctor-agent",
    "/report-reader-agent",
    "/prescription-reader-agent",
  ];

  const showNavbar = !noNavbarPaths.includes(location.pathname);
  
  // Define the global background color consistent with the modern dark theme
  const GLOBAL_BG_COLOR = "#18181B"; 

  return (
    <div
      className="min-h-screen"
      style={{
        background: GLOBAL_BG_COLOR,
        color: "#EAEFEF",
      }}
    >
      
      {showNavbar && <Navbar />} 

      {/* Main content wrapper to push content below the fixed navbar */}
      <div className={showNavbar ? "pt-20 md:pt-16" : ""}> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Agent Pages */}
          <Route path="/ai-agent" element={<AiAgentPage />} /> 
          <Route path="/doctor-agent" element={<DoctorAgent />} />
          <Route path="/report-reader-agent" element={<ReportReader />} />
          <Route path="/prescription-reader-agent" element={<PrescriptionReader />} />
        </Routes>
      </div>
    </div>
  );
}