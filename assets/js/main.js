(function () {
  'use strict';

  var form = document.getElementById('formContato');
  var feedback = document.getElementById('formFeedback');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    var btn = form.querySelector('[type=submit]');
    var originalLabel = btn.innerHTML;

    // Estado de carregamento
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Enviando…';

    var payload = {
      nome:     document.getElementById('nome').value.trim(),
      email:    document.getElementById('email').value.trim(),
      servico:  document.getElementById('servico').value,
      mensagem: document.getElementById('mensagem').value.trim(),
    };

    fetch('/api/proposta', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          btn.innerHTML = '<i class="bi bi-check2-circle me-2"></i>Mensagem enviada!';
          btn.classList.replace('btn-primary', 'btn-success');
          form.reset();
          form.classList.remove('was-validated');
          showFeedback('Proposta enviada com sucesso! Em até 24 h entro em contato.', 'success');
        } else {
          throw new Error(data.error || 'Erro desconhecido');
        }
      })
      .catch(function (err) {
        btn.disabled = false;
        btn.innerHTML = originalLabel;
        showFeedback('Não foi possível enviar: ' + err.message, 'danger');
      });
  });

  function showFeedback(msg, type) {
    if (!feedback) return;
    feedback.className = 'alert alert-' + type + ' mt-3';
    feedback.textContent = msg;
    feedback.hidden = false;
    setTimeout(function () { feedback.hidden = true; }, 6000);
  }
})();

window.addEventListener('scroll', function () {
  var navbar = document.querySelector('.dl-navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('dl-navbar-scrolled');
  } else {
    navbar.classList.remove('dl-navbar-scrolled');
  }
});
