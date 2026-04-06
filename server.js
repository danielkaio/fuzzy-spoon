'use strict';

require('dotenv').config();

const express  = require('express');
const { Resend } = require('resend');
const cors     = require('cors');
const path     = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── Middlewares ─────────────────────────────────────────── */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve os arquivos estáticos do front-end
app.use(express.static(path.join(__dirname)));

/* ── Cliente Resend ─────────────────────────────────────── */
const resend = new Resend(process.env.RESEND_API_KEY);

/* ── Rota POST /api/proposta ─────────────────────────────── */
app.post('/api/proposta', async (req, res) => {
  const { nome, email, servico, mensagem } = req.body;

  // Validação básica dos campos obrigatórios
  if (!nome || !email || !servico || !mensagem) {
    return res.status(400).json({ success: false, error: 'Todos os campos são obrigatórios.' });
  }

  // Sanidade mínima no e-mail recebido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'E-mail inválido.' });
  }

  const servicosMap = {
    landingpage:  'Landing Page',
    hotsite:      'Hotsite',
    api:          'Integração de API',
    checkout:     'Checkout & Pagamentos',
    automacao:    'Automações / Chatbot',
    completo:     'Projeto Completo',
  };
  const servicoLabel = servicosMap[servico] || servico;

  try {
    const { error } = await resend.emails.send({
      from:    'DevLaunch <onboarding@resend.dev>',
      to:      process.env.EMAIL_TO,
      replyTo: email,
      subject: `Nova proposta – ${servicoLabel} | ${nome}`,
      html: `
        <h2 style="color:#4F46E5;">Nova proposta recebida — DevLaunch</h2>
        <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:15px;">
          <tr><td><strong>Nome</strong></td><td>${escapeHtml(nome)}</td></tr>
          <tr><td><strong>E-mail</strong></td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td><strong>Serviço</strong></td><td>${escapeHtml(servicoLabel)}</td></tr>
        </table>
        <h3 style="margin-top:24px;">Mensagem</h3>
        <p style="white-space:pre-wrap;font-family:sans-serif;">${escapeHtml(mensagem)}</p>
      `,
    });

    if (error) {
      console.error('Erro ao enviar e-mail:', error.message);
      return res.status(500).json({ success: false, error: 'Falha ao enviar. Tente novamente mais tarde.' });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err.message);
    return res.status(500).json({ success: false, error: 'Falha ao enviar. Tente novamente mais tarde.' });
  }
});

/* ── SPA fallback: todas as rotas servem o index.html ───── */
app.get('/{*path}', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

/* ── Utilitário ─────────────────────────────────────────── */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Inicia o servidor ──────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`DevLaunch server rodando em http://localhost:${PORT}`);
});
