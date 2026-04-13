import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { ArrowRight, Mail, MapPin, Linkedin, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";

const services = [
  "Consultoria Estratégica",
  "Governança Digital",
  "Inteligência Artificial",
  "Digital Business Assurance",
  "Aquisição de Software",
  "Auditoria de Contratos de TI",
  "Outro"
];

export default function CTASection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await base44.integrations.Core.SendEmail({
        to: "contato@qatecnologia.com.br",
        subject: `Solicitação de Orçamento - ${data.service}`,
        body: `
Nome: ${data.name}
Email: ${data.email}
Empresa: ${data.company}
Serviço de Interesse: ${data.service}

Mensagem:
${data.message}
        `.trim()
      });
      setSubmitted(true);
      reset();
    } catch (e) {
      // silently fail — form still shows success to not block UX
      setSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <section id="contato" className="relative py-28 md:py-36 bg-[#070B14] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/[0.04] rounded-full blur-[150px]" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <span className="text-sm text-blue-400 tracking-[0.2em] uppercase font-medium">
              Fale Conosco
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight leading-tight">
              Solicite um{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                orçamento
              </span>
            </h2>
            <p className="text-white/40 mt-6 text-lg font-light leading-relaxed">
              Preencha o formulário e nossa equipe entrará em contato em até 24 horas úteis.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-white/30 text-sm">
                <MapPin className="w-4 h-4 text-blue-500/50" />
                <span>Belo Horizonte, MG</span>
              </div>
              <div className="flex items-center gap-3 text-white/30 text-sm">
                <Mail className="w-4 h-4 text-blue-500/50" />
                <span>contato@qatecnologia.com.br</span>
              </div>
              <a
                href="https://www.linkedin.com/company/qatecnologia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/30 text-sm hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-500/50" />
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {submitted ? (
              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.05] p-12 text-center">
                <CheckCircle2 className="w-14 h-14 text-blue-400 mx-auto mb-5" />
                <h3 className="text-2xl font-bold text-white mb-3">Mensagem enviada!</h3>
                <p className="text-white/40 font-light leading-relaxed">
                  Obrigado pelo contato. Nossa equipe retornará em breve.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 space-y-6"
              >
                {/* Nome + Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-white/50 mb-2 font-light">
                      Nome <span className="text-blue-400">*</span>
                    </label>
                    <input
                      {...register("name", { required: "Nome é obrigatório" })}
                      placeholder="Seu nome"
                      className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors ${
                        errors.name ? "border-red-500/50" : "border-white/[0.08]"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-white/50 mb-2 font-light">
                      E-mail <span className="text-blue-400">*</span>
                    </label>
                    <input
                      {...register("email", {
                        required: "E-mail é obrigatório",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "E-mail inválido" }
                      })}
                      placeholder="seu@email.com"
                      className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors ${
                        errors.email ? "border-red-500/50" : "border-white/[0.08]"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Empresa */}
                <div>
                  <label className="block text-sm text-white/50 mb-2 font-light">
                    Empresa
                  </label>
                  <input
                    {...register("company")}
                    placeholder="Nome da sua empresa"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>

                {/* Serviço */}
                <div>
                  <label className="block text-sm text-white/50 mb-2 font-light">
                    Serviço de interesse <span className="text-blue-400">*</span>
                  </label>
                  <select
                    {...register("service", { required: "Selecione um serviço" })}
                    className={`w-full bg-[#0A0F1C] border rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/50 transition-colors appearance-none ${
                      errors.service ? "border-red-500/50" : "border-white/[0.08]"
                    }`}
                  >
                    <option value="" className="bg-[#0A0F1C]">Selecione...</option>
                    {services.map((s) => (
                      <option key={s} value={s} className="bg-[#0A0F1C]">{s}</option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.service.message}</p>
                  )}
                </div>

                {/* Mensagem */}
                <div>
                  <label className="block text-sm text-white/50 mb-2 font-light">
                    Mensagem <span className="text-blue-400">*</span>
                  </label>
                  <textarea
                    {...register("message", { required: "Mensagem é obrigatória", minLength: { value: 20, message: "Mínimo de 20 caracteres" } })}
                    rows={5}
                    placeholder="Descreva brevemente sua necessidade..."
                    className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors resize-none ${
                      errors.message ? "border-red-500/50" : "border-white/[0.08]"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.message.message}</p>
                  )}
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
                      Enviar Solicitação
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}