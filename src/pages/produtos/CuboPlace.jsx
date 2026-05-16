import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function CuboPlace() {
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
            CuboPlace
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-white/60 mb-8 leading-relaxed">
            Plataforma integrada para gestão e otimização de espaços de trabalho modernos.
          </p>

          <div className="bg-white dark:bg-white/5 rounded-xl p-8 border border-slate-200 dark:border-white/10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Sobre o Produto</h2>
            <p className="text-slate-600 dark:text-white/60 mb-6">
              CuboPlace é uma solução completa para empresas que desejam modernizar a gestão de seus espaços de trabalho.
            </p>
            
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Funcionalidades Principais</h3>
            <ul className="space-y-2 text-slate-600 dark:text-white/60">
              <li>✓ Gerenciamento inteligente de salas e espaços</li>
              <li>✓ Reserva de ambientes em tempo real</li>
              <li>✓ Analytics de utilização de espaços</li>
              <li>✓ Integração com calendários corporativos</li>
              <li>✓ Relatórios customizados</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}