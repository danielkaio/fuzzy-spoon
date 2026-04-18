require('dotenv').config();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Sanitização ───────────────────────────────────────────────
function sanitize(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/[<>"'`]/g, '').trim().slice(0, 1000);
}

// ── Handler (Vercel Serverless) ───────────────────────────────
module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nome, empresa, email, telefone, plano, mensagem } = req.body;

  // Validação
  if (!nome || !email || !plano) {
    return res.status(400).json({ error: 'Campos obrigatórios' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'E-mail inválido' });
  }

  const dados = {
    nome: sanitize(nome),
    empresa: sanitize(empresa),
    email: sanitize(email),
    telefone: sanitize(telefone),
    plano: sanitize(plano),
    mensagem: sanitize(mensagem)
  };

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.EMAIL_TO,
      replyTo: dados.email,
      subject: `Nova proposta - ${dados.nome} — ${dados.plano}`,
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head><meta charset="UTF-8"/></head>
        <body style="margin:0;padding:0;background:#f4f4f8;font-family:Arial,sans-serif;">
          <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">
            <div style="background:linear-gradient(135deg,#6C63FF,#3B37CE);padding:32px 40px;">
              <h1 style="color:#fff;margin:0;font-size:22px;">📩 Nova Solicitação</h1>
              <p style="color:rgba(255,255,255,.8);margin:4px 0 0;">Recebida em ${new Date().toLocaleString('pt-BR')}</p>
            </div>
            <div style="padding:32px 40px;">
              <table style="width:100%;border-collapse:collapse;font-size:15px;">
                <tr><td style="padding:10px 0;color:#888;font-weight:600;width:120px;">Nome</td><td>${dados.nome}</td></tr>
                <tr style="border-top:1px solid #f0f0f0;"><td style="padding:10px 0;color:#888;font-weight:600;">Empresa</td><td style="padding:10px 0;">${dados.empresa || '—'}</td></tr>
                <tr style="border-top:1px solid #f0f0f0;"><td style="padding:10px 0;color:#888;font-weight:600;">E-mail</td><td style="padding:10px 0;"><a href="mailto:${dados.email}" style="color:#6C63FF;">${dados.email}</a></td></tr>
                <tr style="border-top:1px solid #f0f0f0;"><td style="padding:10px 0;color:#888;font-weight:600;">Telefone</td><td style="padding:10px 0;">${dados.telefone || '—'}</td></tr>
                <tr style="border-top:1px solid #f0f0f0;"><td style="padding:10px 0;color:#888;font-weight:600;">Plano</td><td style="padding:10px 0;"><span style="background:#f0eeff;color:#6C63FF;padding:3px 10px;border-radius:20px;font-weight:600;">${dados.plano}</span></td></tr>
                <tr style="border-top:1px solid #f0f0f0;"><td style="padding:10px 0;color:#888;font-weight:600;vertical-align:top;">Mensagem</td><td style="padding:10px 0;">${dados.mensagem || '—'}</td></tr>
              </table>
            </div>
          </div>
        </body>
        </html>
      `
    });

    return res.json({ success: true, message: 'Proposta enviada com sucesso!' });
  } catch (err) {
    console.error('Erro:', err?.message || err);
    return res.status(500).json({ error: 'Erro ao enviar' });
  }
};
