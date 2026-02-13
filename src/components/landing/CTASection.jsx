import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section id="contato" className="relative py-28 md:py-36 bg-[#070B14] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/[0.04] rounded-full blur-[150px]" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm text-blue-400 tracking-[0.2em] uppercase font-medium">
            Vamos Conversar
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 tracking-tight leading-tight">
            Como uma consultoria pode
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              trazer resultados eficientes?
            </span>
          </h2>

          <p className="text-white/40 mt-6 text-lg font-light max-w-xl mx-auto leading-relaxed">
            Entre em contato e descubra como podemos transformar
            a tecnologia em resultados concretos para o seu negócio.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10"
          >
            <a href="https://www.qatecnologia.com.br" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-6 text-base rounded-xl group transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
              >
                Fale com nosso time
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-white/30 text-sm"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Belo Horizonte, MG</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>contato@qatecnologia.com.br</span>
            </div>
            <a
              href="https://www.linkedin.com/company/qatecnologia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}