import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { ArrowLeft, Mail, MapPin, Linkedin, CheckCircle2, Loader2, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";

const services = [
  "Consultoria Estratégica",
  "Governança Digital",
  "Inteligência Artificial",
  "Digital Business Assurance",
  "Aquisição de Software",
  "Auditoria de Contratos de TI",
  "Outro",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await base44.integrations.Core.SendEmail({
        to: "contato@qatecnologia.com.br",
        subject: `Novo contato via site — ${data.service || "Geral"}`,
        body: `Nova solicitação recebida pelo site:\n\nNome: ${data.name}\nE-mail: ${data.email}\nEmpresa: ${data.company || "Não informada"}\nServiço: ${data.service || "Não informado"}\n\nMensagem:\n${data.message}`,
      });
    } catch {}
    setSubmitted(true);
    setLoading(false);
    reset();
  };

  const inputClass = (hasError) =>
    `w-full bg-slate-50 dark:bg-white/[0.04] border rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors ${
      hasError ? "border-red-400 dark:border-red-500/50" : "border-slate-200 dark:border-white/[0.08]"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F1C]">
      {/* Top nav */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-[#0A0F1C]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </Link>
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698e855b9e9a93cb4b5c4c52/550ce8d56_QA-logo-branca-transparente.png"
            alt="QA Tecnologia"
            className="h-7 w-auto dark:block hidden"
          />
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698e855b9e9a93cb4b5c4c52/550ce8d56_QA-logo-branca-transparente.png"
            alt="QA Tecnologia"
            className="h-7 w-auto dark:hidden block brightness-0"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm text-blue-500 dark:text-blue-400 tracking-[0.2em] uppercase font-medium">
            Fale Conosco
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mt-3 mb-4 tracking-tight leading-tight">
            Entre em contato
          </h1>
          <p className="text-lg text-slate-500 dark:text-white/40 font-light max-w-xl leading-relaxed">
            Preencha o formulário e nossa equipe retornará em até 24 horas úteis.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-8 lg:sticky lg:top-32"
          >
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white/80 mb-1">Localização</p>
                  <p className="text-sm text-slate-500 dark:text-white/40 font-light">Belo Horizonte, MG</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white/80 mb-1">E-mail</p>
                  <a href="mailto:contato@qatecnologia.com.br" className="text-sm text-slate-500 dark:text-white/40 font-light hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    contato@qatecnologia.com.br
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Linkedin className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white/80 mb-1">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/company/qatecnologia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-500 dark:text-white/40 font-light hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    /company/qatecnologia
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.04] p-6">
              <p className="text-sm font-semibold text-slate-800 dark:text-white/80 mb-2">Resposta rápida</p>
              <p className="text-sm text-slate-500 dark:text-white/40 font-light leading-relaxed">
                Nossa equipe responde em até <strong className="text-blue-500 dark:text-blue-400">24 horas úteis</strong>. Para urgências, entre em contato diretamente pelo LinkedIn.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.05] p-12 text-center">
                <CheckCircle2 className="w-14 h-14 text-blue-500 dark:text-blue-400 mx-auto mb-5" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Mensagem enviada!</h3>
                <p className="text-slate-500 dark:text-white/40 font-light leading-relaxed mb-8">
                  Obrigado pelo contato. Nossa equipe retornará em breve.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                >
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-8 md:p-10 space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-slate-600 dark:text-white/50 mb-2 font-light">
                      Nome <span className="text-blue-500">*</span>
                    </label>
                    <input
                      {...register("name", { required: "Nome é obrigatório" })}
                      placeholder="Seu nome completo"
                      className={inputClass(errors.name)}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-slate-600 dark:text-white/50 mb-2 font-light">
                      E-mail <span className="text-blue-500">*</span>
                    </label>
                    <input
                      {...register("email", {
                        required: "E-mail é obrigatório",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "E-mail inválido" },
                      })}
                      placeholder="seu@email.com"
                      className={inputClass(errors.email)}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-600 dark:text-white/50 mb-2 font-light">Empresa</label>
                  <input
                    {...register("company")}
                    placeholder="Nome da sua empresa"
                    className={inputClass(false)}
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-600 dark:text-white/50 mb-2 font-light">Serviço de interesse</label>
                  <select
                    {...register("service")}
                    className="w-full bg-slate-50 dark:bg-[#0A0F1C] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm outline-none focus:border-blue-500/50 transition-colors appearance-none"
                  >
                    <option value="">Selecione...</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-600 dark:text-white/50 mb-2 font-light">
                    Mensagem <span className="text-blue-500">*</span>
                  </label>
                  <textarea
                    {...register("message", {
                      required: "Mensagem é obrigatória",
                      minLength: { value: 10, message: "Mínimo de 10 caracteres" },
                    })}
                    rows={5}
                    placeholder="Descreva brevemente sua necessidade..."
                    className={`${inputClass(errors.message)} resize-none`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-base rounded-xl group transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Enviar mensagem
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}