import React, { useState } from "react";
import { Download, FileCode, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DownloadPage() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/landing.html";
    link.download = "qa-tecnologia-landing.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-8">
          <FileCode className="w-10 h-10 text-blue-400" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
          Landing Page HTML
        </h1>
        <p className="text-white/40 font-light mb-8 leading-relaxed">
          Arquivo estático pronto para hospedar em qualquer servidor — GitHub Pages, Netlify, Hostgator, etc.
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 mb-8 text-left space-y-2">
          {[
            "HTML, CSS e JavaScript em um único arquivo",
            "Design responsivo (mobile e desktop)",
            "Formulário de contato via e-mail",
            "Todas as seções da landing page",
            "Sem dependências externas",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-white/50">
              <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <Button
          onClick={handleDownload}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-base rounded-xl gap-2 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
        >
          {downloaded ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Download iniciado!
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Baixar landing.html
            </>
          )}
        </Button>

        <p className="text-white/20 text-xs mt-4">
          Arquivo: qa-tecnologia-landing.html
        </p>
      </div>
    </div>
  );
}