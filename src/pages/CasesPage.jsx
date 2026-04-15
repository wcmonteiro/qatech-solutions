import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, AlertCircle, Lightbulb, TrendingUp, Building2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

const categoryColors = {
  "Governança Digital": "text-blue-500 bg-blue-500/10 border-blue-500/20",
  "Inteligência Artificial": "text-purple-500 bg-purple-500/10 border-purple-500/20",
  "Consultoria Estratégica": "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
  "Digital Business Assurance": "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  "Aquisição de Software": "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
  "Auditoria de Contratos de TI": "text-orange-500 bg-orange-500/10 border-orange-500/20",
};

const placeholders = [
  {
    id: "1",
    title: "Transformação Digital na Gestão Pública Municipal",
    client: "Prefeitura de Belo Horizonte",
    category: "Governança Digital",
    problem: "A prefeitura enfrentava processos internos totalmente manuais, com baixa rastreabilidade e alto custo operacional.",
    solution: "Implementamos uma arquitetura de governança digital com processos automatizados, dashboard de indicadores e trilhas de auditoria em tempo real.",
    results: "Redução de 40% nos custos operacionais e aumento de 60% na satisfação dos cidadãos com os serviços digitais.",
    published: true,
  },
  {
    id: "2",
    title: "IA para Análise de Contratos de TI",
    client: "Grupo Empresarial Horizonte",
    category: "Inteligência Artificial",
    problem: "A empresa possuía mais de 200 contratos de TI ativos sem visibilidade adequada sobre riscos, sobreposições e oportunidades de economia.",
    solution: "Desenvolvemos uma solução de IA para análise semântica dos contratos, identificando cláusulas críticas, duplicidades e benchmarks de mercado.",
    results: "Identificação de R$ 2,3 milhões em economias potenciais e redução de 70% no tempo de revisão contratual.",
    published: true,
  },
  {
    id: "3",
    title: "Estratégia de Cloud Computing para Saúde",
    client: "Rede Hospitalar MG",
    category: "Consultoria Estratégica",
    problem: "Infraestrutura legada com alto custo de manutenção, indisponibilidades frequentes e dificuldade de escalar para novos serviços digitais.",
    solution: "Planejamento e execução da migração para cloud híbrida com estratégia de modernização gradual e sem interrupção dos serviços críticos.",
    results: "99,9% de uptime alcançado, redução de 35% nos custos de infraestrutura e lançamento de 3 novos serviços digitais em 6 meses.",
    published: true,
  },
];

function CaseCard({ caseItem, index }) {
  const [expanded, setExpanded] = useState(false);
  const colorClass = categoryColors[caseItem.category] || "text-blue-500 bg-blue-500/10 border-blue-500/20";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] overflow-hidden hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300"
    >
      {caseItem.cover_image && (
        <div className="h-48 overflow-hidden">
          <img src={caseItem.cover_image} alt={caseItem.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border ${colorClass}`}>
            {caseItem.category}
          </span>
          {caseItem.client && (
            <span className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-white/30">
              <Building2 className="w-3.5 h-3.5" /> {caseItem.client}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 leading-snug tracking-tight">
          {caseItem.title}
        </h3>

        <div className="space-y-5">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-white/40 uppercase tracking-wider mb-1">Desafio</p>
              <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed">{caseItem.problem}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Lightbulb className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-white/40 uppercase tracking-wider mb-1">Solução</p>
              <p className={`text-sm text-slate-600 dark:text-white/60 leading-relaxed ${!expanded ? "line-clamp-3" : ""}`}>
                {caseItem.solution}
              </p>
            </div>
          </div>

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-white/40 uppercase tracking-wider mb-1">Resultados</p>
                <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed">{caseItem.results}</p>
              </div>
            </motion.div>
          )}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-6 flex items-center gap-1.5 text-sm text-blue-500 dark:text-blue-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors group"
        >
          {expanded ? "Ver menos" : "Ver resultados"}
          <ArrowRight className={`w-4 h-4 transition-transform ${expanded ? "rotate-90" : "group-hover:translate-x-0.5"}`} />
        </button>
      </div>
    </motion.div>
  );
}

export default function CasesPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Todos");

  useEffect(() => {
    base44.entities.CaseStudy.filter({ published: true }, "order", 50)
      .then((data) => setCases(data.length > 0 ? data : placeholders))
      .catch(() => setCases(placeholders))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["Todos", ...new Set(cases.map((c) => c.category).filter(Boolean))];
  const filtered = activeCategory === "Todos" ? cases : cases.filter((c) => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F1C]">
      {/* Top nav */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-[#0A0F1C]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Voltar
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

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm text-blue-500 dark:text-blue-400 tracking-[0.2em] uppercase font-medium">
            Portfólio
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mt-3 mb-4 tracking-tight">
            Cases de Sucesso
          </h1>
          <p className="text-lg text-slate-500 dark:text-white/40 font-light max-w-2xl leading-relaxed">
            Projetos reais com resultados mensuráveis — conheça como ajudamos organizações a evoluírem digitalmente.
          </p>
        </motion.div>

        {/* Category filter */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    : "bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Cases grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-slate-100 dark:bg-white/[0.02] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c, i) => (
              <CaseCard key={c.id} caseItem={c} index={i} />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center rounded-2xl border border-blue-500/20 bg-blue-500/[0.04] p-12"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Quer resultados como esses?</h3>
          <p className="text-slate-500 dark:text-white/40 mb-8 font-light">Entre em contato e descubra como podemos transformar sua organização.</p>
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group"
          >
            Falar com especialista
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}