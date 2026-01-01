/* =========================================================
   PREMIUM UX ENHANCEMENTS (APPEND ONLY)
   ========================================================= */

/* CURRENT YEAR AUTO UPDATE */
document.querySelectorAll('[data-current-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

/* ACTIVE NAV LINK HIGHLIGHT */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

/* BUTTON RIPPLE EFFECT (SUBTLE) */
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    this.appendChild(ripple);

    const rect = this.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;

    setTimeout(() => ripple.remove(), 600);
  });
});

/* FADE PAGE ON LOAD */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

/* FORM SUCCESS MESSAGE (PROFESSIONAL) */
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', () => {
    const successMsg = document.createElement('div');
    successMsg.textContent = 'Thank you! We will contact you shortly.';
    successMsg.style.marginTop = '1rem';
    successMsg.style.padding = '0.8rem';
    successMsg.style.background = 'rgba(25, 135, 84, 0.15)';
    successMsg.style.borderLeft = '4px solid #198754';
    successMsg.style.borderRadius = '6px';
    successMsg.style.fontSize = '0.95rem';

    form.appendChild(successMsg);

    setTimeout(() => successMsg.remove(), 5000);
  });
});

/* PAYMENT COPY TO CLIPBOARD */
document.querySelectorAll('[data-copy]').forEach(el => {
  el.addEventListener('click', () => {
    navigator.clipboard.writeText(el.dataset.copy);
    alert('Payment detail copied successfully.');
  });
});

/* DELAYED ADSENSE LOAD (PERFORMANCE FRIENDLY) */
setTimeout(() => {
  document.querySelectorAll('.ad-slot').forEach(ad => {
    ad.classList.add('ad-loaded');
  });
}, 1200);

/* SIMPLE PAGE TRANSITION FOR INTERNAL LINKS */
document.querySelectorAll('a').forEach(link => {
  if (link.hostname === window.location.hostname) {
    link.addEventListener('click', e => {
      if (link.getAttribute('href').startsWith('#')) return;
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = link.href;
      }, 300);
    });
  }
});

