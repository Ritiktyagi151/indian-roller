"use client";
import WeatherCard from "@/components/admin/WeatherCard";
import GlassCard from "@/components/admin/GlassCard";

export default function Dashboard() {
  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
        <WeatherCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard title="Blogs" count="12" />
        <GlassCard title="Products" count="45" />
        <GlassCard title="Inquiries" count="8" />
      </div>
    </div>
  );
}