import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Target, Zap, CheckCircle } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Estratégia Orientada",
    text: "Alinhamento entre tecnologia e objetivos de negócio"
  },
  {
    icon: TrendingUp,
    title: "Crescimento Sustentável",
    text: "Modelos escaláveis com indicadores de qualidade"
  },
  {
    icon: Zap,
    title: "Inovação Contínua",
    text: "Transformação digital com as melhores tecnologias"
  }
];

const checkpoints = [
  "Gestão de riscos operacionais e tecnológicos",
  "Indicadores de qualidade dos processos-chave",
  "Equilíbrio entre aspectos administrativos e tecnológicos",
  "Garantia dos melhores resultados digitais"
];

export default function AboutSection() {
  return (
    <section className="relative py-28 md:py-36 bg-[#070B14]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm text-blue-400 tracking-[0.2em] uppercase font-medium">
              Em Destaque
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight leading-tight">
              Digital Business
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Assurance
              </span>
            </h2>

            <p className="text-white/40 mt-6 text-lg leading-relaxed font-light">
              Para ter um crescimento sustentável e rentável do negócio, é preciso gerir
              os riscos e objetivar o equilíbrio entre os aspectos administrativos,
              operacionais e tecnológicos.
            </p>

            <div className="mt-8 space-y-4">
              {checkpoints.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/50 text-[15px]">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Pillar cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="group flex items-start gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/20 hover:bg-blue-500/[0.03] transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{pillar.title}</h3>
                    <p className="text-white/40 text-sm font-light">{pillar.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}