import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Stethoscope, FileText, Pill, Send } from "lucide-react"; // Icons

// --- Color Definitions (Consistent with App/Agent theme) ---
const MAIN_BG_COLOR = "#18181B"; 
const TEXT_COLOR = "#EAEFEF";
const SUBTEXT_COLOR = "#B8CFCE";

// Define the common dark glass style for reuse
const glassCardStyle = {
    background: "linear-gradient(135deg, #222222E0 0%, #333333E0 100%)",
    backdropFilter: "blur(12px)",
    border: "1px solid #7F8CAA55",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
};

const agents = [
    {
        title: "Doctor Assistant",
        path: "/doctor-agent",
        icon: <Stethoscope size={40} className="text-sky-400" />,
        description:
            "Analyze symptoms and receive a structured, non-diagnostic report highlighting possible conditions and recommended next steps (e.g., see a specialist).",
    },
    {
        title: "Report Reader",
        path: "/report-reader-agent",
        icon: <FileText size={40} className="text-green-400" />,
        description:
            "Upload lab results (blood work, scans, etc.) to get a simplified breakdown of complex medical jargon, flags, and provider summaries.",
    },
    {
        title: "Prescription Reader",
        path: "/prescription-reader-agent",
        icon: <Pill size={40} className="text-red-400" />,
        description:
            "Upload an image or PDF of a prescription to understand medication names, dosages, purpose, and potential side effects or interactions.",
    },
];

export default function AiAgentPage() {
    return (
        <section 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 min-h-screen"
            style={{ backgroundColor: MAIN_BG_COLOR, color: TEXT_COLOR }}
        >
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold mb-4 text-center"
                style={{ color: TEXT_COLOR }}
            >
                Our AI Agents
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg mb-16 text-center max-w-2xl mx-auto"
                style={{ color: SUBTEXT_COLOR }}
            >
                Choose an agent below to begin simplifying your healthcare information. Each agent is specialized for accuracy and clarity.
            </motion.p>

            {/* Agent Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {agents.map((agent, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="p-8 rounded-3xl shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col items-center text-center group"
                        style={glassCardStyle}
                    >
                        <div className="mb-4 p-4 rounded-full bg-zinc-800/50 shadow-inner">
                            {agent.icon}
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3" style={{ color: TEXT_COLOR }}>
                            {agent.title}
                        </h3>
                        
                        <p className="text-base mb-6 flex-1" style={{ color: SUBTEXT_COLOR }}>
                            {agent.description}
                        </p>

                        <Link
                            to={agent.path}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 transform shadow-md 
                                       bg-sky-600 hover:bg-sky-500 hover:scale-[1.01] active:scale-[0.99] mt-auto"
                            style={{ color: TEXT_COLOR }}
                        >
                            Start Analysis <Send size={18} />
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}