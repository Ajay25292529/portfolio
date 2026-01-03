// ==========================================
// main.js – Premium Portfolio Interactions
// Author: Ajay Koleti
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     MOBILE MENU TOGGLE (SLIDE + FADE ANIMATION)
     ========================================== */
  const menuBtns = document.querySelectorAll('.menu-btn');
  menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = btn.closest('.nav-inner').querySelector('.nav-menu');
      if (!nav) return;

      const isOpen = nav.classList.contains('open');
      nav.classList.toggle('open');

      nav.style.display = isOpen ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.animation = isOpen
        ? 'menuHide 0.35s ease forwards'
        : 'menuDrop 0.35s ease forwards';

      btn.setAttribute('aria-expanded', (!isOpen).toString());
    });
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      const nav = link.closest('.nav-menu');
      if (nav && window.innerWidth <= 760) {
        nav.style.display = 'none';
        nav.classList.remove('open');
      }
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', e => {
    const nav = document.querySelector('.nav-menu');
    const btn = document.querySelector('.menu-btn');
    if (!nav || !btn) return;

    if (!nav.contains(e.target) && !btn.contains(e.target) && window.innerWidth <= 760) {
      nav.style.display = 'none';
      nav.classList.remove('open');
    }
  });

  /* ==========================================
     DARK / LIGHT THEME TOGGLE
     ========================================== */
  const THEME_KEY = 'portfolio_theme';
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-pressed', theme === 'dark');
    });
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) applyTheme(savedTheme);
  else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  });

  /* ==========================================
     SMOOTH SCROLL (ANCHORS)
     ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ==========================================
     SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================== */
  const revealItems = document.querySelectorAll('section, .card, .profile-wrap, .blog-card');

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        entry.target.style.transition = 'all 0.8s cubic-bezier(0.6, 0.05, 0.28, 0.91)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach(item => revealObserver.observe(item));

  /* ==========================================
     STAGGERED REVEAL FOR GRID ITEMS
     ========================================== */
  const grids = document.querySelectorAll('.projects-grid, .blog-grid, .grid');
  grids.forEach(grid => {
    const children = Array.from(grid.children);
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.15}s`;
    });
  });

  /* ==========================================
     ACTIVE NAV LINK ON SCROLL
     ========================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  function setActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  }
  window.addEventListener('scroll', setActiveLink);

  /* ==========================================
     HERO IMAGE PARALLAX (DESKTOP ONLY)
     ========================================== */
  const heroImg = document.querySelector('.profile-wrap img');
  if (heroImg && window.innerWidth > 900) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY * 0.12;
      heroImg.style.transform = `translateY(${y}px)`;
    });
  }

  /* ==========================================
     BUTTON HOVER EFFECTS (PRO)
     ========================================== */
  document.querySelectorAll('.btn, .btn-outline, .btn-read').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.05)';
      btn.style.transition = 'transform 0.3s ease';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
    });
  });

  /* ==========================================
     TYPING EFFECT (HEADER PRO ANIMATION)
     ========================================== */
  const typedHeader = document.querySelector('.typing');
  if (typedHeader) {
    const text = typedHeader.dataset.text || "Welcome to my Portfolio!";
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        typedHeader.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      }
    }
    typeWriter();
  }

  /* ==========================================
     PREFERS REDUCED MOTION SUPPORT
     ========================================== */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
      el.style.animation = 'none';
      el.style.transition = 'none';
    });
  }

});
