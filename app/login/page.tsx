"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@indianroller.com" && password === "ritik@2026") {
      localStorage.setItem("isAdminLoggedIn", "true");
      router.push("/admin/dashboard");
    } else {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#020617] overflow-hidden">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex w-full max-w-5xl h-[650px] bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden mx-4"
      >
        {/* Left Section: Login Form */}
        <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center border-r border-white/5">
          <div className="mb-12">
            <h1 className="text-4xl font-extralight text-white mb-2">Log in</h1>
            <p className="text-slate-400 text-sm tracking-wide uppercase">Indian Roller Admin Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">@</span>
                <input 
                  type="email" 
                  placeholder="Username" 
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-white outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔒</span>
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-white outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-full shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              Enter Dashboard <span className="text-xl">→</span>
            </motion.button>
          </form>
        </div>

        {/* Right Section: Visual / Typography (Reference style) */}
        <div className="hidden lg:flex w-1/2 p-12 flex-col justify-between items-start text-white bg-gradient-to-br from-white/5 to-transparent">
          <div>
            <h2 className="text-8xl font-thin opacity-20">FEB <br /> 2026</h2>
          </div>
          
          <div className="space-y-6">
            <div className="h-1 w-20 bg-blue-500" />
            <p className="text-lg font-light leading-relaxed text-slate-300">
              Cyberpunk inspired,<br />
              hyper-realistic <br />
              sci-fi admin interface.
            </p>
            <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition">📸</div>
               <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition">🐦</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}