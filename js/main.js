// dark mode 
const toggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
} else {
  document.documentElement.setAttribute('data-theme', 'light');
}
toggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');

  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});
// navbar ombre au scroll + menu hamburger(nabar-toggoler) mobile
function initNavnar() {
  const navbar = document.querySelector(".navbar");
  const navbarToggoler = document.querySelector(" .navbar-toggoler");
  const navLinks = document.querySelector(".nav-link");
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 80);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (navbarToggoler && navLinks) {
    navbarToggoler.addEventListener("click", () => {
      navbarToggoler.classList.toggle("open")
      navLinks.classList.toggle("open")
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navbarToggoler.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });


  }

}
initNavnar();

// navbar dynamique au scroll
const navbar = document.querySelector(".navbar")

const backToTopBtn = document.getElementById("backtotop")
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Apparaît après 300px de scroll
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});
//action de retour 
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
// compte à rebours temps réel - jusqu'a la date fictive de la conférence

function initCount() {
  const el = document.querySelector("[data-count]");
  if (!el) return;

  const targetDate = new Date("2026-12-12T09:00:00");
  const dayEl = el.querySelector('[data-cd="days"]');
  const hourEl = el.querySelector('[data-cd="hours"]');
  const minEl = el.querySelector('[data-cd="minutes"]');
  const secEl = el.querySelector('[data-cd="seconds"]');

  function pad(n) {
    return String(n).padStart(2, "0")
  }
  function tick() {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) {
      [dayEl, hourEl, minEl, secEl].forEach((n) => n && (n.textContent = "00"));
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (dayEl) dayEl.textContent = pad(days);
    if (hourEl) hourEl.textContent = pad(hours);
    if (minEl) minEl.textContent = pad(minutes);
    if (secEl) secEl.textContent = pad(seconds);
  }
  tick();
  setInterval(tick, 1000);

}
initCount();
// compteurs animé - chiffres clés qui s'incrémentent au scroll

function initCounters() {
  const counters = document.querySelectorAll("[data-count-to]");
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.getAttribute("data-count-to"), 10);
    const duration = 1600;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * target).toLocaleString("fr-FR");
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString("fr-FR");
    }
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => observer.observe(c));
}
initCounters();
// animations au scroll - intersectionobserver
function initscrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  items.forEach((item) => observer.observe(item));

}
initscrollReveal();

// tableau de programme
const tabs = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    // Retirer active de tous les boutons
    tabs.forEach(btn => btn.classList.remove("active"));

    // Retirer active de tous les tableaux
    panels.forEach(panel => panel.classList.remove("active"));

    // Ajouter active au bouton cliqué
    tab.classList.add("active");

    // Ajouter active au tableau correspondant
    const target = document.getElementById(tab.dataset.tabTarget);
    target.classList.add("active");
  });
});

// Flitre 

function iniInterFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll("[data-speaker-topic]");
  if (!filterButtons.length) return;
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const topic = btn.getAttribute("data-filter");
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      cards.forEach((card) => {
        const matches = topic === "tous" || card.getAttribute("data-speaker-topic") === topic;
        card.classList.toggle("hidden-card", !matches)
      });
    });
  });
}
iniInterFilters();

// validation
function initFormValidation() {
  const form = document.querySelector("#registration-form");
  if (!form) return;
  const successBox = document.querySelector(".form-success");
  const validators = {
    nom: (v) => v.trim().length >= 3 || "Merci d indiquer votre nom complet (3 caractère minimun).",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Merci d'indiquer une adresse e-mail valide.",
    phone: (v) => v.replace(/\D/g, "").length >= 9 || "Le numéro doit contenir au moins 9 chiffres.",
    participation: (v) => v !== "" || "Merci de choisir un type de participation.",
    pays: (v) => v !== "" || "Merci de choisir votre pays.",
    message: (v) => v.trim().length >= 20 || "Votre message doit contenir au moins 20 caractères.",
  };
  function showFieldState(field, ok, message) {
    const group = field.closest(".form-group");
    const errorEl = group.querySelector(".field-error");
    group.classList.toggle("error", !ok);
    group.classList.toggle("valid", ok);
    if (errorEl) errorEl.textContent = ok ? "" : message;
  }
  function validateField(field) {
    const validator = validators[field.name];
    if (!validator) return true;
    const result = validator(field.value);
    const ok = result === true;
    showFieldState(field, ok, ok ? "" : result);
    return ok;
  }
  Object.keys(validators).forEach((name) => {
    const field = form.elements.namedItem(name);
    if (field) {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.closest(".form-group").classList.contains("error"))
          validateField(field);
      });
    }
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let allValid = true;

    Object.keys(validators).forEach((name) => {
      const field = form.elements.namedItem(name);
      if (field && !validateField(field)) allValid = false;
    });

    if (!allValid) {
      const firstError = form.querySelector(".form-group.error input, .form-group.error select, .form-group.error textarea");
      if (firstError) firstError.focus();
      return;
    }

    // Succès : message visuel + réinitialisation
    if (successBox) {
      successBox.classList.add("show");
      successBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    form.reset();
    form.querySelectorAll(".form-group").forEach((g) => g.classList.remove("valid", "error"));

    setTimeout(() => successBox && successBox.classList.remove("show"), 6000);
  });
}
initFormValidation();
// année dynamique dans le footer
const year = new Date().getFullYear();
document.getElementById("copyright").textContent =
  "&copy;" + year + "  AfriConnect Summit  . Tous droits reserves."