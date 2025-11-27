import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import HeroImg from "../assets/Image/Image.png"; // <-- Local image import
import { Link } from "react-router-dom";

export default function Hero() {

  const glassCardStyle = {
    background: "linear-gradient(135deg, #222222E0 0%, #333333E0 100%)",
    backdropFilter: "blur(15px)",
    border: "1px solid #7F8CAA77",
    boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
  };

  return (
    <section
      className="pt-24 pb-16 md:py-40 px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12 items-center max-w-7xl mx-auto"
    >

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:col-span-7 p-8 lg:p-10 rounded-3xl shadow-2xl z-10"
        style={glassCardStyle}
      >
        <h2
          className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight"
          style={{ color: "#F9F6F3" }}
        >
          Your <span className="text-sky-400">smart companion</span> for medical reports
        </h2>

        <p
          className="leading-relaxed text-lg mb-8"
          style={{ color: "#B8CFCE" }}
        >
          Our platform helps you understand prescriptions, medical reports, and health information
          in a simple and clear way. No confusion. No medical jargon. Just easy explanations you can trust.
        </p>

        {/* Call to Action Button - Using Link component for navigation */}
        <Link
          to="/ai-agent" // Assuming you added the new AiAgentPage to your routes
          className="group flex items-center justify-center gap-2 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform shadow-xl 
                     bg-sky-600 hover:bg-sky-500 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-sky-600/50"
          style={{ color: "#EAEFEF", textDecoration: 'none' }} // Ensure no underline
        >
          Start Analysis Now <Zap size={20} className="group-hover:rotate-6 transition-transform" />
        </Link>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="md:col-span-5 w-full rounded-3xl shadow-2xl relative overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(45deg, #1A1A1A, #333333)",
          border: "1px solid #7F8CAA44",
        }}
      >
        {/* Light overlay */}
        <div className="absolute inset-0 bg-sky-400/10 opacity-40 pointer-events-none"></div>

        {/* Local image */}
        <img
          src={HeroImg}
          alt="Medical Analysis Illustration"
          className="w-full h-full object-cover z-10"
        />
      </motion.div>
    </section>
  );
}
