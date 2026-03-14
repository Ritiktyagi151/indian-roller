"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const factoryData = [
  {
    id: "01",
    name: "Unit — Sahibabad",
    location: "Greater Noida, Uttar Pradesh",
    tag: "Uttar Pradesh",
    address: "Plot No. 62/2/1&2, Site IV, Industrial Area, Sahibabad-201010 UP.",
    image: "/team-img/DSC_4293.JPG",
  },
  {
    id: "02",
    name: "Unit — Jamshedpur",
    location: "Ghamaria, Jharkhand",
    tag: "Jharkhand",
    address: "Shed no.1, Plot No-743, Ghamaria, Jamshedpur, Jharkhand - 832108",
    image: "/team-img/jamshedpur-team.JPG",
  },
  {
    id: "03",
    name: "Unit — Ahmedabad",
    location: "Gopalcharan Industrial Park, Gujarat",
    tag: "Gujarat",
    address: "Plot No. 226 to 229, Gopalcharan-2, Industrial Park, Ahmedabad, 382433",
    image: "/team-img/ahmdabad.JPG",
  },
  {
    id: "04",
    name: "Unit — Ballari",
    location: "Sandur, Karnataka",
    tag: "Karnataka",
    address: "Property No-5331481412, Kurekuppa Village, Sandur, Ballari, Karnataka - 583119",
    image: "/team-img/kanatka2.JPG",
  },
  {
    id: "05",
    name: "Unit — Bangladesh",
    location: "South Kashimpur, Feni, Bangladesh",
    tag: "International",
    address: "South Kashimpur Panchagachia, Mohipal Feni, Bangladesh",
    image: "/about-img/about-bg.jpg",
  },
];

const TeamSection = () => {
  // Define types so TypeScript knows these can be strings/objects or null
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedFactory, setSelectedFactory] = useState<(typeof factoryData)[0] | null>(null);

  return (
    <section className="bg-[#0d0d0d] text-[#f0ede6] py-20 font-sans">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        <p className="text-[#c85a1a] text-[11px] tracking-[4px] uppercase font-medium mb-4">Our Infrastructure</p>
        <h2 className="uppercase leading-[0.9] mb-16" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px, 8vw, 100px)" }}>
          5 Production <br /> <span className="text-[#333]">Units Worldwide</span>
        </h2>

        {/* Factory List */}
        <ul className="list-none p-0 m-0">
          {factoryData.map((factory) => (
            <li
              key={factory.id}
              onMouseEnter={() => setHoveredId(factory.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedFactory(factory)}
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 py-7 px-4 border-t border-[#1e1e1e] last:border-b last:border-[#1e1e1e] transition-all duration-300 cursor-pointer ${
                hoveredId === factory.id ? "bg-[#141414]" : "bg-transparent"
              }`}
            >
              {/* Image Thumbnail */}
              <div className="relative w-full sm:w-[140px] h-[180px] sm:h-[88px] flex-shrink-0 overflow-hidden bg-[#1a1a1a]">
                <Image
                  src={factory.image}
                  alt={factory.name}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    hoveredId === factory.id ? "scale-110 brightness-100" : "scale-100 brightness-50 grayscale"
                  }`}
                />
                <div className="absolute top-0 left-0 bg-[#c85a1a] text-white px-2 py-0.5 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "16px" }}>
                  {factory.id}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className={`leading-none tracking-wide transition-colors duration-200 ${hoveredId === factory.id ? "text-[#c85a1a]" : "text-[#f0ede6]"}`}
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "26px" }}>
                  {factory.name}
                </div>
                <div className="text-[#777] text-[11px] tracking-[2px] uppercase mt-2">{factory.location}</div>
              </div>

              {/* Tag + Arrow */}
              <div className="flex items-center gap-3 flex-shrink-0 pr-2">
                <span className="hidden md:inline-block text-[10px] bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] px-3 py-1.5 rounded-full tracking-widest uppercase">
                  {factory.tag}
                </span>
                <span className={`text-[#c85a1a] text-xl transition-all duration-200 ${hoveredId === factory.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>
                  →
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* CTA Bar */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between border border-[#1e1e1e] px-10 py-10 gap-6">
          <h3 className="text-[#f0ede6] text-center sm:text-left" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px" }}>
            Want to visit our <span className="text-[#c85a1a]">facilities?</span>
          </h3>
          <Link href="/contact">
            <button className="bg-[#c85a1a] hover:bg-[#a8470f] text-white text-[11px] font-medium tracking-[3px] uppercase px-8 py-4 transition-colors duration-200">
              Schedule a Tour
            </button>
          </Link>
        </div>
      </div>

      {/* POPUP MODAL */}
      <AnimatePresence>
        {selectedFactory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFactory(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-[#111] border border-[#222] w-full max-w-4xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedFactory(null)}
                className="absolute top-4 right-4 z-10 text-white/50 hover:text-white text-2xl"
              >
                ✕
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/2 h-[300px] md:h-[500px]">
                  <Image 
                    src={selectedFactory.image} 
                    alt={selectedFactory.name} 
                    fill 
                    className="object-cover"
                  />
                </div>

                <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                  <span className="text-[#c85a1a] text-xs tracking-[4px] uppercase font-bold mb-4 block">
                    Factory Unit {selectedFactory.id}
                  </span>
                  <h2 className="text-[#f0ede6] leading-none mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "48px" }}>
                    {selectedFactory.name}
                  </h2>
                  <div className="h-px w-20 bg-[#c85a1a] mb-6"></div>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-[#555] text-[10px] uppercase tracking-widest mb-1">Location</p>
                      <p className="text-[#f0ede6] text-sm font-medium">{selectedFactory.location}</p>
                    </div>
                    <div>
                      <p className="text-[#555] text-[10px] uppercase tracking-widest mb-1">Full Address</p>
                      <p className="text-[#888] text-sm leading-relaxed">{selectedFactory.address}</p>
                    </div>
                  </div>

                  <Link href="/contact" className="mt-10 inline-block">
                    <span className="text-[#c85a1a] text-[11px] font-bold tracking-[2px] uppercase border-b border-[#c85a1a] pb-1 hover:text-white hover:border-white transition-all cursor-pointer">
                      Inquire About This Unit →
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TeamSection;