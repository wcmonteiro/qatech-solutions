import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { base44 } from "@/api/base44Client";

const categoryColors = {
  "Governança Digital": "text-blue-500 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
  "Inteligência Artificial": "text-purple-500 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
  "Estratégia": "text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  "Inovação": "text-cyan-500 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  "Digital Business": "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

const placeholderPosts = [
  {
    id: "1",
    title: "Governança Digital: como estruturar uma estratégia eficaz para 2025",
    excerpt: "Descubra os pilares fundamentais para implementar uma governança digital sólida que alinhe TI aos objetivos estratégicos do negócio.",
    category: "Governança Digital",
    author: "Equipe QA",
    read_time: 5,
    created_date: "2025-03-10"
  },
  {
    id: "2",
    title: "IA nas organizações: oportunidades reais além do hype",
    excerpt: "Como identificar casos de uso de Inteligência Artificial com ROI comprovado e implementá-los de forma sustentável na sua empresa.",
    category: "Inteligência Artificial",
    author: "Equipe QA",
    read_time: 7,
    created_date: "2025-02-22"
  },
  {
    id: "3",
    title: "Digital Business Assurance: garantindo qualidade na era digital",
    excerpt: "Entenda como a abordagem de DBA reduz riscos, aumenta a agilidade e garante melhores experiências para clientes digitais.",
    category: "Digital Business",
    author: "Equipe QA",
    read_time: 4,
    created_date: "2025-02-05"
  }
];

function PostCard({ post, index }) {
  const colorClass = categoryColors[post.category] || "text-blue-500 dark:text-blue-400 bg-blue-500/10 border-blue-500/20";
  const formattedDate = new Date(post.created_date).toLocaleDateString("pt-BR", {
    day: "2-digit", month: "short", year: "numeric"
  });

  return (
    <Link to={post.slug ? `/blog/${post.slug}` : "#"} className="block">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group flex flex-col rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] hover:border-blue-500/30 dark:hover:border-blue-500/20 hover:shadow-md dark:hover:shadow-none transition-all duration-500 overflow-hidden cursor-pointer"
      >
        <div className="relative h-48 overflow-hidden">
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Tag className="w-7 h-7 text-blue-500/30" />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-[#0A0F1C]/80 to-transparent" />
        </div>

        <div className="flex flex-col flex-1 p-7">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-[11px] font-semibold tracking-[0.12em] uppercase px-3 py-1 rounded-full border ${colorClass}`}>
              {post.category}
            </span>
            {post.read_time && (
              <span className="flex items-center gap-1 text-slate-400 dark:text-white/25 text-xs">
                <Clock className="w-3 h-3" />
                {post.read_time} min
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-100 transition-colors">
            {post.title}
          </h3>

          <p className="text-slate-500 dark:text-white/40 text-sm font-light leading-relaxed flex-1">
            {post.excerpt}
          </p>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-slate-300 dark:text-white/20 text-xs">{formattedDate}</span>
            <span className="flex items-center gap-1 text-blue-500 dark:text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              Ler mais <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Todos");

  const categories = ["Todos", "Governança Digital", "Inteligência Artificial", "Estratégia", "Digital Business"];

  useEffect(() => {
    base44.entities.BlogPost.filter({ published: true }, "-created_date", 6)
      .then((data) => setPosts(data.length > 0 ? data : placeholderPosts))
      .catch(() => setPosts(placeholderPosts))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "Todos"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <section id="blog" className="relative py-28 md:py-36 bg-slate-50 dark:bg-[#070B14]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/[0.03] rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-sm text-blue-500 dark:text-blue-400 tracking-[0.2em] uppercase font-medium">
              Blog & Insights
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-4 tracking-tight">
              Conteúdo de autoridade
            </h2>
            <p className="text-slate-500 dark:text-white/40 mt-3 text-base font-light max-w-lg">
              Tendências, práticas e casos sobre Governança, IA e Estratégia Digital.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                    : "bg-white dark:bg-white/[0.04] text-slate-500 dark:text-white/40 border border-slate-200 dark:border-white/[0.06] hover:text-slate-800 dark:hover:text-white/70 hover:border-slate-300 dark:hover:border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-16 text-slate-400 dark:text-white/30 text-sm">
            Nenhum artigo encontrado nesta categoria.
          </div>
        )}
      </div>
    </section>
  );
}