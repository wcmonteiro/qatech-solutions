import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-50 dark:bg-[#0A0F1C]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/5 mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            <span className="text-sm text-blue-600 dark:text-blue-300 tracking-wide font-medium">
              Inovar com resultados
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 dark:text-white leading-[0.95] tracking-tight mb-8"
          >
            Estratégia,{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500 dark:from-blue-400 dark:via-blue-300 dark:to-indigo-400 bg-clip-text text-transparent">
                Governança
              </span>
            </span>
            <br />
            <span className="text-slate-400 dark:text-white/40">&</span>{" "}
            Inteligência{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Artificial
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 dark:text-white/50 max-w-2xl leading-relaxed mb-12 font-light"
          >
            Transformamos organizações por meio da inovação tecnológica,
            construindo diferenciais competitivos com foco em resultados
            sustentáveis e excelência operacional.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#servicos">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-base rounded-xl group transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
              >
                Nossos Serviços
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <a href="#contato">
              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 dark:border-white/10 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 hover:border-slate-400 dark:hover:border-white/20 px-8 py-6 text-base rounded-xl transition-all duration-300"
              >
                Fale Conosco
              </Button>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 lg:mt-28 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {[
            { number: "15+", label: "Serviços Prestados" },
            { number: "10+", label: "Clientes Ativos" },
            { number: "2.4K", label: "Horas de Treinamento" },
            { number: "100%", label: "Foco em Resultados" },
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-slate-400 dark:text-white/30 tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-[#0A0F1C] to-transparent" />
    </section>
  );
}