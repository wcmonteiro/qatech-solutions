import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

const placeholders = [
  {
    id: "1",
    author_name: "Carlos Mendonça",
    author_role: "CIO",
    author_company: "Grupo Minas Digital",
    text: "A QA Tecnologia nos ajudou a estruturar toda a governança de TI, alinhando tecnologia com os objetivos estratégicos do negócio. Os resultados foram imediatos e mensuráveis.",
    initials: "CM",
  },
  {
    id: "2",
    author_name: "Fernanda Azevedo",
    author_role: "Diretora de Inovação",
    author_company: "Prefeitura de BH",
    text: "Excelente parceria na implementação da nossa estratégia de Governança Digital. A equipe demonstrou profundo conhecimento técnico e visão estratégica durante todo o projeto.",
    initials: "FA",
  },
  {
    id: "3",
    author_name: "Rafael Borges",
    author_role: "Gerente de TI",
    author_company: "Construtora Horizonte",
    text: "Com a consultoria da QA, identificamos oportunidades de uso de IA que reduziram nossos custos operacionais em 30%. Recomendo fortemente para quem busca resultados reais.",
    initials: "RB",
  },
];

export default function TestimonialsSection() {
  const [items, setItems] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    base44.entities.Testimonial.filter({ active: true }, "order", 20)
      .then((data) => setItems(data.length > 0 ? data : placeholders))
      .catch(() => setItems(placeholders))
      .finally(() => setLoading(false));
  }, []);

  // Auto-rotate every 6s
  useEffect(() => {
    if (items.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % items.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [items]);

  const go = (dir) => {
    clearInterval(timerRef.current);
    setCurrent((c) => (c + dir + items.length) % items.length);
  };

  const active = items[current];

  return (
    <section id="depoimentos" className="relative py-28 md:py-36 bg-white dark:bg-[#070B14]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/[0.06] to-transparent" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-500/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-blue-500 dark:text-blue-400 tracking-[0.2em] uppercase font-medium">
            Depoimentos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-4 tracking-tight">
            O que dizem nossos clientes
          </h2>
        </motion.div>

        {loading ? (
          <div className="h-64 rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02] animate-pulse" />
        ) : (
          <div className="relative">
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={active.id || current}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45 }}
                  className="rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02] p-10 md:p-14 text-center"
                >
                  <Quote className="w-8 h-8 text-blue-500/30 dark:text-blue-400/20 mx-auto mb-8" />
                  <p className="text-lg md:text-xl text-slate-600 dark:text-white/60 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
                    "{active.text}"
                  </p>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20 flex items-center justify-center mb-1">
                      <span className="text-sm font-bold text-blue-500 dark:text-blue-300">
                        {active.initials || active.author_name?.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-base font-semibold text-slate-900 dark:text-white">
                      {active.author_name}
                    </span>
                    <span className="text-sm text-slate-400 dark:text-white/30 font-light">
                      {[active.author_role, active.author_company].filter(Boolean).join(" · ")}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            {items.length > 1 && (
              <div className="flex items-center justify-center gap-6 mt-8">
                <button
                  onClick={() => go(-1)}
                  className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] flex items-center justify-center text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-2">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { clearInterval(timerRef.current); setCurrent(i); }}
                      className={`rounded-full transition-all duration-300 ${
                        i === current
                          ? "w-6 h-2 bg-blue-500"
                          : "w-2 h-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => go(1)}
                  className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] flex items-center justify-center text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}