"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaUser, FaEnvelope, FaPhoneAlt, FaCommentAlt } from "react-icons/fa";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InquiryModal = ({ isOpen, onClose }: InquiryModalProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Inquiry Sent Successfully!");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl bg-[#111] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
          >
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Get In <span className="text-orange-500">Touch</span></h2>
                <p className="text-gray-500 text-[10px] mt-1 font-bold uppercase tracking-widest">Inquiry for Industrial Rollers</p>
              </div>
              <button onClick={onClose} className="p-3 bg-white/5 hover:bg-orange-600 text-white rounded-full transition-all">
                <FaTimes size={18} />
              </button>
            </div>
            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={14} />
                    <input required type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-orange-500 text-white font-bold transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Email</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={14} />
                    <input required type="email" placeholder="info@company.com" className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-orange-500 text-white font-bold transition-all" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Phone Number</label>
                <div className="relative">
                  <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={14} />
                  <input required type="tel" placeholder="+91 00000 00000" className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-orange-500 text-white font-bold transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Message</label>
                <div className="relative">
                  <FaCommentAlt className="absolute left-4 top-6 text-orange-500" size={14} />
                  <textarea rows={4} placeholder="Your requirements..." className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-orange-500 text-white font-bold transition-all resize-none"></textarea>
                </div>
              </div>
              <button type="submit" className="w-full bg-orange-600 hover:bg-white hover:text-black py-5 rounded-2xl font-black text-xs uppercase tracking-[4px] transition-all">
                Send Inquiry Now
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InquiryModal;