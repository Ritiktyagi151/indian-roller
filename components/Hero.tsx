"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  // Slider ke liye words array
  const words = ["Engineering", "Architecture", "Infrastructure", "Innovation"];
  const [index, setIndex] = useState(0);

  // Har 3 second mein word change hoga
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/roller-factory-img.webp"
          alt="Industrial Building Infrastructure"
          fill
          priority
          className="object-cover brightness-[0.3]"
        />
      </div>

      {/* Hero Content Area */}
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        <h1 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
          We Build The <br />
          <span className="text-orange-500">Future</span>
        </h1>

        {/* --- TEXT SLIDER ANIMATION --- */}
        <div className="h-[60px] md:h-[80px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={words[index]}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-white text-3xl md:text-6xl font-black italic uppercase tracking-[4px] opacity-80"
            >
              {words[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-orange-500/80 text-xs md:text-sm font-bold tracking-[10px] mt-8 uppercase">
          Best Ideas — Best Solution — Best Result
        </p>
      </div>

      {/* Side Decorative Text */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block">
        <p className="text-white/20 text-[10px] font-black tracking-[5px] uppercase rotate-90 origin-left">
          ESTD 1990 — INDIAN ROLLER INDUSTRIES
        </p>
      </div>

      {/* Bottom Scroll Indicator (Optional) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
         <div className="w-[1px] h-12 bg-gradient-to-b from-orange-500 to-transparent animate-pulse"></div>
         <span className="text-white/40 text-[9px] font-bold tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;