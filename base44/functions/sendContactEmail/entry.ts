import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email, company, service, message } = await req.json();

    // Salva o lead no banco como garantia
    await base44.asServiceRole.entities.Lead.create({
      name,
      email,
      interest: service,
      source: "landing_page"
    });

    // Envia e-mail de notificação para a QA Tecnologia
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: "contato@qatecnologia.com.br",
      from_name: "Site QA Tecnologia",
      subject: `[CONTATO] Nova solicitação de ${name} - ${service}`,
      body: `Nova solicitação de contato recebida pelo site:\n\n👤 Nome: ${name}\n📧 E-mail: ${email}\n🏢 Empresa: ${company || "Não informado"}\n🎯 Interesse: ${service}\n\n💬 Mensagem:\n${message}\n\n---\nEnviado automaticamente pelo site qatecnologia.com.br`
    });

    // Envia e-mail de confirmação para o cliente
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: email,
      from_name: "QA Tecnologia",
      subject: `Recebemos sua mensagem, ${name.split(" ")[0]}!`,
      body: `Olá, ${name.split(" ")[0]}!\n\nRecebemos sua solicitação sobre "${service}" e nossa equipe entrará em contato em até 24 horas úteis.\n\nResumo do seu contato:\n- Interesse: ${service}\n- Empresa: ${company || "Não informado"}\n\nAtenciosamente,\nEquipe QA Tecnologia\ncontato@qatecnologia.com.br`
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});