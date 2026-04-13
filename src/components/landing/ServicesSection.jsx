import React from "react";
import { motion } from "framer-motion";
import { Shield, Brain, Lightbulb, BarChart3, FileCheck, Search } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Governança Digital",
    description: "Construímos pilares estratégicos que geram conhecimento e inovação por meio de tecnologias que proporcionam melhorias na qualidade de vida da sociedade e na adoção de modelos de smart cities.",
    highlight: true,
    tag: "Destaque"
  },
  {
    icon: Lightbulb,
    title: "Consultoria Estratégica",
    description: "Elaboramos estratégias para tornar a organização mais ágil às mudanças de mercado através da tecnologia da informação, agregando valor ao negócio e criando diferenciais competitivos.",
    highlight: true,
    tag: "Destaque"
  },
  {
    icon: Brain,
    title: "Inteligência Artificial",
    description: "Impulsionamos a Transformação Digital com IA, Cloud Computing, IoT, Big Data & Analytics, identificando oportunidades alinhadas com a estratégia e as tendências de mercado.",
    highlight: true,
    tag: "Destaque"
  },
  {
    icon: BarChart3,
    title: "Digital Business Assurance",
    description: "Garantimos uma melhor experiência de qualidade para o cliente com serviços digitais, trazendo maior economia e agilidade nas decisões estratégicas.",
    highlight: false
  },
  {
    icon: FileCheck,
    title: "Aquisição de Software",
    description: "Atuamos de forma consultiva na melhoria dos processos de aquisição de software e serviços correlatos visando atingir melhores resultados.",
    highlight: false
  },
  {
    icon: Search,
    title: "Auditoria de Contratos de TI",
    description: "Oferecemos análise independente dos contratos de tecnologia, alinhando as melhores práticas de mercado e atendendo as exigências estratégicas.",
    highlight: false
  }
];

export default function ServicesSection() {
  return (
    <section id="servicos" className="relative py-28 md:py-36 bg-slate-50 dark:bg-[#0A0F1C]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm text-blue-500 dark:text-blue-400 tracking-[0.2em] uppercase font-medium">
            Como podemos ajudar
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mt-4 tracking-tight">
            Principais Serviços
          </h2>
          <p className="text-slate-500 dark:text-white/40 mt-6 max-w-xl mx-auto text-lg font-light leading-relaxed">
            Soluções sob medida para acelerar a transformação digital da sua organização
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative rounded-2xl p-8 transition-all duration-500 cursor-default ${
                  service.highlight
                    ? "bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20 hover:border-blue-500/40 hover:shadow-[0_0_60px_rgba(59,130,246,0.08)]"
                    : "bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-white/[0.04]"
                }`}
              >
                {service.tag && (
                  <span className="absolute top-6 right-6 text-[10px] tracking-[0.15em] uppercase text-blue-500 dark:text-blue-400 font-semibold bg-blue-500/10 px-3 py-1 rounded-full">
                    {service.tag}
                  </span>
                )}

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                  service.highlight
                    ? "bg-blue-500/15 group-hover:bg-blue-500/25"
                    : "bg-slate-100 dark:bg-white/[0.05] group-hover:bg-slate-200 dark:group-hover:bg-white/[0.08]"
                }`}>
                  <Icon className={`w-6 h-6 ${
                    service.highlight ? "text-blue-500 dark:text-blue-400" : "text-slate-500 dark:text-white/50"
                  }`} />
                </div>

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 tracking-tight">
                  {service.title}
                </h3>

                <p className="text-slate-500 dark:text-white/40 leading-relaxed text-[15px] font-light">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}