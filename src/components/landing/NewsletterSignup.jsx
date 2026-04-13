import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMsg("Insira um e-mail válido.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      // Check for duplicates then save
      const existing = await base44.entities.NewsletterSubscriber.filter({ email });
      if (existing.length === 0) {
        await base44.entities.NewsletterSubscriber.create({ email, source: "landing_page", active: true });
        await base44.integrations.Core.SendEmail({
          to: email,
          subject: "Bem-vindo(a) à newsletter da QA Tecnologia!",
          body: `Olá!\n\nVocê está inscrito(a) na newsletter da QA Tecnologia.\n\nVocê receberá conteúdos exclusivos sobre Governança Digital, Inteligência Artificial e Estratégia de TI.\n\nAtenciosamente,\nEquipe QA Tecnologia`
        });
      }
      setStatus("success");
      setEmail("");
    } catch {
      setErrorMsg("Ocorreu um erro. Tente novamente.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 text-emerald-500 dark:text-emerald-400">
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm font-medium">Inscrição confirmada! Verifique seu e-mail.</span>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs text-slate-500 dark:text-white/30 mb-3 uppercase tracking-widest font-medium">
        Newsletter
      </p>
      <p className="text-sm text-slate-500 dark:text-white/40 font-light mb-4 leading-relaxed">
        Receba insights sobre Governança e IA direto no seu e-mail.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-white/20 pointer-events-none" />
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus("idle"); setErrorMsg(""); }}
            placeholder="seu@email.com"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors disabled:opacity-60 flex-shrink-0"
        >
          {status === "loading"
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <><span className="hidden sm:inline">Inscrever</span><ArrowRight className="w-4 h-4" /></>
          }
        </button>
      </form>
      {status === "error" && errorMsg && (
        <p className="text-red-500 text-xs mt-2">{errorMsg}</p>
      )}
    </div>
  );
}