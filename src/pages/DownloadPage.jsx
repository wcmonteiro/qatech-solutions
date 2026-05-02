import React, { useState } from "react";
import { Download, FileCode, CheckCircle2, Loader2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import JSZip from "jszip";

const LANDING_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>QA Tecnologia — Estratégia, Governança & Inteligência Artificial</title>
  <meta name="description" content="Transformamos organizações por meio da inovação tecnológica, construindo diferenciais competitivos com foco em resultados sustentáveis." />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    * { font-family: 'Inter', sans-serif; }
    html { scroll-behavior: smooth; }
    .gradient-text { background: linear-gradient(135deg, #3b82f6, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .gradient-text-indigo { background: linear-gradient(135deg, #6366f1, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .hero-bg { background: radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(99,102,241,0.10) 0%, transparent 60%), #0A0F1C; }
    .card-hover { transition: all 0.3s ease; }
    .card-hover:hover { transform: translateY(-4px); border-color: rgba(59,130,246,0.3); background: rgba(59,130,246,0.05); }
    .nav-scrolled { background: rgba(10,15,28,0.9); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.04); }
    .fade-in { animation: fadeIn 0.8s ease forwards; }
    @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    .pulse-orb { animation: pulse 4s ease-in-out infinite; }
    @keyframes pulse { 0%,100% { opacity:0.3; transform:scale(1); } 50% { opacity:0.6; transform:scale(1.05); } }
  </style>
</head>
<body class="bg-[#0A0F1C] text-white">

  <!-- NAVBAR -->
  <nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
      <a href="#" class="flex items-center">
        <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698e855b9e9a93cb4b5c4c52/550ce8d56_QA-logo-branca-transparente.png" alt="QA Tecnologia" class="h-10 w-auto" />
      </a>
      <div class="hidden md:flex items-center gap-8">
        <a href="#servicos" class="text-sm text-white/40 hover:text-white transition-colors font-light">Serviços</a>
        <a href="#sobre" class="text-sm text-white/40 hover:text-white transition-colors font-light">Sobre</a>
        <a href="#depoimentos" class="text-sm text-white/40 hover:text-white transition-colors font-light">Depoimentos</a>
        <a href="#contato" class="text-sm text-white/40 hover:text-white transition-colors font-light">Contato</a>
      </div>
      <button id="menuBtn" class="md:hidden text-white/60 hover:text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
    <div id="mobileMenu" class="hidden md:hidden bg-[#0A0F1C]/95 backdrop-blur-xl border-t border-white/[0.04] px-6 py-6 space-y-4">
      <a href="#servicos" class="block text-white/50 hover:text-white transition-colors">Serviços</a>
      <a href="#sobre" class="block text-white/50 hover:text-white transition-colors">Sobre</a>
      <a href="#depoimentos" class="block text-white/50 hover:text-white transition-colors">Depoimentos</a>
      <a href="#contato" class="block text-white/50 hover:text-white transition-colors">Contato</a>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero-bg relative min-h-screen flex items-center overflow-hidden">
    <div class="pulse-orb absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
    <div class="pulse-orb absolute bottom-1/4 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-[100px]"></div>
    <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32">
      <div class="max-w-4xl fade-in">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 mb-8">
          <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"/></svg>
          <span class="text-sm text-blue-300 tracking-wide font-medium">Inovar com resultados</span>
        </div>
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-8">
          Estratégia, <span class="gradient-text">Governança</span><br/>
          <span class="text-white/40">&</span> Inteligência <span class="gradient-text-indigo">Artificial</span>
        </h1>
        <p class="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mb-12 font-light">
          Transformamos organizações por meio da inovação tecnológica, construindo diferenciais competitivos com foco em resultados sustentáveis e excelência operacional.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="#servicos" class="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]">
            Nossos Serviços
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
          <a href="#contato" class="inline-flex items-center justify-center gap-2 border border-white/10 text-white/70 hover:text-white hover:bg-white/5 hover:border-white/20 px-8 py-4 rounded-xl font-medium transition-all duration-300">
            Fale Conosco
          </a>
        </div>
      </div>
      <div class="mt-20 lg:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div><div class="text-4xl font-bold text-white mb-1">15+</div><div class="text-sm text-white/30">Serviços Prestados</div></div>
        <div><div class="text-4xl font-bold text-white mb-1">10+</div><div class="text-sm text-white/30">Clientes Ativos</div></div>
        <div><div class="text-4xl font-bold text-white mb-1">2.4K</div><div class="text-sm text-white/30">Horas de Treinamento</div></div>
        <div><div class="text-4xl font-bold text-white mb-1">100%</div><div class="text-sm text-white/30">Foco em Resultados</div></div>
      </div>
    </div>
  </section>

  <!-- SERVIÇOS -->
  <section id="servicos" class="py-28 bg-[#070B14]">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="text-center mb-16">
        <span class="text-sm text-blue-400 tracking-[0.2em] uppercase font-medium">O que fazemos</span>
        <h2 class="text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight">Nossas Soluções</h2>
        <p class="text-white/40 mt-4 font-light max-w-xl mx-auto">Combinamos expertise técnica com visão estratégica para entregar resultados reais.</p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          { icon: '🏛️', title: 'Governança Digital', desc: 'Estruturamos processos e políticas para garantir conformidade, segurança e alinhamento estratégico na gestão de TI.' },
          { icon: '🤖', title: 'Inteligência Artificial', desc: 'Implementamos soluções de IA para automatizar processos, gerar insights e criar vantagens competitivas sustentáveis.' },
          { icon: '🎯', title: 'Consultoria Estratégica', desc: 'Alinhamos tecnologia e negócio com planos de transformação digital focados em resultados mensuráveis.' },
          { icon: '🔒', title: 'Digital Business Assurance', desc: 'Garantimos a qualidade, segurança e continuidade dos processos digitais críticos da sua organização.' },
          { icon: '🛒', title: 'Aquisição de Software', desc: 'Apoiamos na seleção, negociação e contratação de soluções tecnológicas alinhadas às necessidades do negócio.' },
          { icon: '📋', title: 'Auditoria de Contratos de TI', desc: 'Revisamos e auditamos contratos de TI para identificar riscos, oportunidades de economia e garantir conformidade.' },
        ].map(s => `
        <div class="card-hover p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] cursor-default">
          <div class="text-3xl mb-4">${s.icon}</div>
          <h3 class="text-lg font-semibold text-white mb-3">${s.title}</h3>
          <p class="text-white/40 text-sm font-light leading-relaxed">${s.desc}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- SOBRE / DBA -->
  <section id="sobre" class="py-28 bg-[#0A0F1C]">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <span class="text-sm text-blue-400 tracking-[0.2em] uppercase font-medium">Em Destaque</span>
          <h2 class="text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight leading-tight">
            Digital Business<br/><span class="gradient-text">Assurance</span>
          </h2>
          <p class="text-white/40 mt-6 text-lg leading-relaxed font-light">
            Para ter um crescimento sustentável e rentável do negócio, é preciso gerir os riscos e objetivar o equilíbrio entre os aspectos administrativos, operacionais e tecnológicos.
          </p>
          <div class="mt-8 space-y-4">
            ${['Gestão de riscos operacionais e tecnológicos','Indicadores de qualidade dos processos-chave','Equilíbrio entre aspectos administrativos e tecnológicos','Garantia dos melhores resultados digitais'].map(item => `
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span class="text-white/50 text-sm">${item}</span>
            </div>`).join('')}
          </div>
        </div>
        <div class="space-y-5">
          ${[
            { icon: '🎯', title: 'Estratégia Orientada', text: 'Alinhamento entre tecnologia e objetivos de negócio' },
            { icon: '📈', title: 'Crescimento Sustentável', text: 'Modelos escaláveis com indicadores de qualidade' },
            { icon: '⚡', title: 'Inovação Contínua', text: 'Transformação digital com as melhores tecnologias' },
          ].map(p => `
          <div class="card-hover flex items-start gap-5 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <div class="text-2xl w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">${p.icon}</div>
            <div>
              <h3 class="text-lg font-semibold text-white mb-1">${p.title}</h3>
              <p class="text-white/40 text-sm font-light">${p.text}</p>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- DEPOIMENTOS -->
  <section id="depoimentos" class="py-28 bg-[#070B14]">
    <div class="max-w-4xl mx-auto px-6 lg:px-8">
      <div class="text-center mb-16">
        <span class="text-sm text-blue-400 tracking-[0.2em] uppercase font-medium">Depoimentos</span>
        <h2 class="text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight">O que dizem nossos clientes</h2>
      </div>
      <div id="testimonials" class="relative">
        <div class="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-10 md:p-14 text-center">
          <svg class="w-8 h-8 text-blue-400/20 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          <div id="testimonialText" class="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-10 max-w-2xl mx-auto transition-opacity duration-500"></div>
          <div id="testimonialAuthor" class="flex flex-col items-center gap-2"></div>
        </div>
        <div class="flex items-center justify-center gap-6 mt-8">
          <button onclick="prevTest()" class="w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div id="dots" class="flex gap-2"></div>
          <button onclick="nextTest()" class="w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTATO -->
  <section id="contato" class="py-28 bg-[#0A0F1C]">
    <div class="max-w-6xl mx-auto px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <span class="text-sm text-blue-400 tracking-[0.2em] uppercase font-medium">Fale Conosco</span>
          <h2 class="text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight leading-tight">
            Solicite um <span class="gradient-text">orçamento</span>
          </h2>
          <p class="text-white/40 mt-6 text-lg font-light leading-relaxed">Preencha o formulário e nossa equipe entrará em contato em até 24 horas úteis.</p>
          <div class="mt-10 space-y-4">
            <div class="flex items-center gap-3 text-white/30 text-sm">
              <svg class="w-4 h-4 text-blue-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>Belo Horizonte, MG</span>
            </div>
            <div class="flex items-center gap-3 text-white/30 text-sm">
              <svg class="w-4 h-4 text-blue-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <span>contato@qatecnologia.com.br</span>
            </div>
            <a href="https://www.linkedin.com/company/qatecnologia" target="_blank" class="flex items-center gap-3 text-white/30 text-sm hover:text-blue-400 transition-colors">
              <svg class="w-4 h-4 text-blue-500/50" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
        <div>
          <div id="formSuccess" class="hidden rounded-2xl border border-blue-500/20 bg-blue-500/[0.05] p-12 text-center">
            <svg class="w-14 h-14 text-blue-400 mx-auto mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <h3 class="text-2xl font-bold text-white mb-3">Mensagem enviada!</h3>
            <p class="text-white/40 font-light">Obrigado pelo contato. Nossa equipe retornará em breve.</p>
          </div>
          <form id="contactForm" onsubmit="submitForm(event)" class="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 space-y-6">
            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm text-white/50 mb-2 font-light">Nome <span class="text-blue-500">*</span></label>
                <input id="fname" required placeholder="Seu nome" class="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors" />
              </div>
              <div>
                <label class="block text-sm text-white/50 mb-2 font-light">E-mail <span class="text-blue-500">*</span></label>
                <input id="femail" type="email" required placeholder="seu@email.com" class="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors" />
              </div>
            </div>
            <div>
              <label class="block text-sm text-white/50 mb-2 font-light">Empresa</label>
              <input id="fcompany" placeholder="Nome da sua empresa" class="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors" />
            </div>
            <div>
              <label class="block text-sm text-white/50 mb-2 font-light">Serviço de interesse <span class="text-blue-500">*</span></label>
              <select id="fservice" required class="w-full bg-[#0A0F1C] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/50 transition-colors appearance-none">
                <option value="">Selecione...</option>
                <option>Consultoria Estratégica</option>
                <option>Governança Digital</option>
                <option>Inteligência Artificial</option>
                <option>Digital Business Assurance</option>
                <option>Aquisição de Software</option>
                <option>Auditoria de Contratos de TI</option>
                <option>Outro</option>
              </select>
            </div>
            <div>
              <label class="block text-sm text-white/50 mb-2 font-light">Mensagem <span class="text-blue-500">*</span></label>
              <textarea id="fmessage" rows="5" required placeholder="Descreva brevemente sua necessidade..." class="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors resize-none"></textarea>
            </div>
            <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] flex items-center justify-center gap-2">
              Enviar Solicitação
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="py-12 bg-[#070B14] border-t border-white/[0.04]">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698e855b9e9a93cb4b5c4c52/550ce8d56_QA-logo-branca-transparente.png" alt="QA Tecnologia" class="h-8 w-auto" />
      <p class="text-white/20 text-sm">© ${new Date().getFullYear()} QA Tecnologia. Todos os direitos reservados.</p>
      <div class="flex items-center gap-6 text-sm text-white/30">
        <a href="#servicos" class="hover:text-white transition-colors">Serviços</a>
        <a href="#sobre" class="hover:text-white transition-colors">Sobre</a>
        <a href="#contato" class="hover:text-white transition-colors">Contato</a>
      </div>
    </div>
  </footer>

  <!-- WHATSAPP -->
  <a href="https://wa.me/5531999999999" target="_blank" class="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-green-500/40 transition-all duration-300 z-50">
    <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.012.496 3.914 1.372 5.583L0 24l6.614-1.347A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.368l-.359-.213-3.724.757.788-3.617-.233-.371A9.786 9.786 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z"/></svg>
  </a>

  <script>
    // Navbar scroll
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('navbar');
      if (window.scrollY > 50) nav.classList.add('nav-scrolled');
      else nav.classList.remove('nav-scrolled');
    });

    // Mobile menu
    document.getElementById('menuBtn').addEventListener('click', () => {
      const m = document.getElementById('mobileMenu');
      m.classList.toggle('hidden');
    });

    // Testimonials
    const testimonials = [
      { text: 'A QA Tecnologia nos ajudou a estruturar toda a governança de TI, alinhando tecnologia com os objetivos estratégicos do negócio. Os resultados foram imediatos e mensuráveis.', name: 'Carlos Mendonça', role: 'CIO · Grupo Minas Digital', initials: 'CM' },
      { text: 'Excelente parceria na implementação da nossa estratégia de Governança Digital. A equipe demonstrou profundo conhecimento técnico e visão estratégica durante todo o projeto.', name: 'Fernanda Azevedo', role: 'Diretora de Inovação · Prefeitura de BH', initials: 'FA' },
      { text: 'Com a consultoria da QA, identificamos oportunidades de uso de IA que reduziram nossos custos operacionais em 30%. Recomendo fortemente para quem busca resultados reais.', name: 'Rafael Borges', role: 'Gerente de TI · Construtora Horizonte', initials: 'RB' },
    ];
    let tIdx = 0;

    function renderTest() {
      const t = testimonials[tIdx];
      document.getElementById('testimonialText').textContent = '"' + t.text + '"';
      document.getElementById('testimonialAuthor').innerHTML =
        '<div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20 flex items-center justify-center mb-1"><span class="text-sm font-bold text-blue-300">' + t.initials + '</span></div>' +
        '<span class="text-base font-semibold text-white">' + t.name + '</span>' +
        '<span class="text-sm text-white/30 font-light">' + t.role + '</span>';
      const dots = document.getElementById('dots');
      dots.innerHTML = testimonials.map((_, i) =>
        '<button onclick="goTest(' + i + ')" class="rounded-full transition-all duration-300 ' + (i === tIdx ? 'w-6 h-2 bg-blue-500' : 'w-2 h-2 bg-white/20 hover:bg-white/40') + '"></button>'
      ).join('');
    }

    function nextTest() { tIdx = (tIdx + 1) % testimonials.length; renderTest(); }
    function prevTest() { tIdx = (tIdx - 1 + testimonials.length) % testimonials.length; renderTest(); }
    function goTest(i) { tIdx = i; renderTest(); }

    renderTest();
    setInterval(nextTest, 6000);

    // Contact form
    function submitForm(e) {
      e.preventDefault();
      const mailto = 'mailto:contato@qatecnologia.com.br?subject=' +
        encodeURIComponent('Solicitação de Orçamento - ' + document.getElementById('fservice').value) +
        '&body=' + encodeURIComponent(
          'Nome: ' + document.getElementById('fname').value + '\\n' +
          'Email: ' + document.getElementById('femail').value + '\\n' +
          'Empresa: ' + document.getElementById('fcompany').value + '\\n' +
          'Serviço: ' + document.getElementById('fservice').value + '\\n\\n' +
          'Mensagem:\\n' + document.getElementById('fmessage').value
        );
      window.location.href = mailto;
      document.getElementById('contactForm').classList.add('hidden');
      document.getElementById('formSuccess').classList.remove('hidden');
    }
  </script>
