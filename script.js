// Enhanced interaction scripts
window.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("show"));
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("show"));
  });

  // Popup announcement controls
  const modal = document.getElementById("announcementModal");
  const closeModalBtn = document.getElementById("closeAnnouncement");
  const announcementAction = document.getElementById("announcementAction");
  if (modal && closeModalBtn && announcementAction) {
    setTimeout(() => modal.classList.add("show"), 450);
    const closeModal = () => modal.classList.remove("show");
    closeModalBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
    announcementAction.addEventListener("click", () => {
      closeModal();
      const admission = document.getElementById("admission");
      if (admission) admission.scrollIntoView({ behavior: "smooth" });
      else window.location.href = "admission.html";
    });
  }

  // Hero slider and dot controls
  const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
  const heroDotsWrap = document.getElementById("heroDots");
  let activeHeroIndex = 0;
  if (heroSlides.length && heroDotsWrap) {
    heroSlides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", `Hero slide ${index + 1}`);
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => activateHeroSlide(index));
      heroDotsWrap.appendChild(dot);
    });
    const heroDots = Array.from(heroDotsWrap.querySelectorAll("button"));
    function activateHeroSlide(nextIndex) {
      heroSlides[activeHeroIndex].classList.remove("active");
      heroDots[activeHeroIndex].classList.remove("active");
      activeHeroIndex = nextIndex;
      heroSlides[activeHeroIndex].classList.add("active");
      heroDots[activeHeroIndex].classList.add("active");
    }
    setInterval(() => {
      const nextIndex = (activeHeroIndex + 1) % heroSlides.length;
      activateHeroSlide(nextIndex);
    }, 5000);
  }

  // Testimonial slider
  const testimonials = Array.from(document.querySelectorAll(".testimonial"));
  let activeTestimonialIndex = 0;
  if (testimonials.length) {
    function activateTestimonial(nextIndex) {
      testimonials[activeTestimonialIndex].classList.remove("active");
      activeTestimonialIndex = nextIndex;
      testimonials[activeTestimonialIndex].classList.add("active");
    }
    setInterval(() => {
      const nextIndex = (activeTestimonialIndex + 1) % testimonials.length;
      activateTestimonial(nextIndex);
    }, 4000);
  }

  // Counter animation
  const counters = Array.from(document.querySelectorAll(".counter"));
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const increment = target / 100;
    let current = 0;
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    updateCounter();
  };

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        
        // Animate counters when visible
        const counters = entry.target.querySelectorAll(".counter");
        counters.forEach(counter => {
          if (!counter.classList.contains("animated")) {
            animateCounter(counter);
            counter.classList.add("animated");
          }
        });
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Back to top button
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Contact form validation
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Basic validation
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();
      
      if (!name || !email || !subject || !message) {
        formMessage.textContent = "Please fill in all required fields.";
        formMessage.style.color = "var(--red)";
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.style.color = "var(--red)";
        return;
      }
      
      // Simulate form submission
      formMessage.textContent = "Sending message...";
      formMessage.style.color = "var(--blue)";
      
      setTimeout(() => {
        formMessage.textContent = "Message sent successfully! We'll get back to you soon.";
        formMessage.style.color = "var(--blue-soft)";
        contactForm.reset();
      }, 1500);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add hover effects to cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) rotateX(2deg)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0)';
    });
  });

  // Parallax effect for hero sections
  const pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = pageHero.style.backgroundPositionY || '50%';
      const speed = 0.5;
      pageHero.style.backgroundPositionY = `${50 + (scrolled * speed)}%`;
    });
  }

  // Add loading animation for images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '0';
      setTimeout(() => {
        img.style.transition = 'opacity 0.5s ease';
        img.style.opacity = '1';
      }, 100);
    });
  });

  // Enhanced dropdown menus
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    let timeout;
    
    dropdown.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
      const menu = dropdown.querySelector('.dropdown-menu');
      if (menu) {
        menu.style.opacity = '1';
        menu.style.pointerEvents = 'auto';
        menu.style.transform = 'translateY(0)';
      }
    });
    
    dropdown.addEventListener('mouseleave', () => {
      const menu = dropdown.querySelector('.dropdown-menu');
      if (menu) {
        timeout = setTimeout(() => {
          menu.style.opacity = '0';
          menu.style.pointerEvents = 'none';
          menu.style.transform = 'translateY(-10px)';
        }, 200);
      }
    });
  });

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close modal if open
      if (modal && modal.classList.contains('show')) {
        modal.classList.remove('show');
      }
      // Close mobile menu if open
      if (navLinks && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
      }
    }
  });

  // Add print styles
  window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
  });
  
  window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
  });

  // Performance optimization - lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Add touch support for mobile
  if ('ontouchstart' in window) {
    document.body.classList.add('touch');
  }

  // Console welcome message
  console.log('%c🎓 Welcome to BMS College of Engineering Website!', 'color: var(--blue); font-size: 16px; font-weight: bold;');
  console.log('%cBuilt with ❤️ for academic excellence', 'color: var(--red); font-size: 12px;');
});
