/* ==================== STARS ==================== */
function createStars(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star-dot';
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      --dur: ${(Math.random() * 4 + 2).toFixed(1)}s;
      --delay: ${(Math.random() * 3).toFixed(1)}s;
      opacity: ${Math.random() * 0.5 + 0.3};
    `;
    container.appendChild(star);
  }
}
createStars('stars', 160);
createStars('starsReserve', 80);

/* ==================== NAVIGATION ==================== */
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const isOpen = mobileMenu.classList.contains('open');
  hamburger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-label', 'メニューを開く');
    document.body.style.overflow = '';
  });
});

/* ==================== REVEAL ON SCROLL ==================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ==================== MENU TABS ==================== */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    const content = document.getElementById('tab-' + target);
    content.classList.add('active');

    // Trigger reveal for newly visible cards
    content.querySelectorAll('.reveal').forEach(el => {
      if (!el.classList.contains('visible')) {
        setTimeout(() => el.classList.add('visible'), 50);
      }
    });
  });
});

/* ==================== FORM SUBMISSION ==================== */
const reserveForm = document.getElementById('reserveForm');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

reserveForm.addEventListener('submit', (e) => {
  e.preventDefault();
  modal.classList.add('open');
  modalOverlay.classList.add('open');
  reserveForm.reset();
});

function closeModal() {
  modal.classList.remove('open');
  modalOverlay.classList.remove('open');
}
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

/* ==================== SMOOTH SCROLL ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 70;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ==================== PARALLAX MOON ==================== */
const moon = document.querySelector('.moon');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (moon) moon.style.transform = `translateY(${scrolled * 0.15}px)`;
});

/* ==================== DATE INPUT MIN ==================== */
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 1);
  dateInput.min = minDate.toISOString().split('T')[0];
}