</body>
</html>`;

export default function DownloadPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleDownloadZip = async () => {
    setLoading(true);
    const zip = new JSZip();
    zip.file("index.html", LANDING_HTML);
    zip.file("README.txt",
`QA Tecnologia — Landing Page
=============================

Como usar:
1. Abra o arquivo index.html em qualquer navegador, ou
2. Faça upload da pasta para seu servidor / hospedagem.

Compatível com: GitHub Pages, Netlify, Vercel, Hostgator, etc.

Para publicar no GitHub Pages:
- Crie um repositório público
- Faça upload do index.html
- Ative GitHub Pages nas configurações do repositório

Dúvidas? contato@qatecnologia.com.br
`);

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qa-tecnologia-landing.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setLoading(false);
    setDone(true);
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-8">
          <Package className="w-10 h-10 text-blue-400" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
          Pacote ZIP — Landing Page
        </h1>
        <p className="text-white/40 font-light mb-8 leading-relaxed">
          Baixe o arquivo ZIP com a landing page pronta para hospedar em qualquer servidor.
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 mb-8 text-left space-y-2">
          {[
            "index.html — página completa em um arquivo",
            "README.txt — instruções de publicação",
            "Design responsivo (mobile e desktop)",
            "Sem dependências externas de backend",
            "Compatível com GitHub Pages, Netlify e outros",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-white/50">
              <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <Button
          onClick={handleDownloadZip}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-base rounded-xl gap-2 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] disabled:opacity-60"
        >
          {loading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Gerando ZIP...</>
          ) : done ? (
            <><CheckCircle2 className="w-5 h-5" /> Download iniciado!</>
          ) : (
            <><Download className="w-5 h-5" /> Baixar qa-tecnologia-landing.zip</>
          )}
        </Button>

        <p className="text-white/20 text-xs mt-4">
          Arquivo: qa-tecnologia-landing.zip (~50 KB)
        </p>
      </div>
    </div>
  );
}