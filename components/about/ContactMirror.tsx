"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaEnvelopeOpenText, FaPhoneVolume } from "react-icons/fa";

const ContactMirror = () => {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          
          {/* --- Mail Us Box with Mirror Effect --- */}
          <div className="relative group">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="bg-gray-50 p-10 relative z-10 border border-gray-100 flex items-start gap-6 group-hover:border-orange-500 transition-colors duration-500"
            >
              <div className="text-orange-500 text-5xl">
                <FaEnvelopeOpenText />
              </div>
              <div>
                <p className="text-orange-500 font-bold text-[10px] tracking-[3px] uppercase mb-2">Mail Us Anytime</p>
                <h3 className="text-2xl font-black text-black mb-2 lowercase">info@indianroller.com</h3>
                <p className="text-gray-400 text-xs font-medium">Mail 24/7 Anytime For Your Problem</p>
              </div>
            </motion.div>

            {/* Mirror/Reflection Element */}
            <div 
              className="absolute top-full left-0 w-full h-full bg-gradient-to-b from-gray-200/20 to-transparent scale-y-[-0.6] blur-[2px] opacity-30 origin-top pointer-events-none select-none group-hover:opacity-50 transition-opacity duration-500"
              style={{ transform: "perspective(1000px) rotateX(180deg)" }}
            >
               <div className="p-10 flex items-start gap-6">
                  <div className="text-5xl opacity-50"><FaEnvelopeOpenText /></div>
                  <div>
                    <p className="font-bold text-[10px] tracking-[3px] uppercase mb-2">Mail Us Anytime</p>
                    <h3 className="text-2xl font-black mb-2 lowercase">info@indianroller.com</h3>
                  </div>
               </div>
            </div>
          </div>

          {/* --- Call Us Box with Mirror Effect --- */}
          <div className="relative group">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 p-10 relative z-10 border border-gray-100 flex items-start gap-6 group-hover:border-orange-500 transition-colors duration-500"
            >
              <div className="text-orange-500 text-5xl">
                <FaPhoneVolume />
              </div>
              <div>
                <p className="text-orange-500 font-bold text-[10px] tracking-[3px] uppercase mb-2">Call Us For Service</p>
                <h3 className="text-2xl font-black text-black mb-2 uppercase">+91-9811885000</h3>
                <p className="text-gray-400 text-xs font-medium">Call 24/7 Anytime For Your Problem</p>
              </div>
            </motion.div>

            {/* Mirror/Reflection Element */}
            <div 
              className="absolute top-full left-0 w-full h-full bg-gradient-to-b from-gray-200/20 to-transparent scale-y-[-0.6] blur-[2px] opacity-30 origin-top pointer-events-none select-none group-hover:opacity-50 transition-opacity duration-500"
              style={{ transform: "perspective(1000px) rotateX(180deg)" }}
            >
               <div className="p-10 flex items-start gap-6">
                  <div className="text-5xl opacity-50"><FaPhoneVolume /></div>
                  <div>
                    <p className="font-bold text-[10px] tracking-[3px] uppercase mb-2">Call Us For Service</p>
                    <h3 className="text-2xl font-black mb-2 uppercase">+91-9811885000</h3>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactMirror;