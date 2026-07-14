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

// About slider — fade + Ken Burns (giống hero)
(function () {
  const slider   = document.querySelector('.about-slider');
  const slides   = document.querySelectorAll('.about-slide');
  const dots     = document.querySelectorAll('.about-dot');
  const progBar  = document.querySelector('.about-progress-bar');
  if (!slider || !slides.length) return;

  let idx = 0, timer;
  const INTERVAL = 5000;

  function goAbout(i) {
    // Xoá active cũ
    slides[idx].classList.remove('active');
    dots[idx]?.setAttribute('aria-pressed', 'false');
    dots[idx]?.classList.remove('active');

    idx = (i + slides.length) % slides.length;

    // Reset Ken Burns bằng cách remove rồi add lại class
    const img = slides[idx].querySelector('img');
    if (img) { img.style.animation = 'none'; img.offsetHeight; img.style.animation = ''; }

    slides[idx].classList.add('active');
    dots[idx]?.setAttribute('aria-pressed', 'true');
    dots[idx]?.classList.add('active');

    // Reset progress bar
    if (progBar) { progBar.style.animation = 'none'; progBar.offsetHeight; progBar.style.animation = ''; }
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goAbout(idx + 1), INTERVAL);
  }

  dots.forEach((d, i) => {
    d.addEventListener('click', () => { goAbout(i); startAuto(); });
  });

  // Swipe touch
  let tx = 0;
  slider.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const dx = tx - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) { goAbout(idx + (dx > 0 ? 1 : -1)); startAuto(); }
  }, { passive: true });

  startAuto();
})();

// Services tab switching
(function () {
  const tabs   = document.querySelectorAll('.svc-tab');
  const panels = document.querySelectorAll('.svc-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const panel = document.getElementById('panel-' + target);
      if (panel) panel.classList.add('active');
    });
  });
})();

// Gallery – Staggered Soft Reveal + Focus Hover
(function() {
  const galleryGrid = document.querySelector('.gallery-grid');
  if (!galleryGrid) return;
  const items = [...galleryGrid.querySelectorAll('.gallery-item')];

  // Assign stagger delays (160ms apart, Chậm–Dịu–Êm)
  items.forEach((item, i) => {
    item.style.setProperty('--gi-delay', `${i * 0.16}s`);
  });

  // Entrance: reveal when gallery scrolls into view
  const galleryObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Small buffer so items are mid-screen before animating
        items.forEach(item => item.classList.add('gi-visible'));
        galleryObs.disconnect();
      }
    });
  }, { threshold: 0.08 });
  galleryObs.observe(galleryGrid);

  // Hover: Focus & Subtle Zoom
  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      galleryGrid.classList.add('gi-focused');
      item.classList.add('gi-active');
    });
    item.addEventListener('mouseleave', () => {
      galleryGrid.classList.remove('gi-focused');
      item.classList.remove('gi-active');
    });
  });
})();

// Recruit – Staggered Soft Reveal
(function() {
  const recruitSection = document.querySelector('.recruit');
  if (!recruitSection) return;
  const items = [...recruitSection.querySelectorAll('.recruit-reveal')];
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        items.forEach(el => el.classList.add('rr-visible'));
        obs.disconnect();
      }
    });
  }, { threshold: 0.08 });
  obs.observe(recruitSection);
})();

// Water Ripple – Offer Cards
document.querySelectorAll('.offer-card').forEach(card => {
  function spawnRipple(x, y) {
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.2;
    const el = document.createElement('span');
    el.className = 'offer-ripple';
    el.style.cssText = `width:${size}px;height:${size}px;left:${x - size/2}px;top:${y - size/2}px;`;
    card.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
  card.addEventListener('click', e => {
    const r = card.getBoundingClientRect();
    spawnRipple(e.clientX - r.left, e.clientY - r.top);
  });
  card.addEventListener('touchstart', e => {
    const r = card.getBoundingClientRect();
    const t = e.touches[0];
    spawnRipple(t.clientX - r.left, t.clientY - r.top);
  }, { passive: true });
});

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
