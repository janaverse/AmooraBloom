const WHATSAPP_NUMBER = '966500959110';
const WHATSAPP_MESSAGE = 'مرحباً، أود الاستفسار عن المنتجات والطلب عبر واتساب 😊';

function openWhatsApp(customMessage) {
  const msg = encodeURIComponent(customMessage || WHATSAPP_MESSAGE);
  window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  document.addEventListener('click', e => {
    if (navbar && !navbar.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });
}

const whatsappBtn = document.getElementById('whatsappBtn');
const floatWhatsapp = document.getElementById('floatWhatsapp');

if (whatsappBtn) {
  whatsappBtn.addEventListener('click', () => openWhatsApp());
}

if (floatWhatsapp) {
  floatWhatsapp.addEventListener('click', () => openWhatsApp());
}

document.querySelectorAll('.product-card__wish').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    const svg = btn.querySelector('svg');

    if (btn.classList.contains('active')) {
      svg.setAttribute('fill', '#e8748a');
      svg.setAttribute('stroke', '#e8748a');
    } else {
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
    }

    btn.style.transform = 'scale(1.3)';

    setTimeout(() => {
      btn.style.transform = '';
    }, 200);
  });
});

function initFadeIn() {
  const targets = document.querySelectorAll(
    '.product-card, .category-item, .feature-item, .section-header, .hero__content, .hero__image, .whatsapp-cta__content, .whatsapp-cta__img'
  );

  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
}

function initScrollSpy() {
  const links = document.querySelectorAll('.nav-link');

  const sections = [
    {
      id: 'home',
      link: document.querySelector('.nav-link[href="#home"]')
    },
    {
      id: 'categories',
      link: document.querySelector('.nav-link[href="#categoriesTop"]')
    },
    {
      id: 'products',
      link: document.querySelector('.nav-link[href="#products"]')
    },
    {
      id: 'contact',
      link: document.querySelector('.nav-link[href="#contact"]')
    }
  ];

  function updateActiveLink() {
    let current = 'home';

    sections.forEach(section => {
      const el = document.getElementById(section.id);

      if (el) {
        const sectionTop = el.offsetTop - 160;

        if (window.scrollY >= sectionTop) {
          current = section.id;
        }
      }
    });

    links.forEach(link => link.classList.remove('active'));

    const activeSection = sections.find(
      section => section.id === current
    );

    if (activeSection && activeSection.link) {
      activeSection.link.classList.add('active');
    }
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');

    if (href === '#') return;

    if (href === '#home') {
      e.preventDefault();

      window.scrollTo({
        top: 20,
        behavior: 'smooth'
      });

      return;
    }

    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  initFadeIn();
  initScrollSpy();

  if (window.location.hash === '') {
    setTimeout(() => {
      window.scrollTo({
        top: 20,
        behavior: 'smooth'
      });
    }, 200);
  }
});