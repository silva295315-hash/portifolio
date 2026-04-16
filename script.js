// Typewriter effect
const typeEl = document.getElementById('typewriter');
const texts = ['em formação tecnoliga em sistemas para internet', 'analítica da Pedagogia',];
let idx = 0, charIdx = 0, deleting = false;

function typeWrite() {
  const current = texts[idx];
  if (deleting) {
    typeEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typeEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
  }
  if (!deleting && charIdx === current.length) {
    deleting = true;
    setTimeout(typeWrite, 1800);
    return;
  }
  if (deleting && charIdx === 0) {
    deleting = false;
    idx = (idx + 1) % texts.length;
    setTimeout(typeWrite, 200);
    return;
  }
  setTimeout(typeWrite, deleting ? 50 : 90);
}
typeWrite();

// Mobile menu toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('.nav-link, .btn[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const hash = this.getAttribute('href');
    if (hash && hash !== '#') {
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
      }
    }
  });
});

// Reveal sections on scroll
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
sections.forEach(s => observer.observe(s));
document.getElementById('home').classList.add('visible');

// Active nav link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  const scrollPos = window.scrollY + 150;
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      current = sec.getAttribute('id');
    }
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// WhatsApp form handler
const form = document.getElementById('whatsapp-form');
// 🔁 ALTERE ESTE NÚMERO PARA O SEU WHATSAPP (código do país + DDD + número, sem espaços)
// Exemplo Brasil: 5511999999999 (55 + 11 + 999999999)
const whatsappNumber = '558699799755';  // <--- SUBSTITUA AQUI

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !email || !mensagem) {
    alert('Por favor, preencha todos os campos (nome, e-mail e mensagem).');
    return;
  }

  const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
  if (!emailPattern.test(email)) {
    alert('Digite um e-mail válido (exemplo: nome@dominio.com).');
    return;
  }

  const texto = `*Novo contato do portfólio*%0A%0A*Nome:* ${encodeURIComponent(nome)}%0A*E-mail:* ${encodeURIComponent(email)}%0A*Mensagem:*%0A${encodeURIComponent(mensagem)}%0A%0AEnviado automaticamente pelo site.`;
  const url = `https://wa.me/${whatsappNumber}?text=${texto}`;
  window.open(url, '_blank');
  alert(`Olá ${nome}, você será redirecionado ao WhatsApp para finalizar o envio.`);
});