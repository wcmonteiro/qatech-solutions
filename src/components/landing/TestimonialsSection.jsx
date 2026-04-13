import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "Welington é um excelente palestrante. Possui grande conhecimento nas áreas de qualidade e testes de software, e tem facilidade em se expressar e se comunicar com um grande público. Além de uma pessoa com bom relacionamento interpessoal, é uma pessoa culta e de bem com a vida. Ótimo profissional.",
    name: "Jan Charles Gross",
    role: "Quality Architect - Sênior Sistemas",
    initials: "JG"
  },
  {
    text: "Conheço a equipe da QA há vários anos, já trabalhamos juntos em diversos projetos, onde eles sempre entregaram qualidade, dedicação e muito conhecimento. Excelente parceiro, sempre com ideias de inovação e uma dedicação incansável! Nessa nova fase da empresa desejo muito sucesso e bons negócios!",
    name: "Lúcia Barros Alvarenga",
    role: "Diretora Regional - Montreal Informática",
    initials: "LA"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-28 md:py-36 bg-slate-50 dark:bg-[#0A0F1C]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/[0.06] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
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
            O que dizem nossos parceiros
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative group"
            >
              <div className="relative rounded-2xl p-8 md:p-10 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/10 transition-all duration-500 shadow-sm dark:shadow-none">
                <Quote className="w-8 h-8 text-blue-500/20 mb-6" />

                <p className="text-slate-500 dark:text-white/50 leading-relaxed text-[15px] font-light mb-8">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-500 dark:text-blue-300">{testimonial.initials}</span>
                  </div>
                  <div>
                    <div className="text-slate-800 dark:text-white font-medium text-sm">{testimonial.name}</div>
                    <div className="text-slate-400 dark:text-white/30 text-xs mt-0.5">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}