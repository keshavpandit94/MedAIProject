import React from "react";
import { motion } from "framer-motion";
import { Footer } from "../components/Footer";
import { Zap, Target, ShieldCheck, CheckSquare, Clock, Cpu, UserCheck } from "lucide-react"; // Import icons

// Define the common glass card style
const glassCardStyle = {
  background: "linear-gradient(135deg, #222222E0 0%, #333333E0 100%)",
  backdropFilter: "blur(12px)",
  border: "1px solid #7F8CAA55",
  boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
};

// Helper component for styled items
const IconCard = ({ title, content, icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: delay }}
        viewport={{ once: true, amount: 0.5 }}
        className="p-6 rounded-3xl shadow-lg transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col"
        style={glassCardStyle}
    >
        <div className="mb-3 flex items-center space-x-3">
            {icon}
            <h4
                className="text-xl font-semibold"
                style={{ color: "#F9F6F3" }}
            >
                {title}
            </h4>
        </div>
        <p style={{ color: "#B8CFCE", fontSize: "1rem", lineHeight: "1.6" }}>
            {content}
        </p>
    </motion.div>
);


export default function About() {
  
    // Add Icons to Main Sections
    const mainSections = [
        {
            title: "Our Mission",
            icon: <Target size={24} className="text-sky-400" />,
            content:
                "MedAI aims to simplify medical reports and prescriptions, making healthcare information accessible and understandable for everyone. We bridge the gap between complex medical jargon and clear, actionable insights.",
        },
        {
            title: "Our Vision",
            icon: <Zap size={24} className="text-red-400" />,
            content:
                "To empower patients, caregivers, and students with AI-driven tools that provide clarity, accuracy, and security in healthcare understanding.",
        },
        {
            title: "Why Choose MedAI?",
            icon: <ShieldCheck size={24} className="text-green-400" />,
            content:
                "Private, secure, and fast. Our AI agents help you understand medical information without confusion or misleading advice. All your data is safe, and explanations are simple yet precise.",
        },
    ];

    // Add Icons to Core Values
    const coreValues = [
        { value: "Clear & Simple Explanations", icon: <CheckSquare size={20} className="text-sky-400" /> },
        { value: "Accurate & Reliable Information", icon: <Cpu size={20} className="text-green-400" /> },
        { value: "Privacy & Security First", icon: <ShieldCheck size={20} className="text-red-400" /> },
        { value: "Accessible to Everyone", icon: <UserCheck size={20} className="text-yellow-400" /> },
    ];

    // Add Icons to Team Highlights
    const teamHighlights = [
        {
            title: "AI-Driven Analysis",
            icon: <Cpu size={24} className="text-sky-400" />,
            content: "Our specialized AI agents analyze your medical reports quickly and accurately to deliver trusted summaries.",
        },
        {
            title: "User-Friendly Interface",
            icon: <UserCheck size={24} className="text-green-400" />,
            content: "Interact with your medical information in a simple, intuitive, and modern chat interface.",
        },
        {
            title: "24/7 Assistance",
            icon: <Clock size={24} className="text-red-400" />,
            content: "Ask follow-up questions anytime, day or night—fast, private, and secure answers are always available.",
        },
    ];

    return (
        <>
            {/* Main Sections - FIX: Applied responsive padding and max-width container */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <h2
                    className="text-4xl md:text-5xl font-bold mb-12 text-center"
                    style={{ color: "#F9F6F3" }}
                >
                    About MedAI
                </h2>

                {/* Main Mission/Vision/Why - FIX: Ensure grid-cols-1 on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {mainSections.map((sec, idx) => (
                        <IconCard 
                            key={idx}
                            title={sec.title}
                            content={sec.content}
                            icon={sec.icon}
                            delay={idx * 0.2}
                        />
                    ))}
                </div>

                {/* --- Separator --- */}
                <hr className="my-10 border-slate-700/50" />
                
                {/* Core Values */}
                <h3
                    className="text-3xl font-bold mb-8 text-center"
                    style={{ color: "#F9F6F3" }}
                >
                    Our Core Values
                </h3>
                {/* FIX: Ensure grid-cols-2 on small mobile, expanding to 4 on desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {coreValues.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="p-5 rounded-3xl shadow-lg transform transition duration-300 hover:scale-[1.05] hover:shadow-2xl text-center flex flex-col items-center justify-center space-y-2"
                            style={glassCardStyle}
                        >
                            {item.icon}
                            <p className="font-medium text-sm md:text-base" style={{ color: "#EAEFEF" }}>
                                {item.value}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* --- Separator --- */}
                <hr className="my-10 border-slate-700/50" />

                {/* Team / Approach */}
                <h3
                    className="text-3xl font-bold mb-8 text-center"
                    style={{ color: "#F9F6F3" }}
                >
                    Our Approach
                </h3>
                {/* FIX: Ensure grid-cols-1 on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamHighlights.map((item, idx) => (
                        <IconCard 
                            key={idx}
                            title={item.title}
                            content={item.content}
                            icon={item.icon}
                            delay={idx * 0.2}
                        />
                    ))}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </>
    );
}