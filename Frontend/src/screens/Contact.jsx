import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Footer } from '../components/Footer'; // Assuming Footer is in ../components

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'

  // Define the common dark glass style for inputs/containers
  const glassCardStyle = {
    background: "linear-gradient(135deg, #222222E0 0%, #333333E0 100%)",
    backdropFilter: "blur(12px)",
    border: "1px solid #7F8CAA55",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
    color: "#EAEFEF",
  };

  const inputStyle = "w-full p-3 rounded-lg bg-slate-800/70 border border-slate-700 text-slate-100 placeholder-slate-500 focus:ring-sky-500 focus:border-sky-500";
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
    
    // Simulate API call delay
    setTimeout(() => {
        setIsSubmitting(false);
        // Replace this with actual API submission logic
        const success = true; 
        setSubmissionStatus(success ? 'success' : 'error');
        if (success) setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
          style={{ color: "#F9F6F3" }}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg mb-16 text-center"
          style={{ color: "#B8CFCE" }}
        >
          We're here to help you understand your health better.
        </motion.p>
        
        {/* Main Grid: Form and Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* 1. Contact Form (Takes 2/3 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 p-8 rounded-3xl shadow-xl"
            style={glassCardStyle}
          >
            <h3 className="text-2xl font-semibold mb-6" style={{ color: "#F9F6F3" }}>
              Send Us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputStyle} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputStyle} />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required className={inputStyle}></textarea>
              </div>

              {submissionStatus === 'success' && (
                <p className="text-green-400 font-semibold">Thank you! Your message has been sent successfully.</p>
              )}
              {submissionStatus === 'error' && (
                <p className="text-red-400 font-semibold">Error sending message. Please try again later.</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform shadow-lg
                           bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:cursor-not-allowed"
                style={{ color: "#EAEFEF" }}
              >
                {isSubmitting ? (
                    <>Sending...</>
                ) : (
                    <>Send Message <Send size={20} /></>
                )}
              </button>
            </form>
          </motion.div>
          
          {/* 2. Direct Contact Information (Takes 1/3 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-3xl shadow-xl space-y-6"
            style={glassCardStyle}
          >
            <h3 className="text-2xl font-semibold mb-4" style={{ color: "#F9F6F3" }}>
              Our Info
            </h3>
            
            <ContactDetail icon={<Mail size={24} />} title="Email" content="support@medai.com" />
            <ContactDetail icon={<Phone size={24} />} title="Phone" content="+1 (555) 123-4567" />
            <ContactDetail icon={<MapPin size={24} />} title="Office" content="123 AI Drive, San Francisco, CA" />

          </motion.div>
        </div>
        
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}

// Helper component for contact details
const ContactDetail = ({ icon, title, content }) => (
    <div className="flex items-start space-x-4">
        <div className="p-3 rounded-full bg-sky-600/50 text-sky-200 shrink-0">
            {icon}
        </div>
        <div>
            <p className="font-semibold text-base mb-1" style={{ color: "#F9F6F3" }}>{title}</p>
            <p className="text-sm" style={{ color: "#B8CFCE" }}>{content}</p>
        </div>
    </div>
);