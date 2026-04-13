import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Shield, Brain, Lightbulb, BarChart3, FileCheck, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    slug: "governanca-digital",
    icon: Shield,
    title: "Governança Digital",
    tagline: "Estruture, controle e evolua sua TI com inteligência estratégica.",
    description: "Construímos os pilares estratégicos que geram conhecimento e inovação por meio de tecnologias que proporcionam melhorias na qualidade de vida da sociedade e na adoção de modelos de smart cities. Nossa abordagem conecta processos, pessoas e tecnologia para garantir que sua organização esteja preparada para os desafios da transformação digital com governança sólida e eficaz.",
    benefits: [
      "Alinhamento entre TI e objetivos estratégicos do negócio",
      "Estruturação de políticas, processos e indicadores de TI",
      "Implantação de frameworks como COBIT, ITIL e ISO 38500",
      "Redução de riscos operacionais e tecnológicos",
      "Maior transparência e controle sobre investimentos em tecnologia",
      "Preparação para auditorias e conformidade regulatória",
    ],
    highlight: true,
  },
  {
    slug: "consultoria-estrategica",
    icon: Lightbulb,
    title: "Consultoria Estratégica",
    tagline: "Transforme tecnologia em vantagem competitiva real.",
    description: "Elaboramos estratégias para tornar a organização mais ágil às mudanças de mercado através da tecnologia da informação, agregando valor ao negócio e criando diferenciais competitivos duradouros. Unimos visão de negócio e expertise técnica para desenhar roadmaps de transformação digital alinhados aos seus objetivos.",
    benefits: [
      "Diagnóstico completo do ambiente tecnológico e de negócio",
      "Definição de roadmap de transformação digital",
      "Identificação de oportunidades de redução de custos com TI",
      "Apoio na tomada de decisão com dados e benchmarks de mercado",
      "Gestão da mudança e capacitação das equipes internas",
      "Acompanhamento contínuo de resultados e ajustes estratégicos",
    ],
    highlight: true,
  },
  {
    slug: "inteligencia-artificial",
    icon: Brain,
    title: "Inteligência Artificial",
    tagline: "Aplique IA com propósito, escala e retorno mensurável.",
    description: "Impulsionamos a Transformação Digital com IA, Cloud Computing, IoT, Big Data & Analytics, identificando oportunidades alinhadas com a estratégia e as tendências de mercado. Nossa abordagem vai além do hype: entregamos soluções de IA com casos de uso validados, ROI comprovado e integração real ao seu ambiente de negócio.",
    benefits: [
      "Identificação de casos de uso de IA com maior impacto e viabilidade",
      "Desenvolvimento de modelos preditivos e de automação inteligente",
      "Integração com Cloud (GCP, AWS, Azure) e plataformas existentes",
      "Implementação de chatbots, RPA e análise de linguagem natural",
      "Governança de dados e ética no uso de IA",
      "Capacitação das equipes para uso e manutenção das soluções",
    ],
    highlight: true,
  },
  {
    slug: "digital-business-assurance",
    icon: BarChart3,
    title: "Digital Business Assurance",
    tagline: "Qualidade e eficiência nos serviços digitais do início ao fim.",
    description: "Garantimos uma melhor experiência de qualidade para o cliente com serviços digitais, trazendo maior economia e agilidade nas decisões estratégicas. O Digital Business Assurance é a abordagem que une qualidade, governança e estratégia para assegurar que seus canais digitais entreguem o que prometem.",
    benefits: [
      "Avaliação da maturidade digital dos processos e serviços",
      "Definição e monitoramento de KPIs de qualidade digital",
      "Redução de falhas e retrabalho em produtos digitais",
      "Melhoria da experiência do usuário nos canais digitais",
      "Integração entre equipes de negócio, TI e qualidade",
      "Relatórios executivos com visibilidade estratégica dos resultados",
    ],
    highlight: false,
  },
  {
    slug: "aquisicao-de-software",
    icon: FileCheck,
    title: "Aquisição de Software",
    tagline: "Compre melhor, contrate com segurança e maximize o valor.",
    description: "Atuamos de forma consultiva na melhoria dos processos de aquisição de software e serviços correlatos visando atingir melhores resultados. Auxiliamos sua organização desde a definição de requisitos até a análise de propostas e gestão de contratos, garantindo que cada investimento em tecnologia seja bem fundamentado.",
    benefits: [
      "Estruturação de editais e termos de referência técnica",
      "Avaliação independente de propostas e fornecedores",
      "Análise de aderência de soluções aos requisitos de negócio",
      "Apoio em processos licitatórios e compras públicas de TI",
      "Revisão de cláusulas contratuais e SLAs",
      "Mitigação de riscos em contratações de tecnologia",
    ],
    highlight: false,
  },
  {
    slug: "auditoria-de-contratos-de-ti",
    icon: Search,
    title: "Auditoria de Contratos de TI",
    tagline: "Visibilidade, conformidade e economia nos seus contratos de tecnologia.",
    description: "Oferecemos análise independente dos contratos de tecnologia, alinhando as melhores práticas de mercado e atendendo as exigências estratégicas. Nossa auditoria identifica oportunidades de economia, riscos ocultos e desvios de conformidade que muitas vezes passam despercebidos nas revisões internas.",
    benefits: [
      "Revisão completa do portfólio de contratos de TI vigentes",
      "Identificação de sobreposições, obsolescências e desperdícios",
      "Análise de conformidade com legislação e políticas internas",
      "Benchmarking de preços e condições com o mercado",
      "Recomendações para renegociação e otimização de contratos",
      "Relatório executivo com impacto financeiro e priorização de ações",
    ],
    highlight: false,
  },
];

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F1C] flex flex-col items-center justify-center gap-6 px-6">
        <div className="text-6xl font-bold text-slate-200 dark:text-white/10">404</div>
        <p className="text-slate-500 dark:text-white/40 text-lg">Serviço não encontrado.</p>
        <Link to="/#servicos" className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Ver todos os serviços
        </Link>
      </div>
    );
  }

  const Icon = service.icon;
  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F1C]">
      {/* Top nav */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-[#0A0F1C]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
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

      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className={`inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-8 ${
            service.highlight ? "bg-blue-500/15" : "bg-slate-100 dark:bg-white/[0.05]"
          }`}>
            <Icon className={`w-8 h-8 ${service.highlight ? "text-blue-500 dark:text-blue-400" : "text-slate-500 dark:text-white/50"}`} />
          </div>

          <span className="text-sm text-blue-500 dark:text-blue-400 tracking-[0.2em] uppercase font-medium">
            Serviços
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mt-3 mb-4 tracking-tight leading-tight">
            {service.title}
          </h1>
          <p className="text-xl text-slate-500 dark:text-white/50 font-light max-w-2xl leading-relaxed">
            {service.tagline}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
              Sobre o serviço
            </h2>
            <p className="text-slate-500 dark:text-white/50 leading-relaxed text-[15px] font-light">
              {service.description}
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
              Benefícios
            </h2>
            <ul className="space-y-4">
              {service.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-white/50 text-[15px] font-light leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 p-10 md:p-14 text-center mb-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Pronto para transformar sua organização?
          </h3>
          <p className="text-slate-500 dark:text-white/40 font-light mb-8 max-w-lg mx-auto leading-relaxed">
            Fale com nossa equipe e descubra como a <strong className="text-slate-700 dark:text-white/70">{service.title}</strong> pode gerar resultados concretos para o seu negócio.
          </p>
          <a href="/#contato">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-base rounded-xl group transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]">
              Solicitar orçamento
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
        </motion.div>

        {/* Other services */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            Outros serviços
          </h3>
          <div className="grid sm:grid-cols-3 gap-5">
            {otherServices.map((s) => {
              const OtherIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to={`/servicos/${s.slug}`}
                  className="group flex flex-col gap-3 p-6 rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] hover:border-blue-500/30 dark:hover:border-blue-500/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                    <OtherIcon className="w-5 h-5 text-slate-500 dark:text-white/40 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-white/70 group-hover:text-blue-600 dark:group-hover:text-blue-300 leading-snug transition-colors">
                    {s.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}