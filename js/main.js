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

function initscrollReveal () {
  const items = document.querySelectorAll(".reveal");
  if(!items.length) return ;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) =>{
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {threshold: 0.15, rootMargin:"0px 0px -60px 0px"}
  );
  items.forEach((item) => observer.observe(item));

}
initscrollReveal ();

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
