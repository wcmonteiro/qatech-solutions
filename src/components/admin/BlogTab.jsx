import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, X, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import BlogPostForm from "./BlogPostForm";

export default function BlogTab() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | "new" | post object
  const [deleting, setDeleting] = useState(null);

  const load = () => {
    setLoading(true);
    base44.entities.BlogPost.list("-created_date", 50)
      .then(setPosts)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const togglePublish = async (post) => {
    await base44.entities.BlogPost.update(post.id, { published: !post.published });
    load();
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    await base44.entities.BlogPost.delete(id);
    setDeleting(null);
    load();
  };

  if (editing !== null) {
    return (
      <BlogPostForm
        post={editing === "new" ? null : editing}
        onSave={() => { setEditing(null); load(); }}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Posts do Blog</h2>
        <Button onClick={() => setEditing("new")} className="bg-blue-500 hover:bg-blue-600 text-white gap-2">
          <Plus className="w-4 h-4" /> Novo Post
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 text-slate-400 dark:text-white/30 text-sm">Nenhum post criado ainda.</div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02]">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${post.published ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-white/40"}`}>
                    {post.published ? "Publicado" : "Rascunho"}
                  </span>
                  {post.category && (
                    <span className="text-[10px] text-slate-400 dark:text-white/30">{post.category}</span>
                  )}
                </div>
                <p className="text-sm font-medium text-slate-800 dark:text-white/80 truncate">{post.title}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => togglePublish(post)}
                  title={post.published ? "Despublicar" : "Publicar"}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 dark:text-white/30 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                >
                  {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setEditing(post)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 dark:text-white/30 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  disabled={deleting === post.id}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 dark:text-white/30 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  {deleting === post.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}