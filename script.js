// ===== MOBILE MENU TOGGLE =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');

mobileMenuBtn.addEventListener('click', () => {
  mainNav.classList.toggle('active');
});

// Close menu when clicking a link (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if(mainNav.classList.contains('active')) {
      mainNav.classList.remove('active');
    }
  });
});

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== SIMPLE CONTACT FORM VALIDATION =====
const contactForm = document.querySelector('.contact-form');
if(contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('input[name="name"]');
    const email = this.querySelector('input[name="email"]');
    const message = this.querySelector('textarea[name="message"]');
    let valid = true;

    [name, email, message].forEach(field => {
      field.style.borderColor = '#ddd';
      if(!field.value.trim()) {
        field.style.borderColor = 'red';
        valid = false;
      }
    });

    if(valid) {
      alert('Form submitted successfully!');
      this.reset();
    } else {
      alert('Please fill in all fields.');
    }
  });
}

// ===== ADD FADE-IN ANIMATION TO SECTIONS =====
const fadeInElements = document.querySelectorAll('.animate-in');
fadeInElements.forEach(el => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  observer.observe(el);
});