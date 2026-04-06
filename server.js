require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { Resend } = require('resend');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// ── Middlewares ───────────────────────────────────────────────
app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(express.json({ limit: '10kb' }));
app.use(express.static(__dirname));

// ── Rate Limiting (OWASP: brute-force protection) ─────────────
const propostaLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas tentativas. Aguarde 15 minutos e tente novamente.' }
});

// ── Sanitização básica (OWASP: XSS prevention) ───────────────
function sanitize(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/[<>"'`]/g, '').trim().slice(0, 1000);
}

// ── POST /api/proposta ────────────────────────────────────────
app.post('/api/proposta', propostaLimiter, async (req, res) => {
  const { nome, empresa, email, telefone, plano, mensagem } = req.body;

  // Validação dos campos obrigatórios
  if (!nome || !email || !plano) {
    return res.status(400).json({ error: 'Nome, e-mail e plano são obrigatórios.' });
  }

  // Validação de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Informe um e-mail válido.' });
  }

  // Sanitizar
  const dados = {
    nome:     sanitize(nome),
    empresa:  sanitize(empresa),
    email:    sanitize(email),
    telefone: sanitize(telefone),
    plano:    sanitize(plano),
    mensagem: sanitize(mensagem)
  };

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.EMAIL_TO,
      replyTo: dados.email,
      subject: `🚀 Nova proposta: ${dados.nome} — Plano ${dados.plano}`,
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head><meta charset="UTF-8"/></head>
        <body style="margin:0;padding:0;background:#f4f4f8;font-family:Arial,sans-serif;">
          <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">
            <div style="background:linear-gradient(135deg,#6C63FF,#3B37CE);padding:32px 40px;">
              <h1 style="color:#fff;margin:0;font-size:22px;">📩 Nova Solicitação de Proposta</h1>
              <p style="color:rgba(255,255,255,.8);margin:4px 0 0;">Recebida em ${new Date().toLocaleString('pt-BR')}</p>
            </div>
            <div style="padding:32px 40px;">
              <table style="width:100%;border-collapse:collapse;font-size:15px;">
                <tr><td style="padding:10px 0;color:#888;font-weight:600;width:120px;">Nome</td><td style="padding:10px 0;">${dados.nome}</td></tr>
                <tr style="border-top:1px solid #f0f0f0;"><td style="padding:10px 0;color:#888;font-weight:600;">Empresa</td><td style="padding:10px 0;">${dados.empresa || '—'}</td></tr>
                <tr style="border-top:1px solid #f0f0f0;"><td style="padding:10px 0;color:#888;font-weight:600;">E-mail</td><td style="padding:10px 0;"><a href="mailto:${dados.email}" style="color:#6C63FF;">${dados.email}</a></td></tr>
                <tr style="border-top:1px solid #f0f0f0;"><td style="padding:10px 0;color:#888;font-weight:600;">Telefone</td><td style="padding:10px 0;">${dados.telefone || '—'}</td></tr>
                <tr style="border-top:1px solid #f0f0f0;"><td style="padding:10px 0;color:#888;font-weight:600;">Plano</td>
                  <td style="padding:10px 0;"><span style="background:#f0eeff;color:#6C63FF;padding:3px 10px;border-radius:20px;font-weight:600;">${dados.plano}</span></td></tr>
                <tr style="border-top:1px solid #f0f0f0;"><td style="padding:10px 0;color:#888;font-weight:600;vertical-align:top;">Mensagem</td><td style="padding:10px 0;">${dados.mensagem || '—'}</td></tr>
              </table>
              <a href="mailto:${dados.email}?subject=Re: Proposta ${dados.plano}"
                style="display:inline-block;margin-top:28px;padding:12px 28px;background:#6C63FF;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">
                Responder ao cliente
              </a>
            </div>
          </div>
        </body>
        </html>
      `
    });

    return res.json({ success: true, message: 'Proposta enviada com sucesso! Entraremos em contato em breve.' });
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err?.message || err);
    return res.status(500).json({ error: 'Erro ao enviar proposta. Tente novamente mais tarde.' });
  }
});

// ── Catch-all → serve index.html ─────────────────────────────
app.get('/{*splat}', (_req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅  Servidor rodando em http://localhost:${PORT}`);
});
