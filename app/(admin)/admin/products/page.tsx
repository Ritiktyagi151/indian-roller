"use client";
import React, { useState, useEffect } from "react";
import { Plus, X, Save, Trash2, Factory, Box, Loader2, Globe, FileText, Edit2, Link as LinkIcon, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/axios";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { 
  ssr: false,
  loading: () => <div className="h-40 bg-white/5 animate-pulse rounded-xl" />
});
import "react-quill-new/dist/quill.snow.css";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"], 
    ["clean"],
  ],
};

export default function FinalInventoryMaster() {
  const [view, setView] = useState<"list" | "categoryForm" | "productForm">("list");
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [catForm, setCatForm] = useState({ 
    name: "", metaTitle: "", metaDescription: "", metaKeywords: "", canonicalUrl: "", description: "", image: null as any 
  });
  
  const [prodForm, setProdForm] = useState({ 
    categoryId: "", name: "", metaTitle: "", metaDescription: "", metaKeywords: "", canonicalUrl: "", description: "", image: null as any 
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [c, p] = await Promise.all([api.get("/categories"), api.get("/products")]);
      setCategories(Array.isArray(c.data) ? c.data : []);
      setProducts(Array.isArray(p.data) ? p.data : []);
    } catch (err) { console.error("Fetch Error:", err); }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const resetForms = () => {
    setView("list");
    setEditingId(null);
    setCatForm({ name: "", metaTitle: "", metaDescription: "", metaKeywords: "", canonicalUrl: "", description: "", image: null });
    setProdForm({ categoryId: "", name: "", metaTitle: "", metaDescription: "", metaKeywords: "", canonicalUrl: "", description: "", image: null });
  };

  // --- 🔥 EDIT HANDLERS (Ye functions ab form open karenge) ---
  const startEditCat = (cat: any) => {
    setEditingId(cat._id);
    setCatForm({
      name: cat.name || "",
      metaTitle: cat.metaTitle || "",
      metaDescription: cat.metaDescription || "",
      metaKeywords: cat.metaKeywords || "",
      canonicalUrl: cat.canonicalUrl || "",
      description: cat.description || "",
      image: null
    });
    setView("categoryForm"); // Modal open karein
  };

  const startEditProd = (prod: any) => {
    setEditingId(prod._id);
    setProdForm({
      categoryId: prod.category?._id || prod.category || "",
      name: prod.name || "",
      metaTitle: prod.metaTitle || "",
      metaDescription: prod.metaDescription || "",
      metaKeywords: prod.metaKeywords || "",
      canonicalUrl: prod.canonicalUrl || "",
      description: prod.description || "",
      image: null
    });
    setView("productForm"); // Modal open karein
  };

  const handleCategorySave = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    const data = new FormData();
    data.append("name", catForm.name);
    data.append("metaTitle", catForm.metaTitle || "");
    data.append("metaDescription", catForm.metaDescription || "");
    data.append("metaKeywords", catForm.metaKeywords || "");
    data.append("canonicalUrl", catForm.canonicalUrl || "");
    data.append("description", catForm.description || "");
    if (catForm.image) data.append("image", catForm.image);

    try {
      if (editingId) await api.put(`/categories/${editingId}`, data);
      else await api.post("/categories", data);
      resetForms(); fetchData();
    } catch (err) { alert("Submission failed."); }
    setBtnLoading(false);
  };

  const handleProductSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.categoryId) return alert("Select Industry!");
    setBtnLoading(true);
    const data = new FormData();
    data.append("name", prodForm.name);
    data.append("categoryId", prodForm.categoryId);
    data.append("metaTitle", prodForm.metaTitle || "");
    data.append("metaDescription", prodForm.metaDescription || "");
    data.append("metaKeywords", prodForm.metaKeywords || "");
    data.append("canonicalUrl", prodForm.canonicalUrl || "");
    data.append("description", prodForm.description || "");
    if (prodForm.image) data.append("image", prodForm.image);

    try {
      if (editingId) await api.put(`/products/${editingId}`, data);
      else await api.post("/products", data);
      resetForms(); fetchData();
    } catch (err) { alert("Submission failed."); }
    setBtnLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#070708] text-gray-300 p-6 md:p-10 font-sans italic selection:bg-orange-500/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-black uppercase text-white tracking-tighter italic">Inventory Master <span className="text-orange-500 underline">v4.0</span></h1>
          <div className="flex gap-4">
            <button onClick={() => { resetForms(); setView("categoryForm"); }} className="bg-zinc-900 border border-white/5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase hover:bg-orange-600 transition-all tracking-widest flex items-center gap-2"><Plus size={14}/> Category</button>
            <button onClick={() => { resetForms(); setView("productForm"); }} className="bg-orange-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all tracking-widest flex items-center gap-2 shadow-2xl shadow-orange-600/20"><Plus size={14}/> Product</button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-40"><Loader2 className="animate-spin text-orange-500" size={50}/></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Category List Section */}
            <section className="bg-zinc-900/40 p-8 rounded-[3rem] border border-white/5 backdrop-blur-xl">
              <h2 className="text-[10px] font-black uppercase mb-8 text-orange-500 flex items-center gap-2 tracking-[0.4em] border-b border-white/5 pb-4 italic"><Factory size={16}/> Industrial Sectors</h2>
              <div className="space-y-4">
                {categories.map((cat: any) => (
                  <div key={cat._id} className="flex justify-between items-center p-4 bg-black/40 rounded-[1.5rem] border border-white/5 hover:border-orange-500/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-800 border border-white/10">{cat.image && <img src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${cat.image}`} className="w-full h-full object-cover"/>}</div>
                      <span className="font-black uppercase text-xs text-white tracking-widest">{cat.name}</span>
                    </div>
                    <div className="flex gap-3">
                      {/* 🔥 EDIT BUTTON FIXED */}
                      <button onClick={() => startEditCat(cat)} className="text-gray-600 hover:text-orange-500 transition-colors"><Edit2 size={16}/></button>
                      <button onClick={() => {if(confirm("Delete category?")) api.delete(`/categories/${cat._id}`).then(fetchData)}} className="text-gray-600 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Product List Section */}
            <section className="bg-zinc-900/40 p-8 rounded-[3rem] border border-white/5 backdrop-blur-xl">
              <h2 className="text-[10px] font-black uppercase mb-8 text-orange-500 flex items-center gap-2 tracking-[0.4em] border-b border-white/5 pb-4 italic"><Box size={16}/> Stock Inventory</h2>
              <div className="space-y-4">
                {products.map((prod: any) => (
                  <div key={prod._id} className="flex justify-between items-center p-4 bg-black/40 rounded-[1.5rem] border border-white/5 hover:border-orange-500/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-800 border border-white/10">{prod.image && <img src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${prod.image}`} className="w-full h-full object-cover"/>}</div>
                      <div>
                        <span className="font-black uppercase text-xs text-white tracking-widest">{prod.name}</span>
                        <p className="text-[8px] text-gray-600 uppercase tracking-tighter">{prod.category?.name}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {/* 🔥 EDIT BUTTON FIXED */}
                      <button onClick={() => startEditProd(prod)} className="text-gray-600 hover:text-orange-500 transition-colors"><Edit2 size={16}/></button>
                      <button onClick={() => {if(confirm("Delete product?")) api.delete(`/products/${prod._id}`).then(fetchData)}} className="text-gray-600 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      <AnimatePresence>
        {(view === "categoryForm" || view === "productForm") && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4 overflow-y-auto italic font-black uppercase text-[10px]">
            <div className="bg-[#0c0c0d] border border-white/10 w-full max-w-5xl rounded-[3.5rem] overflow-hidden shadow-2xl my-auto">
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h2 className="tracking-[0.4em] text-white italic">{view === "categoryForm" ? (editingId ? 'Edit Sector' : 'Industry Profile') : (editingId ? 'Edit Blueprint' : 'Product Blueprint')}</h2>
                <button onClick={resetForms} className="text-gray-500 hover:text-white transition-transform hover:rotate-90"><X size={20}/></button>
              </div>

              <form onSubmit={view === "categoryForm" ? handleCategorySave : handleProductSave} className="p-10 space-y-10 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {view === "productForm" && (
                    <div className="space-y-2">
                      <label className="text-gray-500 tracking-widest">Sector Selection</label>
                      <select required value={prodForm.categoryId} onChange={(e) => setProdForm({...prodForm, categoryId: e.target.value})} className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-orange-500 cursor-pointer">
                        <option value="">Select Industry</option>
                        {categories.map((cat: any) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                      </select>
                    </div>
                  )}
                  <div className={view === "productForm" ? "md:col-span-1 space-y-2" : "md:col-span-2 space-y-2"}>
                    <label className="text-gray-500 tracking-widest">{view === "categoryForm" ? 'Category Name' : 'Product Nomenclature'}</label>
                    <input required value={view === "categoryForm" ? catForm.name : prodForm.name} onChange={(e) => view === "categoryForm" ? setCatForm({...catForm, name: e.target.value}) : setProdForm({...prodForm, name: e.target.value})} className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white focus:border-orange-500 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-orange-500 flex items-center gap-2"><ImageIcon size={14}/> {view === "categoryForm" ? 'Upload Banner' : 'Display Image'}</label>
                    <input type="file" onChange={(e: any) => view === "categoryForm" ? setCatForm({...catForm, image: e.target.files[0]}) : setProdForm({...prodForm, image: e.target.files[0]})} className="w-full bg-black border border-white/10 p-4 rounded-2xl text-gray-600" />
                  </div>
                </div>

                <div className="bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5 space-y-8">
                   <div className="flex items-center gap-2 text-orange-500 border-b border-white/5 pb-4"><Globe size={16}/> <h3 className="tracking-[0.3em]">SEO Master Hub</h3></div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-bold italic">
                      <div className="space-y-2"><label className="text-gray-600">Meta Title</label><input value={view === "categoryForm" ? catForm.metaTitle : prodForm.metaTitle} onChange={(e) => view === "categoryForm" ? setCatForm({...catForm, metaTitle: e.target.value}) : setProdForm({...prodForm, metaTitle: e.target.value})} className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white focus:border-orange-500 outline-none" placeholder="Title..." /></div>
                      <div className="space-y-2"><label className="text-gray-600">Canonical Link</label><input value={view === "categoryForm" ? catForm.canonicalUrl : prodForm.canonicalUrl} onChange={(e) => view === "categoryForm" ? setCatForm({...catForm, canonicalUrl: e.target.value}) : setProdForm({...prodForm, canonicalUrl: e.target.value})} className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white focus:border-orange-500 outline-none" placeholder="https://..." /></div>
                      <div className="md:col-span-2 space-y-2"><label className="text-gray-600">Meta Keywords</label><input value={view === "categoryForm" ? catForm.metaKeywords : prodForm.metaKeywords} onChange={(e) => view === "categoryForm" ? setCatForm({...catForm, metaKeywords: e.target.value}) : setProdForm({...prodForm, metaKeywords: e.target.value})} className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white focus:border-orange-500 outline-none" placeholder="Keyword 1, Keyword 2..." /></div>
                      <div className="md:col-span-2 space-y-2"><label className="text-gray-600">Meta Description</label><textarea rows={2} value={view === "categoryForm" ? catForm.metaDescription : prodForm.metaDescription} onChange={(e) => view === "categoryForm" ? setCatForm({...catForm, metaDescription: e.target.value}) : setProdForm({...prodForm, metaDescription: e.target.value})} className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white focus:border-orange-500 outline-none resize-none" placeholder="Description snippet..." /></div>
                   </div>
                </div>

                <div className="space-y-4">
                   <label className="text-orange-500 flex items-center gap-2 tracking-[0.3em]"><FileText size={16}/> Detailed Content Description</label>
                   <div className="bg-white rounded-[2.5rem] overflow-hidden min-h-[450px]">
                      <ReactQuill theme="snow" modules={quillModules} value={view === "categoryForm" ? catForm.description : prodForm.description} onChange={(val) => view === "categoryForm" ? setCatForm({...catForm, description: val}) : setProdForm({...prodForm, description: val})} className="h-[360px] text-black font-sans lowercase" />
                   </div>
                </div>

                <div className="flex justify-end gap-5 pt-10 border-t border-white/5">
                  <button type="button" onClick={resetForms} className="px-12 py-5 rounded-[1.5rem] bg-zinc-900 border border-white/5 text-gray-500 hover:bg-red-600/10 transition-all font-black uppercase tracking-widest">Abort</button>
                  <button type="submit" disabled={btnLoading} className="px-14 py-5 rounded-[1.5rem] bg-orange-600 text-white shadow-2xl flex items-center gap-3 hover:scale-105 transition-all font-black uppercase tracking-widest">
                    {btnLoading ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>} {editingId ? 'Confirm Update' : 'Submit & Publish'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}