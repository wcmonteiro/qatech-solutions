import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, Twitter, Linkedin, Link2, ChevronLeft, ChevronRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";

const categoryColors = {
  "Governança Digital": "text-blue-500 bg-blue-500/10 border-blue-500/20",
  "Inteligência Artificial": "text-purple-500 bg-purple-500/10 border-purple-500/20",
  "Estratégia": "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
  "Inovação": "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
  "Digital Business": "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
};

function ShareButton({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 text-sm font-medium transition-all duration-200"
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

function RelatedCard({ post }) {
  const colorClass = categoryColors[post.category] || "text-blue-500 bg-blue-500/10 border-blue-500/20";
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] hover:border-blue-500/30 dark:hover:border-blue-500/20 hover:shadow-md dark:hover:shadow-none transition-all duration-300 overflow-hidden"
    >
      {post.cover_image && (
        <div className="h-36 overflow-hidden">
          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-5">
        <span className={`text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border ${colorClass}`}>
          {post.category}
        </span>
        <h4 className="mt-3 text-sm font-semibold text-slate-800 dark:text-white/80 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors line-clamp-2">
          {post.title}
        </h4>
      </div>
    </Link>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    setPost(null);

    base44.entities.BlogPost.filter({ published: true }, "-created_date", 50)
      .then((posts) => {
        setAllPosts(posts);
        const found = posts.find((p) => p.slug === slug);
        setPost(found || null);
        if (found) {
          const rel = posts
            .filter((p) => p.id !== found.id && p.category === found.category)
            .slice(0, 3);
          setRelated(rel.length > 0 ? rel : posts.filter((p) => p.id !== found.id).slice(0, 3));
        }
      })
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const shareUrl = window.location.href;

  // Inject dynamic Open Graph + Twitter Card meta tags
  useEffect(() => {
    if (!post) return;

    const setMeta = (attrs) => {
      const selector = attrs.property
        ? `meta[property="${attrs.property}"]`
        : `meta[name="${attrs.name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        if (attrs.property) el.setAttribute("property", attrs.property);
        if (attrs.name) el.setAttribute("name", attrs.name);
        el.setAttribute("data-dynamic", "blog");
        document.head.appendChild(el);
      }
      el.setAttribute("content", attrs.content);
    };

    const prevTitle = document.title;
    document.title = `${post.title} | QA Tecnologia`;

    const metas = [
      { property: "og:type", content: "article" },
      { property: "og:title", content: post.title },
      { property: "og:description", content: post.excerpt || "" },
      { property: "og:url", content: shareUrl },
      { property: "og:site_name", content: "QA Tecnologia" },
      ...(post.cover_image ? [{ property: "og:image", content: post.cover_image }] : []),
      { name: "twitter:card", content: post.cover_image ? "summary_large_image" : "summary" },
      { name: "twitter:title", content: post.title },
      { name: "twitter:description", content: post.excerpt || "" },
      ...(post.cover_image ? [{ name: "twitter:image", content: post.cover_image }] : []),
      { name: "description", content: post.excerpt || "" },
    ];

    metas.forEach(setMeta);

    return () => {
      document.title = prevTitle;
      document.querySelectorAll("meta[data-dynamic='blog']").forEach((el) => el.remove());
    };
  }, [post, shareUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const handleLinkedinShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F1C] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F1C] flex flex-col items-center justify-center gap-6 px-6">
        <div className="text-6xl font-bold text-slate-200 dark:text-white/10">404</div>
        <p className="text-slate-500 dark:text-white/40 text-lg">Artigo não encontrado.</p>
        <Link to="/#blog" className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
        </Link>
      </div>
    );
  }

  const colorClass = categoryColors[post.category] || "text-blue-500 bg-blue-500/10 border-blue-500/20";
  const formattedDate = new Date(post.created_date).toLocaleDateString("pt-BR", {
    day: "2-digit", month: "long", year: "numeric"
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F1C]">
      {/* Header nav */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-[#0A0F1C]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698e855b9e9a93cb4b5c4c52/550ce8d56_QA-logo-branca-transparente.png"
            alt="QA Tecnologia"
            className="h-7 w-auto dark:block hidden"
          />
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698e855b9e9a93cb4b5c4c52/550ce8d56_QA-logo-branca-transparente.png"
            alt="QA Tecnologia"
            className="h-7 w-auto dark:hidden block brightness-0"
          />
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${colorClass}`}>
              {post.category}
            </span>
            {post.read_time && (
              <span className="flex items-center gap-1.5 text-slate-400 dark:text-white/30 text-sm">
                <Clock className="w-3.5 h-3.5" /> {post.read_time} min de leitura
              </span>
            )}
            <span className="flex items-center gap-1.5 text-slate-400 dark:text-white/30 text-sm">
              <Calendar className="w-3.5 h-3.5" /> {formattedDate}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-slate-500 dark:text-white/50 font-light leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {post.author && (
            <div className="flex items-center gap-3 mb-10">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-500 dark:text-blue-300">
                  {post.author.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-white/60">{post.author}</span>
            </div>
          )}
        </motion.div>

        {/* Cover */}
        {post.cover_image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl overflow-hidden mb-12 aspect-video"
          >
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-slate dark:prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline
            prose-code:text-blue-600 dark:prose-code:text-blue-300
            prose-blockquote:border-blue-500 prose-blockquote:text-slate-500 dark:prose-blockquote:text-white/50
            mb-12"
        >
          {post.content ? (
            <ReactMarkdown>{post.content}</ReactMarkdown>
          ) : (
            <p className="text-slate-400 dark:text-white/30 italic">Conteúdo completo em breve.</p>
          )}
        </motion.div>

        {/* Share */}
        <div className="border-t border-slate-200 dark:border-white/[0.06] pt-8 mb-12">
          <p className="text-sm text-slate-500 dark:text-white/40 mb-4 font-medium">Compartilhar artigo</p>
          <div className="flex flex-wrap gap-3">
            <ShareButton icon={Twitter} label="Twitter / X" onClick={handleTwitterShare} />
            <ShareButton icon={Linkedin} label="LinkedIn" onClick={handleLinkedinShare} />
            <ShareButton icon={Link2} label={copied ? "Link copiado!" : "Copiar link"} onClick={handleCopyLink} />
          </div>
        </div>

        {/* Prev / Next navigation */}
        {(prevPost || nextPost) && (
          <div className="grid sm:grid-cols-2 gap-4 mb-16">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="group flex flex-col gap-2 p-5 rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] hover:border-blue-500/30 dark:hover:border-blue-500/20 transition-all duration-300"
              >
                <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-white/30">
                  <ChevronLeft className="w-3.5 h-3.5" /> Anterior
                </span>
                <span className="text-sm font-semibold text-slate-700 dark:text-white/70 group-hover:text-blue-600 dark:group-hover:text-blue-300 line-clamp-2 transition-colors">
                  {prevPost.title}
                </span>
              </Link>
            ) : <div />}
            {nextPost && (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="group flex flex-col gap-2 p-5 rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] hover:border-blue-500/30 dark:hover:border-blue-500/20 transition-all duration-300 text-right"
              >
                <span className="flex items-center justify-end gap-1 text-xs text-slate-400 dark:text-white/30">
                  Próximo <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-sm font-semibold text-slate-700 dark:text-white/70 group-hover:text-blue-600 dark:group-hover:text-blue-300 line-clamp-2 transition-colors">
                  {nextPost.title}
                </span>
              </Link>
            )}
          </div>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Artigos relacionados
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <RelatedCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}