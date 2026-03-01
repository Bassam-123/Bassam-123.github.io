document.addEventListener('DOMContentLoaded', () => {
  // Typed subtitle
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    const txt = typedEl.textContent.trim();
    typedEl.textContent = '';
    let i = 0;
    const speed = 40;
    const typer = setInterval(() => {
      typedEl.textContent += txt.charAt(i);
      i++;
      if (i > txt.length - 1) clearInterval(typer);
    }, speed);
  }

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => navList.classList.toggle('open'));
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navList && navList.classList.contains('open')) navList.classList.remove('open');
      }
    });
  });

  // Scroll reveal using IntersectionObserver
  const revealable = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window && revealable.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealable.forEach(el => io.observe(el));
  } else {
    // fallback: reveal all
    revealable.forEach(el => el.classList.add('reveal'));
  }

  // small accessibility: close nav on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList && navList.classList.contains('open')) navList.classList.remove('open');
  });
});
