import React, { useState } from "react";
// Import useLocation for dynamic active state
import { Link, useLocation } from "react-router-dom"; 
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "../assets/Image/logo.png";

export default function Navbar() {
  const [desktopDropdown, setDesktopDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);
  
  // FIX: Use real location path for active state
  const location = useLocation();
  const activeLink = location.pathname; 

  // Define the common dark glass style for reuse, now with a gradient
  const darkGlassStyle = {
    background: "linear-gradient(90deg, #222222DD 0%, #333333DD 100%)",
    backdropFilter: "blur(12px)",
    border: "1px solid #7F8CAA55",
    boxShadow: "0 6px 25px rgba(0,0,0,0.5)",
  };

  // Define the style for the dropdown background
  const dropdownStyle = {
    background: "#333446DD",
    border: "1px solid #7F8CAA55",
    color: "#EAEFEF",
    backdropFilter: "blur(10px)",
  };

  // NEW MODERN STYLE: Solid background for the active link (Desktop & Mobile)
  const activeLinkStyle = {
    background: "#0E7490", // A deep teal/sky blue solid background
    color: "#EAEFEF",
    fontWeight: 600, // Semi-bold
    borderRadius: '9999px', // Full rounded (matching button shape)
  };

  // Helper for hover styles
  const getHoverStyle = (isDropdown = false) => ({
    background: isDropdown ? "#55566A33" : "#7F8CAA33",
    borderRadius: isDropdown ? '0.375rem' : '0.5rem',
  });

  // Handle focus loss for desktop dropdown
  const handleDropdownBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setDesktopDropdown(false);
    }
  };
  
  // Helper to determine and apply desktop link styles, factoring in the active state
  const getDesktopLinkStyle = (path) => {
      // Check if the current path OR any specific agent path is active
      const isActive = activeLink === path;

      if (isActive) {
          return activeLinkStyle;
      }
      return { color: "#EAEFEF", background: 'transparent' };
  };

  // Helper to handle click (removed setActiveLink)
  const handleLinkClick = (path) => {
      setMobileMenu(false);
      // If clicking a specific agent, ensure the main AI Agent button is not explicitly highlighted here.
  };
  
  // Check if any agent link (including the main /ai-agent page or specific agents) is currently active
  const isAnyAgentActive = activeLink.includes('agent');
  
  // Determine if the main AI Agent button should have active styling
  const getAgentButtonStyle = () => {
      if (desktopDropdown || isAnyAgentActive) {
          return { 
              color: "#EAEFEF", 
              background: "#7F8CAA33", 
              border: '1px solid #5DBCD2'
          };
      }
      return { 
          color: "#EAEFEF", 
          background: 'transparent',
          border: '1px solid transparent'
      };
  };

  // Determine if a link is currently active for setting the onMouseLeave style correctly
  const getLinkOnMouseLeaveStyle = (path) => {
      if (activeLink === path) {
          return activeLinkStyle;
      }
      return { background: 'transparent' };
  };


  return (
    // Outer container handles fixed positioning and horizontal padding
    <div className="fixed top-2 z-50 w-full px-4"> 
        <nav 
            className="w-full max-w-6xl mx-auto py-3 rounded-full"
            style={darkGlassStyle}
        >
          <div className="flex justify-between items-center px-4"> 

            {/* Logo */}
            <h1 
                className="text-xl font-bold flex items-center gap-1 cursor-pointer" 
                style={{ color: "#EAEFEF" }}
                onClick={() => handleLinkClick('/')}
            >
                <img src={logo} alt="MedAI" className="w-6 h-6 rounded-full object-cover" />

                <span className="ml-2">Med<span className="text-sky-400">AI</span></span>
            </h1>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-2 items-center text-sm"
              style={{ color: "#B8CFCE" }}
            >
              <li>
                <Link
                  to="/"
                  className="px-4 py-2 rounded-full transition-colors font-medium"
                  style={getDesktopLinkStyle('/')}
                  onMouseEnter={(e) => Object.assign(e.target.style, getHoverStyle())}
                  onMouseLeave={(e) => Object.assign(e.target.style, getLinkOnMouseLeaveStyle('/'))}
                  onClick={() => handleLinkClick('/')}
                >
                  Home
                </Link>
              </li>

              {/* AI Agent Page Link */}
              <li>
                <Link
                  to="/ai-agent"
                  className="px-4 py-2 rounded-full transition-colors font-medium"
                  style={getDesktopLinkStyle('/ai-agent')}
                  onMouseEnter={(e) => Object.assign(e.target.style, getHoverStyle())}
                  onMouseLeave={(e) => Object.assign(e.target.style, getLinkOnMouseLeaveStyle('/ai-agent'))}
                  onClick={() => handleLinkClick('/ai-agent')}
                >
                  AI Agents
                </Link>
              </li>

              {/* Desktop Dropdown for specific agents */}
              <li className="relative" onBlur={handleDropdownBlur} tabIndex={-1}>
                <button
                  onClick={() => setDesktopDropdown(!desktopDropdown)}
                  className={`px-4 py-2 rounded-full flex items-center gap-1 transition-colors font-medium hover:border-sky-500/50`}
                  style={getAgentButtonStyle()}
                  onMouseEnter={(e) => Object.assign(e.target.style, getHoverStyle())}
                  onMouseLeave={(e) => Object.assign(e.target.style, getAgentButtonStyle())}
                >
                  Agents Quick Access <ChevronDown size={16} className={desktopDropdown ? 'rotate-180 transition-transform' : 'transition-transform'} />
                </button>
                {desktopDropdown && (
                  <div
                    className="absolute rounded-xl p-3 mt-2 w-48 text-sm z-30 right-0 md:left-0 origin-top animate-fade-in"
                    style={dropdownStyle}
                  >
                    <Link 
                        className={`block px-3 py-2 rounded-lg transition-colors font-normal hover:bg-[#7F8CAA33]`}
                        style={{ color: activeLink === '/doctor-agent' ? '#5DBCD2' : '#EAEFEF' }}
                        to="/doctor-agent"
                        onClick={() => handleLinkClick('/doctor-agent')}
                    >
                      Doctor Assistant
                    </Link>
                    <Link 
                        className={`block px-3 py-2 rounded-lg transition-colors font-normal hover:bg-[#7F8CAA33]`}
                        style={{ color: activeLink === '/report-reader-agent' ? '#5DBCD2' : '#EAEFEF' }}
                        to="/report-reader-agent"
                        onClick={() => handleLinkClick('/report-reader-agent')}
                    >
                      Report Reader
                    </Link>
                    <Link 
                        className={`block px-3 py-2 rounded-lg transition-colors font-normal hover:bg-[#7F8CAA33]`}
                        style={{ color: activeLink === '/prescription-reader-agent' ? '#5DBCD2' : '#EAEFEF' }}
                        to="/prescription-reader-agent"
                        onClick={() => handleLinkClick('/prescription-reader-agent')}
                    >
                      Prescription Reader
                    </Link>
                  </div>
                )}
              </li>

              <li>
                <Link
                  to="/about"
                  className="px-4 py-2 rounded-full transition-colors font-medium"
                  style={getDesktopLinkStyle('/about')}
                  onMouseEnter={(e) => Object.assign(e.target.style, getHoverStyle())}
                  onMouseLeave={(e) => Object.assign(e.target.style, getLinkOnMouseLeaveStyle('/about'))}
                  onClick={() => handleLinkClick('/about')}
                >
                  About
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/contact"
                  className="px-4 py-2 rounded-full transition-colors font-medium"
                  style={getDesktopLinkStyle('/contact')}
                  onMouseEnter={(e) => Object.assign(e.target.style, getHoverStyle())}
                  onMouseLeave={(e) => Object.assign(e.target.style, getLinkOnMouseLeaveStyle('/contact'))}
                  onClick={() => handleLinkClick('/contact')}
                >
                  Contact
                </Link>
              </li> */}
            </ul>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenu(!mobileMenu)}>
                {mobileMenu ? (
                  <X size={24} style={{ color: "#EAEFEF" }} />
                ) : (
                  <Menu size={24} style={{ color: "#EAEFEF" }} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenu && (
            <div 
                className="md:hidden mt-2 p-4 rounded-xl shadow-lg absolute left-0 right-0 top-full mx-4" 
                style={dropdownStyle}
            >
              <ul className="flex flex-col gap-1 text-sm font-medium" style={{ color: "#EAEFEF" }}>
                <li>
                  <Link
                    to="/"
                    className="block px-4 py-2 transition-colors rounded-full"
                    style={activeLink === '/' ? activeLinkStyle : {}}
                    onClick={() => handleLinkClick('/')}
                  >
                    Home
                  </Link>
                </li>

                {/* Mobile AI Agent Page Link */}
                <li>
                  <Link
                    to="/ai-agent"
                    className="block px-4 py-2 transition-colors rounded-full"
                    style={activeLink === '/ai-agent' ? activeLinkStyle : {}}
                    onClick={() => handleLinkClick('/ai-agent')}
                  >
                    AI Agents
                  </Link>
                </li>
                
                {/* Mobile Dropdown for specific agents */}
                <li>
                  <button
                    onClick={() => setMobileDropdown(!mobileDropdown)}
                    className={`w-full text-left px-4 py-2 flex items-center justify-between transition-colors rounded-lg ${isAnyAgentActive ? 'bg-[#7F8CAA33]' : 'hover:bg-[#7F8CAA33]'}`}
                  >
                    Agents Quick Access <ChevronDown size={16} className={mobileDropdown ? 'rotate-180 transition-transform' : 'transition-transform'} />
                  </button>

                  {mobileDropdown && (
                    <div className="mt-1 ml-4 flex flex-col gap-1 border-l pl-3 py-1"
                      style={{ borderColor: "#7F8CAA55" }}
                    >
                      <Link 
                        className="block px-3 py-2 rounded-lg transition-colors hover:bg-[#7F8CAA33] text-sm font-normal" 
                        style={activeLink === '/doctor-agent' ? activeLinkStyle : {}}
                        to="/doctor-agent"
                        onClick={() => handleLinkClick('/doctor-agent')}
                      >
                        Doctor Assistant
                      </Link>
                      <Link 
                        className="block px-3 py-2 rounded-lg transition-colors hover:bg-[#7F8CAA33] text-sm font-normal" 
                        style={activeLink === '/report-reader-agent' ? activeLinkStyle : {}}
                        to="/report-reader-agent"
                        onClick={() => handleLinkClick('/report-reader-agent')}
                      >
                        Report Reader
                      </Link>
                      <Link 
                        className="block px-3 py-2 rounded-lg transition-colors hover:bg-[#7F8CAA33] text-sm font-normal" 
                        style={activeLink === '/prescription-reader-agent' ? activeLinkStyle : {}}
                        to="/prescription-reader-agent"
                        onClick={() => handleLinkClick('/prescription-reader-agent')}
                      >
                        Prescription Reader
                      </Link>
                    </div>
                  )}
                </li>

                <li>
                  <Link
                    to="/about"
                    className="block px-4 py-2 rounded-full transition-colors hover:bg-[#7F8CAA33]"
                    style={activeLink === '/about' ? activeLinkStyle : {}}
                    onClick={() => handleLinkClick('/about')}
                  >
                    About
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/contact"
                    className="block px-4 py-2 rounded-full transition-colors hover:bg-[#7F8CAA33]"
                    style={activeLink === '/contact' ? activeLinkStyle : {}}
                    onClick={() => handleLinkClick('/contact')}
                  >
                    Contact
                  </Link>
                </li> */}
              </ul>
            </div>
          )}
        </nav>
    </div>
  );
}
