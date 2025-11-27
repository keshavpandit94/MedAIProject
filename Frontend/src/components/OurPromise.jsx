import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Lock, AlertTriangle } from "lucide-react"; // Import appropriate icons

// Define a unified style for the cards
const promiseCardStyle = {
    background: "linear-gradient(135deg, #222222E0 0%, #333333E0 100%)",
    backdropFilter: "blur(12px)",
    border: "1px solid #7F8CAA55",
    color: "#EAEFEF",
};

export function OurPromise() {
  const items = [
    { text: "Clear, Jargon-Free Explanations", icon: Zap, color: "text-sky-400" },
    { text: "Accurate, Source-Backed Information", icon: ShieldCheck, color: "text-green-400" },
    { text: "Strict Privacy and Data Security", icon: Lock, color: "text-indigo-400" },
    { text: "Non-Diagnostic Disclaimer (No Medical Advice)", icon: AlertTriangle, color: "text-red-400" },
  ];

  return (
    // FIX: Replaced px-16 with standard responsive padding and max-w-7xl
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-4">
      <h3
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
        style={{ color: "#F9F6F3" }}
      >
        Our Promise to You
      </h3>

      {/* FIX: Ensure grid-cols-1 on mobile, transition to md:grid-cols-2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="p-8 rounded-3xl shadow-lg transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl flex items-center space-x-4 text-lg font-medium"
            style={promiseCardStyle}
          >
            {/* Modern Icon Checkmark */}
            <item.icon size={24} className={`${item.color} shrink-0`} /> 
            
            <p>{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}