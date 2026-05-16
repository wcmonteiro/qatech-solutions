import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function MindPrime() {
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
            MindPrime
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-white/60 mb-8 leading-relaxed">
            Plataforma de inteligência artificial para otimização de processos e transformação digital.
          </p>

          <div className="bg-white dark:bg-white/5 rounded-xl p-8 border border-slate-200 dark:border-white/10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Sobre o Produto</h2>
            <p className="text-slate-600 dark:text-white/60 mb-6">
              MindPrime é uma solução inteligente que utiliza IA para automatizar processos, prever tendências e otimizar operações.
            </p>
            
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Funcionalidades Principais</h3>
            <ul className="space-y-2 text-slate-600 dark:text-white/60">
              <li>✓ Automação inteligente de processos</li>
              <li>✓ Machine Learning avançado</li>
              <li>✓ Processamento de linguagem natural</li>
              <li>✓ Previsão de demanda</li>
              <li>✓ Otimização automática de workflows</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}