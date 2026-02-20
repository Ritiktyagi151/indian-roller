"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import InquiryModal from "../modals/InquiryModal";
import api from "@/lib/axios";
import { 
  FaPhoneAlt, FaEnvelope, FaFacebookF, FaBars, FaTimes, 
  FaChevronDown, FaLinkedinIn, FaYoutube, FaIndustry, 
  FaCogs, FaBoxOpen, FaUtensils, FaTools, FaLayerGroup,
  FaFlask, FaFillDrip, FaSyncAlt
} from "react-icons/fa";
import { GiGearStickPattern, GiRolledCloth, GiWaterRecycling } from "react-icons/gi"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  // Fixed JSX.Element error by using React.ReactNode
  const getIcon = (slug: string): React.ReactNode => {
    const iconMap: { [key: string]: React.ReactNode } = {
      "steel-industry": <FaIndustry />,
      "textile-industry": <GiRolledCloth />,
      "paper-and-packaging-industry": <FaBoxOpen />,
      "food-industry": <FaUtensils />,
      "plywood-industry": <FaLayerGroup />,
      "rexene-industry": <FaTools />,
      "natural-rubber": <GiGearStickPattern />,
      "polyurethane-rubber": <FaFlask />,
      "silicone-rubber": <FaFillDrip />,
      "epdm-rubber-roller": <GiWaterRecycling />,
    };
    return iconMap[slug] || <FaCogs />;
  };

  useEffect(() => {
    const fetchNavCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) { console.error("Navbar API Error:", err); }
    };
    fetchNavCategories();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const megaMenuVars: Variants = {
    initial: { opacity: 0, y: 20, rotateX: -15 },
    animate: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: 15, rotateX: -10, transition: { duration: 0.3 } }
  };

  const closeMenus = () => {
    setShowProducts(false);
    setIsMenuOpen(false);
    setMobileProductOpen(false);
  };

  return (
    <header className="w-full fixed top-0 left-0 z-[100] font-sans">
      {/* --- TOP BAR --- */}
      <div className={`bg-black text-white px-6 hidden lg:block border-b border-white/10 transition-all duration-500 ease-in-out overflow-hidden ${
        isScrolled ? "h-0 opacity-0 border-none" : "h-[45px] py-3 opacity-100"
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[12px] opacity-80 uppercase tracking-widest font-bold">
          <div className="flex gap-8">
            <Link href="tel:+911234567890" className="flex items-center gap-2 hover:text-orange-500 transition"><FaPhoneAlt className="text-orange-500"/> +91 12345 67890</Link>
            <Link href="mailto:info@indianroller.com" className="flex items-center gap-2 hover:text-orange-500 transition"><FaEnvelope className="text-orange-500"/> info@indianroller.com</Link>
          </div>
          <div className="flex gap-5 text-lg">
            <FaFacebookF className="hover:text-orange-500 cursor-pointer transition-colors" />
            <FaLinkedinIn className="hover:text-orange-500 cursor-pointer transition-colors" />
            <FaYoutube className="hover:text-orange-500 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>

      {/* --- MAIN NAV --- */}
      <nav 
        onMouseLeave={() => setShowProducts(false)} 
        className={`transition-all duration-500 px-6 w-full ${
          isScrolled ? "bg-black/90 backdrop-blur-md shadow-2xl" : "bg-[#1a1a1a]/20 backdrop-blur-sm"
        }`}
      >
        <div className={`max-w-[1400px] mx-auto flex justify-between items-center transition-all duration-500 ${
          isScrolled ? "h-[70px]" : "h-[80px] md:h-[100px]"
        }`}>
          <Link href="/" className="relative z-[110]" onClick={closeMenus}>
            <Image 
              src="/logo1.png" 
              alt="Indian Roller Logo" 
              width={180} 
              height={50} 
              className={`transition-all duration-500 w-auto ${isScrolled ? "h-10 md:h-14" : "h-10 md:h-20"}`} 
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-10 items-center font-black text-[11px] tracking-[2px] text-white">
            <Link href="/" className="hover:text-orange-500 transition-colors">HOME</Link>
            <Link href="/about" className="hover:text-orange-500 transition-colors">ABOUT</Link>
            <div onMouseEnter={() => setShowProducts(true)} className="flex items-center gap-1 cursor-pointer hover:text-orange-500 transition-colors py-2 uppercase">
              Products <FaChevronDown className={`text-[10px] transition-transform duration-300 ${showProducts ? 'rotate-180' : ''}`} />
            </div>
            <Link href="/blogs" className="hover:text-orange-500 transition-colors">BLOG</Link>
            <Link href="/contact" className="hover:text-orange-500 transition-colors">CONTACT</Link>
            <button onClick={() => setIsPopupOpen(true)} className="bg-orange-600 hover:bg-white hover:text-black px-8 py-3.5 transition-all duration-300 rounded-sm shadow-lg shadow-orange-600/20">GET IN TOUCH</button>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-white text-2xl relative z-[110]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes className="text-orange-500" /> : <FaBars />}
          </button>
        </div>

        {/* --- DESKTOP MEGA MENU --- */}
        <AnimatePresence>
          {showProducts && (
            <motion.div variants={megaMenuVars} initial="initial" animate="animate" exit="exit" onMouseEnter={() => setShowProducts(true)} onMouseLeave={() => setShowProducts(false)} className="absolute left-0 top-full w-full bg-[#0a0a0b] border-t-2 border-orange-600 shadow-2xl hidden lg:block">
              <div className="max-w-[1400px] mx-auto p-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map((item, index) => (
                  <motion.div key={index} whileHover={{ x: 5 }}>
                    <Link href={`/products-${item.slug}`} onClick={closeMenus} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-orange-500/50 hover:bg-orange-600/5 transition-all group">
                      <div className="text-lg text-orange-500 group-hover:scale-110 transition-transform p-2 bg-orange-500/5 rounded-lg">{getIcon(item.slug)}</div>
                      <span className="text-[11px] font-black text-gray-300 group-hover:text-white uppercase leading-tight tracking-tight transition-colors">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="bg-orange-600 py-2 text-center text-[9px] font-black tracking-[4px] text-white">
                INDIAN ROLLER INDUSTRIES - EXCELLENCE IN EVERY TURN
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- MOBILE SIDEBAR MENU --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#0a0a0b] z-[150] lg:hidden flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 bg-[#111]">
              <Image src="/logo1.png" alt="Logo" width={140} height={40} className="w-auto h-8" />
              <button onClick={() => setIsMenuOpen(false)} className="text-orange-500 text-3xl"><FaTimes /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col space-y-4">
              {['HOME', 'ABOUT', 'BLOG', 'CONTACT'].map((item, i) => (
                <Link key={i} href={item === 'HOME' ? '/' : `/${item.toLowerCase()}`} onClick={closeMenus} className="text-4xl font-black text-white hover:text-orange-500 transition-colors italic uppercase tracking-tighter">{item}</Link>
              ))}
              
              <div className="pt-4 border-t border-white/10">
                <button onClick={() => setMobileProductOpen(!mobileProductOpen)} className="w-full flex justify-between items-center text-4xl font-black text-orange-500 uppercase italic tracking-tighter">
                  PRODUCTS <FaChevronDown size={24} className={`transition-transform ${mobileProductOpen ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {mobileProductOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-6 grid grid-cols-1 gap-3 overflow-hidden">
                      {categories.map((item, index) => (
                        <Link key={index} href={`/products-${item.slug}`} onClick={closeMenus} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 italic font-black">
                          <div className="text-xl text-orange-500">{getIcon(item.slug)}</div>
                          <span className="text-sm text-gray-200">{item.name}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="p-6 bg-[#111]">
              <button onClick={() => { setIsPopupOpen(true); setIsMenuOpen(false); }} className="w-full bg-orange-600 text-white font-bold py-4 rounded-sm tracking-widest uppercase text-xs">Get In Touch</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InquiryModal isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </header>
  );
};

export default Navbar;