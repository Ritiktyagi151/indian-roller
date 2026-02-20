import GlassCard from "@/components/admin/GlassCard";
import WeatherCard from "@/components/admin/WeatherCard";

export default function Dashboard() {
  return (
    <div className="p-8 ml-64 bg-[#f8fafc] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800">Welcome Back!</h2>
        <div className="flex gap-4">
          <WeatherCard /> {/* Live Weather Widget */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 border-2 border-white shadow-lg" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Blog Stats Card with 3D Hover */}
        <GlassCard title="Total Blogs" count="124" color="from-pink-500 to-rose-500" />
        <GlassCard title="Live Products" count="450" color="from-cyan-500 to-blue-500" />
        <GlassCard title="New Inquiries" count="12" color="from-amber-500 to-orange-500" />
      </div>
      
      {/* 3D Illustration Section */}
      <div className="mt-10 h-64 bg-white rounded-3xl shadow-xl flex items-center justify-center relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent pointer-events-none" />
         <p className="text-slate-400 italic">3D Animation Canvas (Three.js/Spline) yahan load hoga</p>
      </div>
    </div>
  );
}