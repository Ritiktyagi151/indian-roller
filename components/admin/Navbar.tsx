"use client";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    router.push("/login");
  };

  return (
    <header className="h-16 fixed top-0 right-0 left-64 bg-white/80 backdrop-blur-md border-b flex items-center justify-between px-6 z-40">
      <h2 className="font-semibold text-slate-700">Admin Panel</h2>
      
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-bold">Ritik Tyagi</p>
          <button 
            onClick={handleLogout}
            className="text-[10px] text-red-500 hover:underline flex items-center gap-1"
          >
            <LogOut size={10} /> Logout
          </button>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <User size={20} />
        </div>
      </div>
    </header>
  );
}