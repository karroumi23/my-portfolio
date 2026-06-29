/* =============================================
   PORTFOLIO — main.js
============================================= */

// ── Theme toggle ──────────────────────────
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const savedTheme = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// ── Sticky header ─────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Active nav link on scroll ─────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// ── Mobile nav ────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');
const mobileOverlay = document.getElementById('mobileOverlay');

function openMobileNav() {
  mobileNav.classList.add('open');
  mobileOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  mobileNav.classList.remove('open');
  mobileOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMobileNav);
mobileNavClose.addEventListener('click', closeMobileNav);
mobileOverlay.addEventListener('click', closeMobileNav);
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', closeMobileNav);
});

// ── Project Description Accordion ─────────────────────
const descButtons = document.querySelectorAll('.desc-btn');

descButtons.forEach(btn => {
  btn.addEventListener('click', () => {

    const currentDesc = btn.nextElementSibling;
    const isOpen = currentDesc.classList.contains('show');

    // Close every card first
    descButtons.forEach(otherBtn => {
      otherBtn.classList.remove('open');
      otherBtn.innerHTML =
        '<i class="fa-solid fa-chevron-down"></i> Description';

      const otherDesc = otherBtn.nextElementSibling;
      otherDesc.classList.remove('show');
    });

    // If it wasn't open, open it
    if (!isOpen) {
      currentDesc.classList.add('show');
      btn.classList.add('open');
      btn.innerHTML =
        '<i class="fa-solid fa-chevron-up"></i> Hide';
    }
  });
});

// -----backoffice-btn-------------------------------
document.querySelectorAll('.backoffice-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const all = btn.dataset.images.split(',').map(s => s.trim()).filter(Boolean);
    openLightbox(all[0], all, 0);
  });
});



// ── Lightbox ──────────────────────────────
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbCounter = document.getElementById('lbCounter');
const lbClose  = document.getElementById('lbClose');
const lbPrev   = document.getElementById('lbPrev');
const lbNext   = document.getElementById('lbNext');

let lbImages = [];
let lbIndex  = 0;

function openLightbox(src, all, idx) {
  lbImages = all;
  lbIndex  = idx;
  lbImg.src = src;
  lbCounter.textContent = `${idx + 1} / ${all.length}`;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lbImg.src = '';
}
function showLbImage(idx) {
  lbIndex = (idx + lbImages.length) % lbImages.length;
  lbImg.src = lbImages[lbIndex].trim();
  lbCounter.textContent = `${lbIndex + 1} / ${lbImages.length}`;
}

// bind thumb clicks
document.querySelectorAll('.project-thumb').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    const all = img.dataset.images.split(',').map(s => s.trim()).filter(Boolean);
    openLightbox(all[0], all, 0);
  });
});

// bind overlay click (same as thumb click)
document.querySelectorAll('.project-img-wrap').forEach(wrap => {
  wrap.addEventListener('click', () => {
    const img = wrap.querySelector('.project-thumb');
    const all = img.dataset.images.split(',').map(s => s.trim()).filter(Boolean);
    openLightbox(all[0], all, 0);
  });
});

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => showLbImage(lbIndex - 1));
lbNext.addEventListener('click', () => showLbImage(lbIndex + 1));

// close on backdrop
document.querySelector('.lb-backdrop').addEventListener('click', closeLightbox);

// keyboard nav
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showLbImage(lbIndex - 1);
  if (e.key === 'ArrowRight') showLbImage(lbIndex + 1);
});

// ── Animate skill bars on scroll ─────────
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.tech-fill').forEach(bar => {
  bar.style.animationPlayState = 'paused';
  skillObserver.observe(bar);
});

// ── Fade-in sections ──────────────────────
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.tech-card, .soft-card, .about-grid, .contact-grid').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});

// inject visible class
const style = document.createElement('style');
style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// ── Contact form feedback ─────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    const btn = contactForm.querySelector('button[type=submit]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
  });
}