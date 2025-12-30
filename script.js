/* =========================================================
   SAFE QUERY HELPER
   ========================================================= */
function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return document.querySelectorAll(selector);
}

/* =========================================================
   MOBILE MENU TOGGLE
   ========================================================= */
const mobileMenuBtn = $('.mobile-menu-btn');
const mainNav = $('.main-nav');

if (mobileMenuBtn && mainNav) {
  mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });

  // Close menu when clicking a link (mobile)
  $all('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
    });
  });
}

/* =========================================================
   BACK TO TOP BUTTON
   ========================================================= */
const backToTopBtn = $('.back-to-top');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =========================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ========================================================= */
$all('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = $(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* =========================================================
   CONTACT FORM VALIDATION (BASIC)
   ========================================================= */
const contactForm = $('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const fields = this.querySelectorAll('input, textarea');
    let valid = true;

    fields.forEach(field => {
      field.style.borderColor = '#ddd';
      if (!field.value.trim()) {
        field.style.borderColor = 'red';
        valid = false;
      }
    });

    if (valid) {
      alert('Form submitted successfully!');
      this.reset();
    } else {
      alert('Please fill in all required fields.');
    }
  });
}

/* =========================================================
   FADE-IN ANIMATION ON SCROLL
   ========================================================= */
const fadeInElements = $all('.animate-in');

if (fadeInElements.length > 0) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeInElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
  });
}

/* =========================================================
   DISCLAIMER TOGGLE (EXPAND / COLLAPSE)
   ========================================================= */
const disclaimerToggle = $('.disclaimer-toggle');
const disclaimerContent = $('.disclaimer-content');

if (disclaimerToggle && disclaimerContent) {
  disclaimerToggle.addEventListener('click', () => {
    const isVisible = disclaimerContent.style.display === 'block';

    disclaimerContent.style.display = isVisible ? 'none' : 'block';
    disclaimerToggle.textContent = isVisible ? 'Disclaimer' : 'Hide Disclaimer';
  });
}

/* =========================================================
   PRICING TOGGLE (EXPAND / COLLAPSE)
   ========================================================= */
const pricingToggle = $('.pricing-toggle');
const pricingContainer = $('.pricing-container');

if (pricingToggle && pricingContainer) {
  pricingToggle.addEventListener('click', () => {
    const isVisible = pricingContainer.style.display === 'block';

    pricingContainer.style.display = isVisible ? 'none' : 'block';
    pricingToggle.textContent = isVisible
      ? 'View Indicative Pricing'
      : 'Hide Pricing';
  });
}