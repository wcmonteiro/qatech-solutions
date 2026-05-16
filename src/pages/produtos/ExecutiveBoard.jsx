import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ExecutiveBoard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F1C]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-white/50 hover:text-slate-900 dark:hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            ExecutiveBoard
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-white/60 mb-8 leading-relaxed">
            Dashboard executivo para tomada de decisões estratégicas baseadas em dados em tempo real.
          </p>

          <div className="bg-white dark:bg-white/5 rounded-xl p-8 border border-slate-200 dark:border-white/10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Sobre o Produto</h2>
            <p className="text-slate-600 dark:text-white/60 mb-6">
              ExecutiveBoard oferece uma visão 360º do negócio com dashboards inteligentes e indicadores-chave de desempenho.
            </p>
            
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Funcionalidades Principais</h3>
            <ul className="space-y-2 text-slate-600 dark:text-white/60">
              <li>✓ Dashboards executivos personalizados</li>
              <li>✓ KPIs em tempo real</li>
              <li>✓ Análise preditiva com IA</li>
              <li>✓ Relatórios automáticos</li>
              <li>✓ Alertas de anomalias</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}