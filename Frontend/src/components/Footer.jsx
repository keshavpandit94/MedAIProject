import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
    // Define the style consistent with the dark glass theme
    const darkGlassStyle = {
        background: "#222222EE", // Slightly more opaque for the footer
        backdropFilter: "blur(8px)",
        borderTop: "1px solid #7F8CAA55",
        color: "#B8CFCE",
    };

    const linkClasses = "hover:text-sky-400 transition-colors";

    return (
        // FIX: Applied responsive padding (px-4 sm:px-6 lg:px-8) and generous vertical padding (py)
        <footer 
            className="w-full mt-16 px-4 sm:px-6 lg:px-8 py-10 md:py-16" 
            style={darkGlassStyle}
        >
            <div className="max-w-7xl mx-auto">
                
                {/* Top Section: Logo and Navigation Links - Uses a grid that stacks on mobile */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 pb-10 border-b border-slate-700">
                    
                    {/* 1. Logo & Description (Takes 2 columns on mobile/desktop) */}
                    <div className="col-span-2 md:col-span-2 space-y-4">
                        <h4 className="text-3xl font-bold text-sky-400">MedAI</h4>
                        <p className="text-sm">
                            Your trusted AI companion for understanding medical reports and prescriptions, simply and clearly.
                        </p>
                    </div>

                    {/* 2. Quick Links (Stacks in Column 3) */}
                    <div className="space-y-3">
                        <h5 className="font-semibold text-lg text-white mb-2">Platform</h5>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className={linkClasses}>Home</Link></li>
                            <li><Link to="/about" className={linkClasses}>About Us</Link></li>
                            <li><Link to="/contact" className={linkClasses}>Contact</Link></li>
                            <li><Link to="/faq" className={linkClasses}>FAQ</Link></li>
                        </ul>
                    </div>

                    {/* 3. AI Agents (Stacks in Column 4) */}
                    <div className="space-y-3">
                        <h5 className="font-semibold text-lg text-white mb-2">Agents</h5>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/doctor-agent" className={linkClasses}>Doctor Assistant</Link></li>
                            <li><Link to="/report-reader-agent" className={linkClasses}>Report Reader</Link></li>
                            <li><Link to="/prescription-reader-agent" className={linkClasses}>Rx Reader</Link></li>
                        </ul>
                    </div>

                    {/* 4. Contact Info (Takes 2 columns on mobile, 1 on desktop) */}
                    {/* <div className="col-span-2 md:col-span-1 space-y-3">
                        <h5 className="font-semibold text-lg text-white mb-2">Reach Out</h5>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center space-x-2">
                                <Mail size={18} className="text-sky-400" />
                                <span>support@medai.com</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone size={18} className="text-sky-400" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <MapPin size={18} className="text-sky-400" />
                                <span>San Francisco, CA</span>
                            </li>
                        </ul>
                    </div>*/}
                </div> 

                {/* Bottom Section: Copyright and Legal Links */}
                <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400">
                    <p>&copy; {new Date().getFullYear()} MedAI. All rights reserved.</p>
                    <div className="flex space-x-4 mt-3 md:mt-0">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <span>|</span>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
