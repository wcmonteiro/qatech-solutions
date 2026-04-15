import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

const interests = [
  "Consultoria Estratégica",
  "Governança Digital",
  "Inteligência Artificial",
  "Digital Business Assurance",
  "Aquisição de Software",
  "Auditoria de Contratos de TI",
  "Outro",
];

const inputClass = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors";

export default function LeadCaptureForm({ source = "landing_page" }) {
  const [form, setForm] = useState({ name: "", email: "", interest: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.entities.Lead.create({ ...form, source });
      if (typeof window.gtag === "function") {
        window.gtag("event", "lead_capture", { interest: form.interest });
      }
      setDone(true);
    } catch {
      setError("Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-3 py-6 text-center"
        >
          <CheckCircle2 className="w-10 h-10 text-blue-400" />
          <p className="text-white font-semibold text-lg">Recebemos seu contato!</p>
          <p className="text-white/40 text-sm">Nossa equipe entrará em contato em breve.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Seu nome"
            className={inputClass}
          />
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="Seu e-mail"
            className={inputClass}
          />
          <select
            value={form.interest}
            onChange={(e) => set("interest", e.target.value)}
            className={`${inputClass} appearance-none bg-[#0A0F1C]`}
          >
            <option value="">Área de interesse (opcional)</option>
            {interests.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-medium rounded-xl py-3 text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Quero ser contactado
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}