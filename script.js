/* =========================================================
   BROWNS KNOWLEDGE HUB – GLOBAL ENHANCEMENTS & UX (REFINED)
========================================================= */

/* --------------------------
   CACHE COMMON ELEMENTS
-------------------------- */
const backToTop = document.getElementById('backToTop');
const mobileBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
const params = new URLSearchParams(window.location.search);

/* --------------------------
   SCROLL HANDLER (MERGED & OPTIMIZED)
-------------------------- */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  /* Back to top */
  if (backToTop) {
    backToTop.style.display = scrollY > 300 ? 'flex' : 'none';
  }

  /* Active nav link */
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${id}`
        );
      });
    }
  });
});

/* Back to top click */
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* --------------------------
   MOBILE MENU TOGGLE
-------------------------- */
if (mobileBtn && nav) {
  mobileBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileBtn.setAttribute(
      'aria-expanded',
      nav.classList.contains('active')
    );
  });
}

/* --------------------------
   BUTTON RIPPLE EFFECT
-------------------------- */
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('click', e => {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const rect = btn.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;

    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* --------------------------
   CONTACT FORM FEEDBACK
-------------------------- */
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const msg = document.createElement('div');
    msg.className = 'form-success-message';
    msg.innerHTML = `<strong>✔ Thank you!</strong> We will contact you shortly.`;

    form.appendChild(msg);
    setTimeout(() => msg.remove(), 5000);
    form.reset();
  });
});

/* --------------------------
   COPY TO CLIPBOARD
-------------------------- */
document.querySelectorAll('[data-copy]').forEach(el => {
  el.addEventListener('click', () => {
    navigator.clipboard
      .writeText(el.dataset.copy)
      .then(() => alert('Payment detail copied successfully.'))
      .catch(() => alert('Unable to copy, please try manually.'));
  });
});

/* --------------------------
   AUTO UPDATE YEAR
-------------------------- */
document.querySelectorAll('[data-current-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

/* --------------------------
   DELAYED ADS LOAD
-------------------------- */
setTimeout(() => {
  document.querySelectorAll('.ad-slot').forEach(ad => {
    ad.classList.add('ad-loaded');
  });
}, 1200);

/* --------------------------
   SMOOTH PAGE TRANSITION
-------------------------- */
document.querySelectorAll('a').forEach(link => {
  if (link.hostname === location.hostname && !link.hash) {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => (location.href = link.href), 300);
    });
  }
});

/* --------------------------
   FADE-IN ON SCROLL
-------------------------- */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

/* --------------------------
   AUTO-FILL FROM URL
-------------------------- */
const service = params.get('service');
const product = params.get('product');

if (service) {
  const field = document.querySelector(
    'input[name="service"], textarea[name="message"], #messageContent'
  );
  if (field) field.value = `Selected Package: ${service}`;
}

if (product && document.getElementById('messageContent')) {
  document.getElementById('messageContent').value =
    `I want to unlock the premium material: ${product}`;
}

/* --------------------------
   PREMIUM DOWNLOAD LOGIC
-------------------------- */
function unlockPremiumItem(itemId) {
  const btn = document.getElementById(itemId);
  if (btn) {
    btn.textContent = '✅ Download Now';
    btn.classList.remove('locked-btn');
    btn.onclick = () => {
      window.location.href = `/downloads/${itemId}.pdf`;
    };
  }
}

function onPaymentSuccess(itemId) {
  unlockPremiumItem(itemId);
  alert('Payment confirmed! Your content is unlocked.');
}

/* --------------------------
   PREMIUM GATE REDIRECT
-------------------------- */
document.querySelectorAll('.locked-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = `inquiry.html?product=${btn.dataset.premium}`;
  });
});

/* --------------------------
   SUBSCRIPTION CTA
-------------------------- */
document.querySelectorAll('.subscribe-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert(
      "To activate your 3-month subscription:\n\n" +
      "1️⃣ Pay via Airtel / TNM / PayPal\n" +
      "2️⃣ Send proof on WhatsApp\n" +
      "3️⃣ Access activated within minutes"
    );

    window.open(
      "https://wa.me/265993812391?text=I want to subscribe for 3-month MSCE premium access",
      "_blank"
    );
  });
});

/* --------------------------
   BASIC TRACKING (SAFE)
-------------------------- */
function trackEvent(eventName, details = {}) {
  console.log('TRACK EVENT:', eventName, details);
}

document.querySelectorAll('[data-track]').forEach(btn => {
  btn.addEventListener('click', () => {
    trackEvent('pricing_click', { service: btn.dataset.track });
    if (typeof gtag === 'function') {
      gtag('event', 'pricing_click', {
        event_category: 'MSCE Packages',
        event_label: btn.dataset.track,
        value: 1
      });
    }
  });
});

/* --------------------------
   PAGE LOAD FADE-IN
-------------------------- */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.6s ease';
    document.body.style.opacity = '1';
  }, 100);
});