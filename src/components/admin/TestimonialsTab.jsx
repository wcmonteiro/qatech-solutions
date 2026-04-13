import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, X, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";

const inputClass = "w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors";

function TestimonialForm({ item, onSave, onCancel }) {
  const [form, setForm] = useState({
    author_name: item?.author_name || "",
    author_role: item?.author_role || "",
    author_company: item?.author_company || "",
    text: item?.text || "",
    initials: item?.initials || "",
    order: item?.order ?? "",
    active: item?.active ?? true,
  });
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = { ...form, order: form.order !== "" ? Number(form.order) : undefined };
    if (item) {
      await base44.entities.Testimonial.update(item.id, data);
    } else {
      await base44.entities.Testimonial.create(data);
    }
    setSaving(false);
    onSave();
  };

  return (
    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.03] p-6 mb-4">
      <h3 className="text-base font-semibold text-slate-800 dark:text-white/80 mb-4">{item ? "Editar depoimento" : "Novo depoimento"}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-slate-500 dark:text-white/40 mb-1.5">Nome *</label>
            <input value={form.author_name} onChange={(e) => set("author_name", e.target.value)} required placeholder="Nome do autor" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-slate-500 dark:text-white/40 mb-1.5">Cargo</label>
            <input value={form.author_role} onChange={(e) => set("author_role", e.target.value)} placeholder="Diretor de TI" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-slate-500 dark:text-white/40 mb-1.5">Empresa</label>
            <input value={form.author_company} onChange={(e) => set("author_company", e.target.value)} placeholder="Nome da empresa" className={inputClass} />
          </div>
        </div>
        <div className="grid sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-slate-500 dark:text-white/40 mb-1.5">Iniciais</label>
            <input value={form.initials} onChange={(e) => set("initials", e.target.value)} placeholder="AB" maxLength={3} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-slate-500 dark:text-white/40 mb-1.5">Ordem</label>
            <input type="number" value={form.order} onChange={(e) => set("order", e.target.value)} placeholder="1" className={inputClass} />
          </div>
          <div className="sm:col-span-2 flex items-end pb-1 gap-2">
            <input type="checkbox" id="active" checked={form.active} onChange={(e) => set("active", e.target.checked)} className="w-4 h-4 accent-blue-500" />
            <label htmlFor="active" className="text-sm text-slate-600 dark:text-white/50 cursor-pointer">Ativo (visível no site)</label>
          </div>
        </div>
        <div>
          <label className="block text-xs text-slate-500 dark:text-white/40 mb-1.5">Depoimento *</label>
          <textarea value={form.text} onChange={(e) => set("text", e.target.value)} required rows={3} placeholder="Texto do depoimento..." className={`${inputClass} resize-none`} />
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={saving} className="bg-blue-500 hover:bg-blue-600 text-white text-sm gap-1.5">
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            Salvar
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="text-sm">
            <X className="w-3.5 h-3.5 mr-1" /> Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function TestimonialsTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const load = () => {
    setLoading(true);
    base44.entities.Testimonial.list("order", 50)
      .then(setItems)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    setDeleting(id);
    await base44.entities.Testimonial.delete(id);
    setDeleting(null);
    load();
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingItem(null);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Depoimentos de Clientes</h2>
        {!showForm && !editingItem && (
          <Button onClick={() => setShowForm(true)} className="bg-blue-500 hover:bg-blue-600 text-white gap-2">
            <Plus className="w-4 h-4" /> Novo Depoimento
          </Button>
        )}
      </div>

      {showForm && !editingItem && (
        <TestimonialForm onSave={handleSave} onCancel={() => setShowForm(false)} />
      )}

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-slate-400 dark:text-white/30 text-sm">Nenhum depoimento criado ainda.</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id}>
              {editingItem?.id === item.id ? (
                <TestimonialForm item={item} onSave={handleSave} onCancel={() => setEditingItem(null)} />
              ) : (
                <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02]">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-500">
                      {item.initials || item.author_name?.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-slate-800 dark:text-white/80">{item.author_name}</span>
                      {item.author_company && <span className="text-xs text-slate-400 dark:text-white/30">· {item.author_company}</span>}
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ml-1 ${item.active ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-white/40"}`}>
                        {item.active ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-white/40 line-clamp-2">"{item.text}"</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => { setShowForm(false); setEditingItem(item); }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 dark:text-white/30 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deleting === item.id}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 dark:text-white/30 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      {deleting === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}