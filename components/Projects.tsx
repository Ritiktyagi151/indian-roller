"use client";
import React from "react";
import Image from "next/image";
// Variants ko yahan import kiya gaya hai build error fix karne ke liye
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  { id: 1, title: "Food Industry", category: "Architecture", img: "/industry-img/industry1.webp" },
  { id: 2, title: "Turnkey Project", category: "Beauty", img: "/industry-img/mislinious.jpg", highlight: true },
  { id: 3, title: "Miscellaneous Roller", category: "Engineering", img: "/industry-img/mislinious.webp" },
  { id: 4, title: "Paper And Packaging Industry", category: "Design", img: "/industry-img/paper.webp" },
  { id: 5, title: "Plywood Industry", category: "Architecture", img: "/industry-img/plywood.webp" },
  { id: 6, title: "Textile Industry", category: "Industrial", img: "/industry-img/textiles.webp" },
];

const Projects = () => {
  // Container Variants with explicit type
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  // Card Variants with explicit type
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-16">
          {/* Left: Heading */}
          <motion.div 
            className="lg:w-2/5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.p 
              className="text-orange-500 font-semibold text-xs tracking-[3px] uppercase mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
            >
              Portfolio
            </motion.p>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-gray-900 leading-[1.1]">
              Our Latest<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                Serving Industries
              </span>
            </h2>
            <motion.div 
              className="w-24 h-1.5 bg-gradient-to-r from-orange-400 to-orange-600 mt-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4, duration: 0.8 }}
            ></motion.div>
          </motion.div>

          {/* Right: Description */}
          <motion.div 
            className="lg:w-3/5 space-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-gray-600 text-base leading-relaxed">
              World-class manufacturing backed industrial rollers designed to deliver <span className="font-semibold text-gray-800">durability, precision,</span> and consistent performance across diverse industrial applications with reliable quality standards.
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              We serve <span className="font-semibold text-orange-500">steel, textile, paper, packaging, food, plywood, rexene,</span> and turnkey projects by providing customized roller solutions that enhance productivity and ensure long-term operational efficiency.
            </p>
          </motion.div>
        </div>

        {/* --- PROJECTS GRID --- */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="relative h-[420px] rounded-2xl group overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500"
            >
              {/* Image */}
              <Image 
                src={project.img} 
                alt={project.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              {/* Gradient Overlay (always visible, subtle) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Bottom Content (always visible) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500">
                <p className="text-orange-400 text-xs font-semibold uppercase tracking-[2px] mb-2">
                  {project.category}
                </p>
                <h3 className="text-white text-2xl font-bold uppercase tracking-wide">
                  {project.title}
                </h3>
              </div>

              {/* Hover Overlay with Icon */}
              <div className={`absolute inset-0 transition-all duration-500 flex items-center justify-center
                ${project.highlight 
                  ? "bg-orange-500/90" 
                  : "bg-black/70"
                } opacity-0 group-hover:opacity-100`}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-full p-4 shadow-xl"
                >
                  <ArrowUpRight className="w-8 h-8 text-orange-500" />
                </motion.div>
              </div>

              {/* Highlight Badge */}
              {project.highlight && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-lg">
                  Featured
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

      
      </div>
    </section>
  );
};

export default Projects;