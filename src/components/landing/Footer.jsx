import React from "react";
import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import NewsletterSignup from "./NewsletterSignup";

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-[#050810] border-t border-slate-200 dark:border-white/[0.04] pt-14 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportConfig}
          className="rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 md:p-8 mb-10"
        >
          <NewsletterSignup />
        </motion.div>

        {/* Bottom row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportConfig}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698e855b9e9a93cb4b5c4c52/550ce8d56_QA-logo-branca-transparente.png"
              alt="QA Tecnologia"
              className="h-8 w-auto dark:block hidden"
            />
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698e855b9e9a93cb4b5c4c52/550ce8d56_QA-logo-branca-transparente.png"
              alt="QA Tecnologia"
              className="h-8 w-auto dark:hidden block brightness-0"
            />
          </div>

          <p className="text-slate-400 dark:text-white/20 text-sm font-light">
            © {new Date().getFullYear()} QA Tecnologia. Todos os direitos reservados.
          </p>

          <div className="flex gap-6">
            <a href="#servicos" className="text-slate-400 dark:text-white/30 text-sm hover:text-slate-700 dark:hover:text-white/60 transition-colors">
              Serviços
            </a>
            <a
              href="https://www.qatecnologia.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 dark:text-white/30 text-sm hover:text-slate-700 dark:hover:text-white/60 transition-colors"
            >
              Site
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}