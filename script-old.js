// Main interaction scripts
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
      activateHeroSlide((activeHeroIndex + 1) % heroSlides.length);
    }, 5000);
  }

  // Placement counters animation
  const counters = document.querySelectorAll(".counter");
  const placementSection = document.getElementById("placements");
  let countersStarted = false;

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = Number(counter.dataset.target);
      let current = 0;
      const duration = 1400;
      const stepDelay = Math.max(18, Math.floor(duration / target));
      const timer = setInterval(() => {
        current += 1;
        counter.textContent = String(current);
        if (current >= target) {
          clearInterval(timer);
          counter.textContent = String(target);
        }
      }, stepDelay);
    });
  };

  const placementObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          animateCounters();
          placementObserver.unobserve(placementSection);
        }
      });
    },
    { threshold: 0.35 }
  );
  if (placementSection && counters.length) placementObserver.observe(placementSection);

  // Testimonials slider
  const testimonials = Array.from(document.querySelectorAll(".testimonial"));
  let activeTestimonialIndex = 0;
  if (testimonials.length > 1) {
    setInterval(() => {
      testimonials[activeTestimonialIndex].classList.remove("active");
      activeTestimonialIndex = (activeTestimonialIndex + 1) % testimonials.length;
      testimonials[activeTestimonialIndex].classList.add("active");
    }, 4200);
  }

  // Back to top behavior
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 420) backToTop.classList.add("show");
      else backToTop.classList.remove("show");
    });
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Contact form validation
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name || !email || !message) {
        formMessage.textContent = "Please fill in all required fields.";
        formMessage.style.color = "#b11a2c";
        return;
      }
      if (!emailPattern.test(email)) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.style.color = "#b11a2c";
        return;
      }
      formMessage.textContent = "Thank you. Your message has been submitted successfully.";
      formMessage.style.color = "#0f7a4f";
      contactForm.reset();
    });
  }

  // Scroll reveal animation
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    }, { threshold: 0.15 });
    reveals.forEach((el) => revealObserver.observe(el));
  }
});
