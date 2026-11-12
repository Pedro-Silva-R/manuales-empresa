/**
 * Centro de Documentación — Sodexo
 * app.js · Lógica de autenticación y animaciones de UI
 */

(function () {
  'use strict';

  /* ── Configuración ─────────────────────────────── */
  const CONFIG = {
    PASSWORD:    'Repo2026*',
    SESSION_KEY: 'acceso_manuales',
    SESSION_VAL: 'ok',
  };

  /* ── Referencias DOM ───────────────────────────── */
  const overlay   = document.getElementById('login-overlay');
  const content   = document.getElementById('page-content');
  const passInput = document.getElementById('pass-input');
  const errorMsg  = document.getElementById('error-msg');
  const loginBtn  = document.getElementById('login-btn');
  const statNum   = document.getElementById('stat-number');

  /* ── Auth ──────────────────────────────────────── */
  function isAuthenticated() {
    return sessionStorage.getItem(CONFIG.SESSION_KEY) === CONFIG.SESSION_VAL;
  }

  function grantAccess() {
    sessionStorage.setItem(CONFIG.SESSION_KEY, CONFIG.SESSION_VAL);

    overlay.style.transition = 'opacity 0.35s ease';
    overlay.style.opacity = '0';
    overlay.addEventListener('transitionend', () => {
      overlay.setAttribute('aria-hidden', 'true');
      overlay.style.display = 'none';
    }, { once: true });

    content.hidden = false;
    onPageRevealed();
  }

  function showError() {
    errorMsg.hidden = false;
    passInput.classList.add('login-form__input--error');

    // Animación de shake con Web Animations API
    passInput.animate([
      { transform: 'translateX(0px)' },
      { transform: 'translateX(-8px)' },
      { transform: 'translateX(8px)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(0px)' },
    ], { duration: 320, easing: 'ease-out' });

    passInput.focus();
    passInput.select();
  }

  function clearError() {
    if (!errorMsg.hidden) {
      errorMsg.hidden = true;
      passInput.classList.remove('login-form__input--error');
    }
  }

  function verify() {
    const input = passInput.value;
    if (input === CONFIG.PASSWORD) {
      grantAccess();
    } else {
      showError();
    }
  }

  /* ── Animaciones de página ─────────────────────── */

  /**
   * Contador animado para el número de manuales en el hero.
   * @param {HTMLElement} el  - Elemento destino.
   * @param {number}      end - Número final.
   * @param {number}      ms  - Duración en ms.
   */
  function animateCounter(el, end, ms = 900) {
    if (!el) return;
    const startTime = performance.now();

    function step(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / ms, 1);
      // Easing: ease-out-cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(eased * end)).padStart(2, '0');
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /**
   * Entrada escalonada de las cards del catálogo.
   */
  function animateCards() {
    const cards = document.querySelectorAll('.manual-card');
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add('is-visible');
      }, i * 90);
    });
  }

  /**
   * Se llama una vez que el contenido es revelado.
   */
  function onPageRevealed() {
    // Contador en hero
    animateCounter(statNum, parseInt(statNum.dataset.target, 10));
    // Cards
    animateCards();
  }

  /* ── Init ──────────────────────────────────────── */
  function init() {
    // Si ya está autenticado, mostrar directamente
    if (isAuthenticated()) {
      overlay.style.display = 'none';
      overlay.setAttribute('aria-hidden', 'true');
      content.hidden = false;
      onPageRevealed();
      return;
    }

    // Mostrar overlay y adjuntar listeners
    passInput.focus();

    loginBtn.addEventListener('click', verify);

    passInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') verify();
    });

    passInput.addEventListener('input', clearError);
  }

  /* ── Bootstrap ─────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

