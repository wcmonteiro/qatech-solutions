import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { Resend } from 'npm:resend@4.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email, company, service, message } = await req.json();

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    // Envia o e-mail PRIMEIRO (prioridade máxima)
    await resend.emails.send({
      from: "Site QA Tecnologia <onboarding@resend.dev>",
      to: ["contato@qatecnologia.com.br"],
      subject: `[CONTATO] Nova solicitação de ${name} - ${service}`,
      text: `Nova solicitação de contato recebida pelo site:\n\n👤 Nome: ${name}\n📧 E-mail: ${email}\n🏢 Empresa: ${company || "Não informado"}\n🎯 Interesse: ${service}\n\n💬 Mensagem:\n${message}\n\n---\nEnviado automaticamente pelo site qatecnologia.com.br`,
    });

    // Salva o lead no banco como backup (sem bloquear em caso de erro)
    try {
      await base44.asServiceRole.entities.Lead.create({
        name,
        email,
        interest: "Outro",
        source: service,
      });
    } catch (_) {
      // Não bloqueia mesmo se falhar
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});