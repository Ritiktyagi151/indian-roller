"use client";
import { LayoutDashboard, BookOpen, Package, Calendar, Mail, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={20}/>, href: "/admin/dashboard" },
  { name: "Blogs", icon: <BookOpen size={20}/>, href: "/admin/blogs" },
  { name: "Products", icon: <Package size={20}/>, href: "/admin/products" },
  { name: "Calendar", icon: <Calendar size={20}/>, href: "/admin/calendar" },
  { name: "Inquiries", icon: <Mail size={20}/>, href: "/admin/inquiries" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-[#0f172a] text-slate-300 p-6 fixed left-0 top-0 border-r border-white/5 z-50">
      <div className="mb-10 px-2">
        <h1 className="text-xl font-bold text-white tracking-widest">ROLLER <span className="text-blue-500 text-xs">PRO</span></h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
              pathname === item.href ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "hover:bg-white/5 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-10 left-6 right-6">
        <button className="flex items-center gap-4 p-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
          <LogOut size={20}/>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}