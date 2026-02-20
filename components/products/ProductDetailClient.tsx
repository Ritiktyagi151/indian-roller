"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTools, FaMicrochip, FaIndustry, FaProjectDiagram, FaLightbulb } from "react-icons/fa";

export default function ProductDetailClient({ product }: { product: any }) {
  const [mounted, setMounted] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '');
  const [imgSrc, setImgSrc] = useState(
    product.image?.startsWith('/') ? `${baseUrl}${product.image}` : product.image
  );

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="bg-[#0a0a0b] min-h-screen pt-32 pb-20 px-6 text-white selection:bg-orange-500/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="w-full lg:w-1/2 lg:sticky lg:top-32 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-zinc-900/50 p-4 shadow-2xl shadow-orange-500/5"
            >
              <img 
                src={imgSrc} 
                alt={product.name}
                className="w-full h-auto object-cover rounded-[2.5rem]"
                onError={() => setImgSrc('https://placehold.co/800x800/111/orange?text=IMAGE+NOT+FOUND')}
              />
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {product.benefits?.slice(0, 4).map((benefit: string, i: number) => (
                <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                  <p className="text-orange-500 font-black text-[9px] uppercase tracking-widest mb-1 italic">Benefit {i+1}</p>
                  <p className="text-gray-300 text-xs font-bold leading-tight uppercase tracking-tighter">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <span className="text-orange-500 font-black tracking-[0.3em] uppercase text-xs border-l-4 border-orange-500 pl-4 italic">
                {product.category?.name || "Industrial"} Specialist
              </span>
              <h1 className="text-6xl md:text-8xl font-black uppercase italic leading-[0.8] tracking-tighter">
                {product.name}
              </h1>
              <p className="text-gray-400 text-lg font-medium leading-relaxed italic uppercase tracking-tighter">
                {product.shortDesc}
              </p>
            </motion.div>

            <section className="space-y-4">
              <h3 className="flex items-center gap-3 text-xl font-black uppercase italic tracking-widest text-orange-500">
                <FaIndustry className="text-sm" /> Overview
              </h3>
              <div 
                className="text-gray-500 leading-relaxed font-medium uppercase text-xs tracking-wider prose prose-invert"
                dangerouslySetInnerHTML={{ __html: product.description }} 
              />
            </section>

            {product.technicalSpecs && (
              <motion.div className="space-y-6">
                <h3 className="flex items-center gap-3 text-xl font-black uppercase italic tracking-widest text-orange-500">
                  <FaMicrochip className="text-sm" /> Technical Specs
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(product.technicalSpecs).map(([key, value]: any) => (
                    <div key={key} className="flex justify-between items-center p-5 bg-white/5 border border-white/10 rounded-2xl group hover:border-orange-500/30 transition-all">
                      <span className="text-gray-500 uppercase text-[10px] font-black tracking-widest group-hover:text-orange-500">{key}</span>
                      <span className="text-white font-bold text-sm text-right uppercase italic tracking-tighter">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.button 
              whileHover={{ scale: 1.02 }}
              className="w-full bg-orange-600 hover:bg-white hover:text-black py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all shadow-2xl shadow-orange-600/20"
            >
              Get Professional Quote
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}