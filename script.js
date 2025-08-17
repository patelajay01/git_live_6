// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.remove('open')));

// Theme toggle with persistence
const themeToggle = document.getElementById('themeToggle');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
let theme = localStorage.getItem('theme') || (prefersLight ? 'light' : 'dark');
if (theme === 'light') document.documentElement.classList.add('light');
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  localStorage.setItem('theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
});

// Scroll progress bar & back-to-top
const progress = document.getElementById('progress');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  const s = window.scrollY;
  const d = document.body.scrollHeight - window.innerHeight;
  progress.style.width = (s / d) * 100 + '%';
  if (s > 200) toTop.classList.add('show'); else toTop.classList.remove('show');
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Animated counters
function animateCount(el, target, suffix = '') {
  const start = 0;
  const dur = 1000 + Math.random() * 600; // ms
  const startTime = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - startTime) / dur);
    const val = Math.floor(start + (target - start) * p);
    el.textContent = val.toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statEls = document.querySelectorAll('.stat .num');
const statObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { const t = +e.target.dataset.count || 0; const suf = e.target.textContent.replace(/\d/g, ''); animateCount(e.target, t, suf); statObs.unobserve(e.target); } });
}, { threshold: 0.5 });
statEls.forEach(el => statObs.observe(el));

// Testimonials slider (auto cycle)
const tCards = Array.from(document.querySelectorAll('.t-card'));
let tIndex = 0; setInterval(() => { tCards[tIndex].classList.remove('active'); tIndex = (tIndex + 1) % tCards.length; tCards[tIndex].classList.add('active'); }, 3800);

// FAQ accordion
document.querySelectorAll('.qa').forEach(qa => {
  qa.querySelector('.q').addEventListener('click', () => qa.classList.toggle('open'));
});

// Contact form (demo only)
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  if (!data.name || !data.email || !data.msg) {
    formNote.textContent = 'Please fill all required fields.';
    formNote.style.color = 'var(--warning)';
    return;
  }
  form.reset();
  formNote.textContent = 'Thank you! We\'ll reach out soon.';
  formNote.style.color = 'var(--success)';
});

// Set year
document.getElementById('year').textContent = new Date().getFullYear();