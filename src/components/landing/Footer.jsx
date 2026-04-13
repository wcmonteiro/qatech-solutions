import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-[#050810] border-t border-slate-200 dark:border-white/[0.04] py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
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
      </div>
    </footer>
  );
}