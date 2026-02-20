"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BlogCard from "@/components/blog/BlogCard";
import api from "@/lib/axios"; //

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]); //
  const containerRef = useRef(null);

  // 🔄 Fetching Real Data from Backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs"); //
        // Sirf wahi blogs dikhayenge jo 'Published' hain
        setBlogs(res.data.filter((b: any) => b.status === "Published"));
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bannerY = useTransform(scrollYProgress, [0, 0.3], [0, -70]);
  const contentScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.97]);

  return (
    <main ref={containerRef} className="min-h-screen mt-10 bg-[#313030] pb-40 relative overflow-hidden text-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-[-10%] w-[600px] h-[600px] bg-orange-600/5 blur-[140px] rounded-full -z-10" />
      <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-zinc-700/10 blur-[120px] rounded-full -z-10" />

      <motion.section style={{ y: bannerY }} className="relative w-full h-[70vh] flex items-center justify-center pt-20">
        <div className="relative w-[95%] h-[95%] bg-zinc-900/60 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl backdrop-blur-md">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1)_0%,transparent_70%)]" />
            <div className="absolute bottom-0 w-full h-1/2" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`, backgroundSize: '45px 45px', perspective: '1200px', transform: 'rotateX(60deg) scale(2.2)', maskImage: 'linear-gradient(to top, black, transparent)' }} />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-10 text-left lg:text-center">
             <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter uppercase">Tech <br /> <span className="text-orange-500 italic">Resources.</span></h1>
          </div>
        </div>
      </motion.section>

      {/* --- BLOG GRID --- */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <motion.div style={{ scale: contentScale }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog: any, index: number) => (
            <motion.div key={blog._id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}