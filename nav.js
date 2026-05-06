/* ============================================
   PORTFOLIO – Navigation & Shared Scripts
   Luxury Editorial Edition
   ============================================ */

function createNav(activePage) {
  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">N<span>.</span> Livingstone</a>
      <ul class="nav-links" id="navLinks">
        <li><a href="index.html" class="${activePage === 'accueil' ? 'active' : ''}">Accueil</a></li>
        <li><a href="profil.html" class="${activePage === 'profil' ? 'active' : ''}">Profil</a></li>
        <li>
          <a href="but-tc.html" class="dropdown-trigger ${['but-tc','but1','but2','but3'].includes(activePage) ? 'active' : ''}">BUT TC</a>
          <div class="dropdown">
            <a href="but-tc.html" style="color:var(--gold);font-weight:500">Vue d'ensemble</a>
            <div class="dropdown-label" style="margin-top:.4rem">Année 1</div>
            <a href="but1.html">BUT 1 — Tronc commun</a>
            <a href="but1-stage.html" style="padding-left:1.8rem;font-size:.78rem;opacity:.7">↳ Stage — SEMLORE</a>
            <div class="dropdown-label" style="margin-top:.5rem">Année 2</div>
            <a href="but2.html">BUT 2 — Parcours MDEE</a>
            <a href="but2-stage.html" style="padding-left:1.8rem;font-size:.78rem;opacity:.7">↳ Stage — IUT Toulon</a>
            <div class="dropdown-label" style="margin-top:.5rem">Année 3</div>
            <a href="but3.html">BUT 3 — Parcours MDEE</a>
          </div>
        </li>
        <li>
          <a href="skills.html" class="dropdown-trigger ${['skills','hard','mad','soft'].includes(activePage) ? 'active' : ''}">Skills</a>
          <div class="dropdown">
            <a href="skills.html" style="color:var(--gold);font-weight:500">Vue d'ensemble</a>
            <div class="dropdown-label" style="margin-top:.4rem">Compétences</div>
            <a href="hard-skills.html">Hard Skills</a>
            <a href="soft-skills.html">Soft Skills</a>
            <a href="mad-skills.html">Mad Skills</a>
          </div>
        </li>
        <li><a href="contact.html" class="${activePage === 'contact' ? 'active' : ''}">Contact</a></li>
      </ul>
      <button class="nav-hamburger" id="hamburger" aria-label="Ouvrir le menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;
  document.body.prepend(nav);

  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.id = 'navOverlay';
  document.body.appendChild(overlay);

  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  function openMenu() {
    navLinks.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded','true');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded','false');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
    document.querySelectorAll('.dropdown').forEach(d => d.style.display = '');
    document.querySelectorAll('.nav-links > li.open').forEach(li => li.classList.remove('open'));
  }

  hamburger.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  // Mobile : toggle dropdown. Desktop : suit le href.
  document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = trigger.nextElementSibling;
        const isOpen = dropdown.style.display === 'block';
        document.querySelectorAll('.dropdown').forEach(d => d.style.display = '');
        document.querySelectorAll('.nav-links > li.open').forEach(li => li.classList.remove('open'));
        if (!isOpen) {
          dropdown.style.display = 'block';
          trigger.parentElement.classList.add('open');
        }
      }
    });
  });

  document.querySelectorAll('.nav-links a:not(.dropdown-trigger)').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeMenu();
    });
  });
}

function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <p>&copy; ${new Date().getFullYear()} Nathan Livingstone — Portfolio BUT TC</p>
      <ul class="footer-links">
        <li><a href="index.html">Accueil</a></li>
        <li><a href="profil.html">Profil</a></li>
        <li><a href="but-tc.html">BUT TC</a></li>
        <li><a href="skills.html">Skills</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
  `;
  document.body.appendChild(footer);

  // Scroll-to-top
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-top';
  scrollBtn.setAttribute('aria-label', 'Retour en haut');
  scrollBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`;
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(scrollBtn);

  // Toggle visibility via classe (pas de style inline) — passive scroll
  let scrollRaf = false;
  window.addEventListener('scroll', () => {
    if (scrollRaf) return;
    scrollRaf = true;
    requestAnimationFrame(() => {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
      scrollRaf = false;
    });
  }, { passive: true });
}

/* ============================================
   SCROLL REVEAL — IntersectionObserver
   ============================================ */
function initScrollReveal() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
  els.forEach(el => observer.observe(el));
}

/* ============================================
   HERO — Char split + parallax léger
   ============================================ */
