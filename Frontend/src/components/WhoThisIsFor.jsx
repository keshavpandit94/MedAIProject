import React from "react";
import { motion } from "framer-motion";
import { User, Heart, Users, GraduationCap, Check } from "lucide-react";

// Component for a single modernized list item
const TargetCard = ({ icon, text, index }) => {
    const cardStyle = {
        background: "linear-gradient(135deg, #222222E0 0%, #333333E0 100%)",
        backdropFilter: "blur(12px)",
        border: "1px solid #7F8CAA55",
        color: "#EAEFEF",
    };

    const iconColors = [
        "text-red-400",  // Confusion
        "text-sky-400",  // Patients
        "text-green-400", // Caregivers
        "text-yellow-400", // Students
    ];

    return (
        <motion.li
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="p-8 rounded-3xl shadow-lg transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl flex items-start space-x-4"
            style={cardStyle}
        >
            <div 
                className={`p-3 rounded-full bg-slate-700/50 ${iconColors[index % iconColors.length]} shrink-0`}
            >
                {/* FIX: icon is already a rendered JSX element */}
                {icon} 
            </div>
            <p className="text-lg font-medium pt-0.5">
                {text}
            </p>
        </motion.li>
    );
};


export function WhoThisIsFor() {
    // FIX: Render the icons here so they are passed as JSX elements, not functions.
    const targets = [
        { icon: <Check size={24} />, text: "Anyone confused by dense medical reports or prescriptions." },
        { icon: <Heart size={24} />, text: "Patients seeking simple, jargon-free explanations of their health results." },
        { icon: <Users size={24} />, text: "Caregivers and family members helping loved ones manage their healthcare." },
        { icon: <GraduationCap size={24} />, text: "Students and enthusiasts learning healthcare basics and terminology." },
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-8">
            <h3
                className="text-3xl md:text-4xl font-bold mb-12 text-center"
                style={{ color: "#F9F6F3" }}
            >
                Who This Is For
            </h3>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {targets.map((target, index) => (
                    <TargetCard 
                        key={index}
                        // FIX: Pass the pre-rendered JSX element directly
                        icon={target.icon} 
                        text={target.text}
                        index={index}
                    />
                ))}
            </ul>
        </section>
    );
}