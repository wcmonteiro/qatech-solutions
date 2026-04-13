import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, MessageSquare, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import BlogTab from "@/components/admin/BlogTab";
import TestimonialsTab from "@/components/admin/TestimonialsTab";

const tabs = [
  { key: "blog", label: "Blog", icon: FileText },
  { key: "testimonials", label: "Depoimentos", icon: MessageSquare },
];

export default function AdminPage() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("blog");

  if (currentUser && currentUser.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F1C] flex flex-col items-center justify-center gap-4">
        <div className="text-5xl font-bold text-slate-200 dark:text-white/10">403</div>
        <p className="text-slate-500 dark:text-white/40">Acesso restrito a administradores.</p>
        <Link to="/" className="text-blue-500 text-sm hover:underline">← Voltar</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F1C]">
      {/* Header */}
      <div className="bg-white dark:bg-[#0A0F1C] border-b border-slate-200 dark:border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-slate-900 dark:text-white text-lg">Painel Admin</span>
        </div>
        <Link to="/" className="flex items-center gap-1.5 text-slate-400 dark:text-white/30 hover:text-slate-700 dark:hover:text-white text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar ao site
        </Link>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#0A0F1C] px-6">
        <div className="flex gap-1">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                activeTab === key
                  ? "border-blue-500 text-blue-500 dark:text-blue-400"
                  : "border-transparent text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white/70"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === "blog" && <BlogTab />}
        {activeTab === "testimonials" && <TestimonialsTab />}
      </div>
    </div>
  );
}