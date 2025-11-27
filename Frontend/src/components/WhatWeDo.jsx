import React from "react";
import { motion } from "framer-motion";
// Renamed Pill to Prescription to better reflect usage
import { Stethoscope, FileText, Pill } from "lucide-react"; 

// Define icons map, potentially using an accent color
const icons = {
  "Doctor Agent": <Stethoscope size={32} className="text-sky-400" />,
  "Report Reader": <FileText size={32} className="text-green-400" />,
  "Prescription Helper": <Pill size={32} className="text-red-400" />,
};

export default function WhatWeDo({ items }) {
  
  // Define styles for better separation and modern look
  const glassCardStyle = {
    background: "linear-gradient(145deg, #222222E0 0%, #333333E0 100%)", // Gradient for depth
    backdropFilter: "blur(15px)",
    border: "1px solid #7F8CAA77",
    boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
    color: "#EAEFEF", // Ensure default text color is set on the container
  };

  return (
    // FIX: Replaced px-16 with standard responsive padding and max-w-7xl
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-8">
      <h3
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
        style={{ color: "#F9F6F3" }}
      >
        What Our AI Agents Do
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="p-8 rounded-3xl shadow-lg transform transition duration-500 hover:scale-[1.03] hover:shadow-2xl hover:border-sky-500 relative overflow-hidden"
            style={glassCardStyle}
          >
            {/* Subtle highlight border based on index (Modern touch) */}
            <div 
                className={`absolute inset-0 rounded-3xl border-2 ${
                    idx === 0 ? 'border-sky-600/50' : idx === 1 ? 'border-green-600/50' : 'border-red-600/50'
                } opacity-0 transition-opacity duration-300 hover:opacity-100 pointer-events-none`}
            ></div>

            <div className="mb-4">
                {/* Icon is dynamically pulled from the map, using the modern color styles */}
                {icons[item.title] || icons["Doctor Agent"]} 
            </div>

            <h4
              className="text-2xl font-semibold mb-4"
              style={{ color: "#F9F6F3" }}
            >
              {item.title}
            </h4>

            <ul
              className="text-base list-disc ml-5 space-y-2"
              style={{ color: "#B8CFCE" }}
            >
              {item.points.map((p, index) => (
                <li key={index}>{p}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}