function initHeroEnhancements() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;

  // A. Char-by-char reveal
  const h1 = hero.querySelector('h1');
  if (h1 && !reducedMotion && !h1.classList.contains('char-split')) {
    const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let n;
    while ((n = walker.nextNode())) textNodes.push(n);

    let i = 0;
    textNodes.forEach(tn => {
      const frag = document.createDocumentFragment();
      for (const ch of tn.textContent) {
        if (ch === ' ' || ch === ' ' || ch === '\n' || ch === '\t') {
          frag.appendChild(document.createTextNode(ch));
          continue;
        }
        const s = document.createElement('span');
        s.className = 'char';
        s.style.setProperty('--i', i++);
        s.textContent = ch;
        frag.appendChild(s);
      }
      tn.parentNode.replaceChild(frag, tn);
    });
    h1.classList.add('char-split');
  }

  // B. Mouse parallax (CSS vars, rAF throttlé)
  if (!reducedMotion && fine) {
    let rafPending = false;
    let lastX = 0, lastY = 0;
    const rect = { left: 0, top: 0, width: 0, height: 0 };
    function refreshRect() {
      const r = hero.getBoundingClientRect();
      rect.left = r.left; rect.top = r.top; rect.width = r.width; rect.height = r.height;
    }
    refreshRect();
    window.addEventListener('resize', refreshRect, { passive: true });
    window.addEventListener('scroll', refreshRect, { passive: true });

    hero.addEventListener('mousemove', (e) => {
      lastX = e.clientX; lastY = e.clientY;
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        const mx = (lastX - rect.left) / rect.width - 0.5;
        const my = (lastY - rect.top)  / rect.height - 0.5;
        hero.style.setProperty('--mx', mx.toFixed(3));
        hero.style.setProperty('--my', my.toFixed(3));
        rafPending = false;
      });
    }, { passive: true });

    hero.addEventListener('mouseleave', () => {
      hero.style.setProperty('--mx', 0);
      hero.style.setProperty('--my', 0);
    });
  }
}

/* ============================================
   NAV SCROLL — solid bg + hide-on-down + progress bar
   ============================================ */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let progress = nav.querySelector('.nav-progress');
  if (!progress) {
    progress = document.createElement('div');
    progress.className = 'nav-progress';
    nav.appendChild(progress);
  }

  let lastY = window.scrollY;
  let ticking = false;
  const HIDE_THRESHOLD = 240;
  const JITTER = 2;

  function update() {
    const y = window.scrollY;
    const delta = y - lastY;

    nav.classList.toggle('nav-scrolled', y > 50);

    if (Math.abs(delta) > JITTER) {
      if (delta > 0 && y > HIDE_THRESHOLD) {
        nav.classList.add('nav-hidden');
      } else if (delta < 0) {
        nav.classList.remove('nav-hidden');
      }
    }

    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = docH > 0 ? Math.min(1, Math.max(0, y / docH)) : 0;
    progress.style.setProperty('--progress', (ratio * 100).toFixed(2) + '%');

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
}

/* ============================================
   PAGE TRANSITIONS — fade discret entre pages internes
   ============================================ */
function initPageTransitions() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) document.body.classList.remove('page-leaving');
  });

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const a = e.target instanceof Element ? e.target.closest('a') : null;
    if (!a) return;

    const href = a.getAttribute('href');
    if (!href) return;

    if (a.target && a.target !== '_self') return;
    if (a.hasAttribute('download')) return;
    if (href.startsWith('#')) return;
    if (href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (/^https?:\/\//i.test(href)) {
      try {
        const url = new URL(href, location.href);
        if (url.origin !== location.origin) return;
      } catch { return; }
    }

    try {
      const url = new URL(href, location.href);
      if (url.pathname === location.pathname && url.search === location.search) return;
    } catch { /* ignore */ }

    e.preventDefault();
    document.body.classList.add('page-leaving');
    setTimeout(() => { window.location.href = a.href; }, 220);
  });
}

/* ============================================
   COUNT-UP — anime les chiffres data-count quand visibles
   IntersectionObserver-driven, rAF-throttled, ease-out cubic
   ============================================ */
function initCountUp() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  // Reduced motion : afficher la valeur finale tout de suite
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(el => { el.textContent = el.dataset.count; });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      if (isNaN(target)) return;
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        el.textContent = Math.floor(target * eased);
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target;
        }
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5, rootMargin: '0px 0px -10% 0px' });

  els.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavScroll();
  initHeroEnhancements();
  initPageTransitions();
  initCountUp();
});
