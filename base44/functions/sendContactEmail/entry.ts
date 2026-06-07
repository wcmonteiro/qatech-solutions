import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { Resend } from 'npm:resend@4.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email, company, service, message } = await req.json();

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    // Salva o lead no banco como garantia
    await base44.asServiceRole.entities.Lead.create({
      name,
      email,
      interest: service,
      source: "landing_page"
    });

    // Envia e-mail de notificação para a QA Tecnologia
    await resend.emails.send({
      from: "Site QA Tecnologia <onboarding@resend.dev>",
      to: ["contato@qatecnologia.com.br"],
      subject: `[CONTATO] Nova solicitação de ${name} - ${service}`,
      text: `Nova solicitação de contato recebida pelo site:\n\n👤 Nome: ${name}\n📧 E-mail: ${email}\n🏢 Empresa: ${company || "Não informado"}\n🎯 Interesse: ${service}\n\n💬 Mensagem:\n${message}\n\n---\nEnviado automaticamente pelo site qatecnologia.com.br`,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});