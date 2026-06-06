/* ── Navbar scroll ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Mobile menu ─── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('nav-mobile');
const mobileLinks = mobileNav.querySelectorAll('a');

function toggleMenu(open) {
  hamburger.classList.toggle('open', open);
  mobileNav.style.display = open ? 'flex' : 'none';
  requestAnimationFrame(() => mobileNav.classList.toggle('open', open));
  document.body.style.overflow = open ? 'hidden' : '';
}

hamburger.addEventListener('click', () => {
  toggleMenu(!hamburger.classList.contains('open'));
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

/* ── Scroll reveal ─── */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

/* ── Trigger hero reveals immediately ─── */
window.addEventListener('load', () => {
  document.querySelectorAll('#inicio .reveal').forEach(el => {
    el.classList.add('visible');
  });
});

/* ── Phone mask ─── */
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function() {
  let v = this.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 6) {
    this.value = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
  } else if (v.length > 2) {
    this.value = `(${v.slice(0,2)}) ${v.slice(2)}`;
  } else if (v.length > 0) {
    this.value = `(${v}`;
  }
});

/* ── Contact form ─── */
const form = document.getElementById('contact-form');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('name').value.trim();
  const telefone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const modalidade = document.getElementById('modality').value;
  const mensagem = document.getElementById('message').value.trim();

  if (!nome || !email) {
    if (!nome) document.getElementById('name').focus();
    else document.getElementById('email').focus();
    return;
  }

  const texto = `Olá, gostaria de agendar uma consulta.

Nome: ${nome}
Telefone: ${telefone}
E-mail: ${email}
Modalidade: ${modalidade}

Mensagem:
${mensagem}`;

  window.open(
    `https://wa.me/5521984803214?text=${encodeURIComponent(texto)}`,
    '_blank'
  );
});

/* ── Active nav link on scroll ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--deep)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));
