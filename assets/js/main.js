// ── Nav scroll effect ──────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile menu ───────────────────────────────────────────────
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// ── Auto-fill plano from pricing buttons ─────────────────────
document.querySelectorAll('[data-plano]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const plano = btn.dataset.plano;
    const select = document.getElementById('plano');
    if (select) select.value = plano;
  });
});

// ── Form submission ───────────────────────────────────────────
document.getElementById('propostaForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome    = document.getElementById('nome').value.trim();
  const empresa = document.getElementById('empresa').value.trim();
  const email   = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const plano   = document.getElementById('plano').value;
  const mensagem = document.getElementById('mensagem').value.trim();

  // Client-side validation
  let valid = true;
  [['nome', nome, 'Informe seu nome.'],
   ['email', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? email : '', 'Informe um e-mail válido.'],
   ['plano', plano, 'Selecione um plano.']
  ].forEach(([id, val, msg]) => {
    const errEl = document.getElementById(id + '-error');
    if (!val) { errEl.textContent = msg; valid = false; }
    else { errEl.textContent = ''; }
  });

  if (!valid) return;

  const btn = document.getElementById('submitBtn');
  const feedback = document.getElementById('formFeedback');
  document.getElementById('btnText').style.display = 'none';
  document.getElementById('btnLoading').style.display = 'inline';
  btn.disabled = true;

  try {
    const res = await fetch('/api/proposta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, empresa, email, telefone, plano, mensagem })
    });
    const data = await res.json();

    feedback.style.display = 'block';
    if (res.ok) {
      feedback.className = 'form-feedback success';
      feedback.innerHTML = '<i class="bi bi-check-circle-fill"></i> ' + data.message;
      e.target.reset();
    } else {
      feedback.className = 'form-feedback error';
      feedback.innerHTML = '<i class="bi bi-exclamation-triangle-fill"></i> ' + data.error;
    }
  } catch {
    feedback.style.display = 'block';
    feedback.className = 'form-feedback error';
    feedback.innerHTML = '<i class="bi bi-exclamation-triangle-fill"></i> Erro de conexão. Tente novamente.';
  } finally {
    document.getElementById('btnText').style.display = 'inline';
    document.getElementById('btnLoading').style.display = 'none';
    btn.disabled = false;
  }
});
