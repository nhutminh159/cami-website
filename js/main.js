/* ===== CAMI – main.js ===== */

// Navbar scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile menu
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileClose = document.querySelector('.mobile-close');
burger?.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
mobileClose?.addEventListener('click', () => {
  burger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
});
mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Hero slider
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot-btn');
let heroIdx = 0, heroTimer;

function goHeroSlide(i) {
  heroSlides[heroIdx].classList.remove('active');
  heroDots[heroIdx]?.classList.remove('active');
  heroIdx = (i + heroSlides.length) % heroSlides.length;
  heroSlides[heroIdx].classList.add('active');
  heroDots[heroIdx]?.classList.add('active');
}

function startHeroAuto() {
  heroTimer = setInterval(() => goHeroSlide(heroIdx + 1), 5000);
}

heroDots.forEach((dot, i) => {
  dot.addEventListener('click', () => { clearInterval(heroTimer); goHeroSlide(i); startHeroAuto(); });
});

if (heroSlides.length > 0) { heroSlides[0].classList.add('active'); startHeroAuto(); }

// Scroll reveal
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      // Staggered delay for grid children
      const siblings = [...e.target.parentElement.children].filter(c =>
        c.classList.contains('reveal') || c.classList.contains('reveal-left') || c.classList.contains('reveal-right')
      );
      const idx = siblings.indexOf(e.target);
      e.target.style.transitionDelay = `${idx * 80}ms`;
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObs.observe(el));

// Testimonials slider
const track = document.querySelector('.testimonials-track');
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.slider-dot');
let tIdx = 0;

function goSlide(i) {
  tIdx = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${tIdx * 100}%)`;
  dots.forEach((d, j) => d.classList.toggle('active', j === tIdx));
}

document.querySelector('.slider-prev')?.addEventListener('click', () => goSlide(tIdx - 1));
document.querySelector('.slider-next')?.addEventListener('click', () => goSlide(tIdx + 1));
dots.forEach((d, i) => d.addEventListener('click', () => goSlide(i)));
if (dots[0]) dots[0].classList.add('active');
setInterval(() => goSlide(tIdx + 1), 6000);

// Lightbox
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox?.querySelector('img');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    lightboxImg.src = src;
    lightbox.classList.add('open');
  });
});
document.querySelector('.lightbox-close')?.addEventListener('click', () => {
  lightbox.classList.remove('open');
});
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('open');
});

// About section — stagger animate paragraphs & feature cards
const aboutObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      // Paragraphs
      e.target.querySelectorAll('.about-content p').forEach((p, i) => {
        setTimeout(() => p.classList.add('visible'), i * 120);
      });
      // Feature cards
      e.target.querySelectorAll('.about-feature').forEach((f, i) => {
        setTimeout(() => f.classList.add('visible'), 200 + i * 130);
      });
      aboutObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelector('.about-content') && aboutObs.observe(document.querySelector('.about-content'));

// About section mobile image slider
(function () {
  const wrap = document.querySelector('.about-slides-wrap');
  const dots = document.querySelectorAll('.about-dot');
  if (!wrap || !dots.length) return;
  let idx = 0, timer;

  function goAbout(i) {
    idx = (i + dots.length) % dots.length;
    wrap.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d, j) => d.classList.toggle('active', j === idx));
  }

  function startAboutAuto() {
    timer = setInterval(() => goAbout(idx + 1), 5000);
  }

  dots.forEach((d, i) => {
    d.addEventListener('click', () => { clearInterval(timer); goAbout(i); startAboutAuto(); });
  });

  // Touch swipe support
  let tx = 0;
  wrap.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  wrap.addEventListener('touchend', e => {
    const dx = tx - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) { clearInterval(timer); goAbout(idx + (dx > 0 ? 1 : -1)); startAboutAuto(); }
  }, { passive: true });

  startAboutAuto();
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
