import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#050810] border-t border-white/[0.04] py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-white tracking-tight">Q</span>
            <span className="text-2xl font-bold text-red-500 tracking-tight">A</span>
          </div>
          <span className="text-white/20 text-xs tracking-[0.15em] uppercase">Tecnologia</span>
        </div>

        <p className="text-white/20 text-sm font-light">
          © {new Date().getFullYear()} QA Tecnologia. Todos os direitos reservados.
        </p>

        <div className="flex gap-6">
          <a href="#servicos" className="text-white/30 text-sm hover:text-white/60 transition-colors">
            Serviços
          </a>
          <a
            href="https://www.qatecnologia.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 text-sm hover:text-white/60 transition-colors"
          >
            Site
          </a>
        </div>
      </div>
    </footer>
  );
}