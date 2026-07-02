/* ===== INTRO TYPEWRITER ===== */
(function () {
  const text = 'M & W GROUPS';
  const el = document.getElementById('typed-text');
  let i = 0;

  function type() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(type, i === 1 ? 300 : 100 + Math.random() * 60);
    } else {
      setTimeout(exitIntro, 1600);
    }
  }

  function exitIntro() {
    const intro = document.getElementById('intro');
    const main = document.getElementById('main-site');
    intro.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
    intro.style.opacity = '0';
    intro.style.transform = 'scale(1.05)';
    setTimeout(() => {
      intro.style.display = 'none';
      main.classList.remove('hidden');
      main.style.opacity = '0';
      main.style.transition = 'opacity 0.6s ease';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { main.style.opacity = '1'; });
      });
      initParticles();
      initReveal();
    }, 900);
  }

  setTimeout(type, 600);
})();

/* ===== NAVBAR SCROLL ===== */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}

/* ===== PARTICLES ===== */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = canvas.width = canvas.offsetWidth;
  let H = canvas.height = canvas.offsetHeight;

  const PARTICLES = [];
  const COUNT = Math.min(90, Math.floor(W / 12));

  const colors = ['rgba(110,22,56,', 'rgba(0,255,102,', 'rgba(255,215,0,'];

  for (let i = 0; i < COUNT; i++) {
    PARTICLES.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      a: Math.random() * 0.5 + 0.1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    PARTICLES.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.a + ')';
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;
      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;
      if (p.y < -5) p.y = H + 5;
      if (p.y > H + 5) p.y = -5;
    });

    // connect nearby
    for (let i = 0; i < PARTICLES.length; i++) {
      for (let j = i + 1; j < PARTICLES.length; j++) {
        const dx = PARTICLES[i].x - PARTICLES[j].x;
        const dy = PARTICLES[i].y - PARTICLES[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(PARTICLES[i].x, PARTICLES[i].y);
          ctx.lineTo(PARTICLES[j].x, PARTICLES[j].y);
          ctx.strokeStyle = 'rgba(110,22,56,' + (0.12 * (1 - dist / 120)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('resize', () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  });
}

/* ===== SCROLL REVEAL ===== */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => obs.observe(el));
}

/* ===== TEAM MEMBER TOGGLE ===== */
function toggleMember(id) {
  const detail = document.getElementById('detail-' + id);
  if (!detail) return;
  const isOpen = detail.classList.contains('open');

  document.querySelectorAll('.member-detail').forEach(d => d.classList.remove('open'));
  if (!isOpen) detail.classList.add('open');
}

/* ===== PARTNER TOGGLE ===== */
function togglePartner(id) {
  const detail = document.getElementById('partner-detail-' + id);
  if (!detail) return;
  detail.classList.toggle('open');
}

/* ===== REQUEST MODAL ===== */
function openRequest(name) {
  document.getElementById('modal-name').textContent = name;
  document.getElementById('request-modal').classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeRequest() {
  document.getElementById('request-modal').classList.remove('visible');
  document.body.style.overflow = '';
}

function closeModal(e) {
  if (e.target === document.getElementById('request-modal')) closeRequest();
}

function submitRequest(e) {
  e.preventDefault();
  closeRequest();
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ===== SMOOTH SCROLL ===== */
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const target = document.querySelector(a.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  const navH = document.getElementById('navbar')?.offsetHeight || 70;
  window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
});
