import React, { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";

const categories = ["Governança Digital", "Inteligência Artificial", "Estratégia", "Inovação", "Digital Business"];

const inputClass = "w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors";

export default function BlogPostForm({ post, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    category: post?.category || "",
    cover_image: post?.cover_image || "",
    author: post?.author || "",
    read_time: post?.read_time || "",
    published: post?.published ?? false,
  });
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleTitle = (v) => {
    set("title", v);
    if (!post) set("slug", v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = { ...form, read_time: form.read_time ? Number(form.read_time) : undefined };
    if (post) {
      await base44.entities.BlogPost.update(post.id, data);
    } else {
      await base44.entities.BlogPost.create(data);
    }
    setSaving(false);
    onSave();
  };

  return (
    <div>
      <button onClick={onCancel} className="flex items-center gap-1.5 text-slate-400 dark:text-white/30 hover:text-slate-700 dark:hover:text-white text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar à lista
      </button>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{post ? "Editar Post" : "Novo Post"}</h2>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm text-slate-600 dark:text-white/50 mb-2">Título *</label>
            <input value={form.title} onChange={(e) => handleTitle(e.target.value)} required placeholder="Título do post" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-white/50 mb-2">Slug (URL)</label>
            <input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="meu-post" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-white/50 mb-2">Categoria *</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)} required className={`${inputClass} appearance-none`}>
              <option value="">Selecione...</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-white/50 mb-2">Autor</label>
            <input value={form.author} onChange={(e) => set("author", e.target.value)} placeholder="Nome do autor" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-white/50 mb-2">Tempo de leitura (min)</label>
            <input type="number" value={form.read_time} onChange={(e) => set("read_time", e.target.value)} placeholder="5" className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-slate-600 dark:text-white/50 mb-2">URL da imagem de capa</label>
            <input value={form.cover_image} onChange={(e) => set("cover_image", e.target.value)} placeholder="https://..." className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-slate-600 dark:text-white/50 mb-2">Resumo *</label>
            <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} required rows={2} placeholder="Breve descrição do post..." className={`${inputClass} resize-none`} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-slate-600 dark:text-white/50 mb-2">Conteúdo (Markdown)</label>
            <textarea value={form.content} onChange={(e) => set("content", e.target.value)} rows={12} placeholder="# Título&#10;&#10;Escreva o conteúdo em Markdown..." className={`${inputClass} resize-y font-mono text-xs`} />
          </div>
          <div className="sm:col-span-2 flex items-center gap-3">
            <input type="checkbox" id="published" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="w-4 h-4 accent-blue-500" />
            <label htmlFor="published" className="text-sm text-slate-600 dark:text-white/50 cursor-pointer">Publicar imediatamente</label>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={saving} className="bg-blue-500 hover:bg-blue-600 text-white gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {post ? "Salvar alterações" : "Criar post"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
}