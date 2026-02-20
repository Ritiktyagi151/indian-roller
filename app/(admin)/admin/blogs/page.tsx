"use client";
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { Plus, ChevronLeft, Save, Globe, User, Calendar, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/axios";
import AdminBlogCard from "@/components/admin/AdminBlogCard";
import "react-quill-new/dist/quill.snow.css";

// 🔥 Quill Setup: Registering Styles for proper structure
const Quill = typeof window !== 'undefined' ? require('react-quill-new').Quill : null;
if (Quill) {
  const ImageResize = require('quill-image-resize-module-react').default;
  Quill.register('modules/imageResize', ImageResize);

  // Force Quill to use Style instead of Class
  const AlignStyle = Quill.import('attributors/style/align');
  Quill.register(AlignStyle, true);
  const ColorStyle = Quill.import('attributors/style/color');
  Quill.register(ColorStyle, true);
  const BackgroundStyle = Quill.import('attributors/style/background');
  Quill.register(BackgroundStyle, true);
}

const ReactQuill = dynamic(() => import("react-quill-new"), { 
  ssr: false,
  loading: () => <div className="h-[400px] bg-white/5 animate-pulse rounded-3xl border border-white/10" />
});

export default function BlogSystem() {
  const [view, setView] = useState<"list" | "form">("list");
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [content, setContent] = useState("");
  
  const [formData, setFormData] = useState({
    title: "", slug: "", author: "Ritik Tyagi",
    customDate: new Date().toISOString().split('T')[0],
    category: "Industrial", metaTitle: "", metaKeywords: "",
    metaDescription: "", canonicalUrl: ""
  });

  const quillModules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }], 
      [{ color: [] }, { background: [] }], // 🔥 Color Picker Added
      ["link", "image", "video"],
      ["clean"],
    ],
    imageResize: { modules: ['Resize', 'DisplaySize', 'Toolbar'] }
  }), []);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs");
      setBlogs(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("description", content); 
    if (imageFile) data.append("image", imageFile);

    try {
      if (editingId) await api.put(`/blogs/${editingId}`, data);
      else await api.post("/blogs", data);
      setView("list");
      fetchBlogs();
    } catch (err) { alert("Save failed"); }
  };

  const handleEdit = (blog: any) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title, slug: blog.slug, author: blog.author || "Ritik Tyagi",
      customDate: new Date(blog.customDate || blog.createdAt).toISOString().split('T')[0],
      category: blog.category, metaTitle: blog.metaTitle || "",
      metaKeywords: blog.metaKeywords || "", metaDescription: blog.metaDescription || "",
      canonicalUrl: blog.canonicalUrl || ""
    });
    setContent(blog.description);
    setImagePreview(blog.image ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${blog.image}` : null);
    setView("form");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white p-6 pt-10 font-black italic uppercase">
      <AnimatePresence mode="wait">
        {view === "list" ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end bg-white/5 p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <h2 className="text-4xl">Blog <span className="text-[#f26522]">Engine</span></h2>
              <button onClick={() => { setEditingId(null); setView("form"); setContent(""); }} className="bg-[#f26522] text-white px-8 py-4 rounded-2xl font-bold">
                NEW POST
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog: any) => (
                <AdminBlogCard key={blog._id} {...blog} onEdit={() => handleEdit(blog)} onDelete={() => fetchBlogs()} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-8 pb-20">
            <div className="flex justify-between items-center bg-white/5 p-5 rounded-[2rem] border border-white/10">
              <button onClick={() => setView("list")} className="text-gray-400">BACK</button>
              <button onClick={handleSave} className="bg-[#f26522] px-10 py-3 rounded-xl">SAVE ARTICLE</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-white/5 p-8 rounded-[3rem] border border-white/10 space-y-6">
                 <input name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none text-white" placeholder="Title" />
                 <input name="slug" value={formData.slug} onChange={handleInputChange} className="w-full bg-black border border-orange-500/20 p-4 rounded-xl outline-none text-orange-500" placeholder="Slug" />
                 <div className="bg-white rounded-[2.5rem] overflow-hidden min-h-[500px]">
                    <ReactQuill theme="snow" modules={quillModules} value={content} onChange={setContent} className="h-[400px] text-black not-italic" />
                 </div>
              </div>
              <div className="lg:col-span-4 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 space-y-4">
                 <h3 className="text-orange-500">SEO LAB</h3>
                 {["metaTitle", "metaKeywords", "canonicalUrl"].map(f => (
                   <input key={f} name={f} value={(formData as any)[f]} onChange={handleInputChange} className="w-full bg-black border border-white/10 p-3 rounded-lg text-xs" placeholder={f} />
                 ))}
                 <textarea name="metaDescription" value={formData.metaDescription} onChange={handleInputChange} rows={5} className="w-full bg-black border border-white/10 p-3 rounded-lg text-xs resize-none" placeholder="Description" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}