import React from "react";
import { motion } from "framer-motion";
import { Upload, Cpu, FileText, MessageSquare } from "lucide-react"; // Import icons for visual appeal

export function HowItWorks() {
  const steps = [
    { title: "Upload Report/Rx", icon: Upload, description: "Upload your prescription, lab result, or medical report (Image or PDF)." },
    { title: "AI Analysis", icon: Cpu, description: "Our specialized AI agents instantly process the data and extract key findings." },
    { title: "Simple Summary", icon: FileText, description: "You’ll receive a clean, easy-to-read summary with no complex medical jargon." },
    { title: "Ask & Clarify", icon: MessageSquare, description: "Ask any follow-up questions for clarification—fast, private, and secure." },
  ];

  const glassCardStyle = {
    background: "linear-gradient(135deg, #222222E0 0%, #333333E0 100%)",
    backdropFilter: "blur(12px)",
    border: "1px solid #7F8CAA55",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
  };

  return (
    // FIX: Replaced large px-16 with standard responsive padding
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-4">
      <h3
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
        style={{ color: "#F9F6F3" }}
      >
        How It Works
      </h3>

      {/* FIX: Use flex layout on mobile for cleaner vertical stacking, transition to grid on desktop */}
      <div className="flex flex-col md:grid md:grid-cols-4 gap-8 relative">

        {/* --- Flow Indicator Line (Desktop Only) --- */}
        <div className="hidden md:block absolute inset-x-8 top-1/4 h-0.5 bg-sky-600/50 pointer-events-none"></div>

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-[1.03] hover:shadow-2xl relative z-10"
            style={glassCardStyle}
          >
            {/* FIX: Step number with proper visible color and styling */}
            <div
              className={`font-bold text-lg mb-4 w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                index % 2 === 0 ? 'bg-sky-600 border-sky-400' : 'bg-green-600 border-green-400'
              }`}
              style={{ color: "#EAEFEF" }}
            >
              {/* Added Icon */}
              <step.icon size={20} />
            </div>
            
            <h4 className="font-bold text-xl mb-2" style={{ color: "#F9F6F3" }}>
              {step.title}
            </h4>

            <p
              className="text-base"
              style={{ color: "#B8CFCE" }}
            >
              {step.description}
            </p>
            
            {/* Mobile Arrow for Flow */}
            {index < steps.length - 1 && (
                <div className="absolute left-1/2 bottom:-2.5rem md:hidden transform -translate-x-1/2">
                    <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            )}

          </motion.div>
        ))}
      </div>
    </section>
  );
}