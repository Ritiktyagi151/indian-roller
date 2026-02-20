"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const AboutSection = () => {
  // 1. Left to Right Slide (About Us text ke liye)
  const slideFromLeft: Variants = {
    hidden: { opacity: 0, x: -80 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  // 2. Right to Left Slide (Heading aur Content ke liye)
  const slideFromRight: Variants = {
    hidden: { opacity: 0, x: 80 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section className="pt-20  bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Side: Heading Section */}
          <div className="lg:w-1/3">
            {/* About Us: Left to Right */}
            <motion.p 
              variants={slideFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.8 }}
              className="text-orange-500 font-bold text-xs tracking-[3px] uppercase mb-4"
            >
              About Us
            </motion.p>

            {/* Main Title: Right to Left */}
            <motion.h2 
              variants={slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.8 }}
              className="text-4xl md:text-5xl font-black uppercase leading-tight tracking-tighter text-black"
            >
              Greeting From <br /> All Of Us <br /> 
              <span className="text-orange-500 text-3xl md:text-4xl">IRI ISO 9001:2008 Certified</span>
            </motion.h2>

            {/* Line Animation */}
            <motion.div 
              className="w-20 h-1 bg-orange-500 mt-6"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>

          {/* Right Side: Description Section (Right to Left) */}
          <motion.div 
            className="lg:w-2/3"
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.8 }}
          >
            <p className="text-gray-500 font-bold text-sm leading-relaxed mb-6 uppercase tracking-wider italic border-l-4 border-orange-500 pl-4">
              With this simple philosophy, the brand Indian Roller was born in 1990, as a rubber roller and Polyurethane manufacturing company by a dedicated team of young & energetic professionals.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-400 text-[13px] leading-7 font-medium">
              <div className="space-y-4">
                <p>
                  Our unit is located in a 36,000 sq. Feet area in the industrial town of Sahibabad, Dist. Ghaziabad (Delhi & NCR).
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  The mission was to create a good product that is honestly made and sincerely served.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;