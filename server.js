require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'OPTIONS'] }));
app.use(express.json({ limit: '10kb' }));
app.use(express.static(__dirname));

// ── API Routes ────────────────────────────────────────────────
const propostaHandler = require('./api/proposta.js');
app.post('/api/proposta', propostaHandler);

// ── Catch-all → serve index.html ──────────────────────────────
app.get('*', (_req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Dev: http://localhost:${PORT}`);
});
