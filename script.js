/* ===========================
   LOADER
=========================== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    loader.addEventListener('transitionend', () => loader.remove());
    startTypingEffect();
    animateSkillBars();
  }, 2000);
});

/* ===========================
   TYPING EFFECT
=========================== */
function startTypingEffect() {
  const el = document.getElementById('typed-name');
  if (!el) return;
  const text = 'Satyam Gupta';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(type, 90);
    }
  };
  type();
}

/* ===========================
   NAVBAR
=========================== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
  toggleBackToTop();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

/* ===========================
   ACTIVE NAV
=========================== */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  let current = '';

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

/* ===========================
   SCROLL REVEAL
=========================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      const delay = (Array.from(entry.target.parentElement?.children || []).indexOf(entry.target)) * 80;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Math.min(delay, 400));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===========================
   SKILL BARS
=========================== */
function animateSkillBars() {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-w');
        bar.style.width = width + '%';
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-bar').forEach(bar => barObserver.observe(bar));
}
animateSkillBars();

/* ===========================
   BACK TO TOP
=========================== */
const backToTopBtn = document.getElementById('backToTop');

function toggleBackToTop() {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===========================
   CONTACT FORM
=========================== */
function handleFormSubmit(e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  const btn = e.target.querySelector('button[type="submit"]');

  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    note.textContent = '✓ Message sent! I\'ll get back to you soon.';
    note.style.color = 'var(--green)';
    e.target.reset();
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
  }, 1500);
}

/* ===========================
   ORB PARALLAX
=========================== */
document.addEventListener('mousemove', (e) => {
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  if (!orb1 || !orb2) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;

  orb1.style.transform = `translate(${x}px, ${y}px)`;
  orb2.style.transform = `translate(${-x}px, ${-y}px)`;
});

/* ===========================
   SMOOTH ANCHOR OFFSET
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
