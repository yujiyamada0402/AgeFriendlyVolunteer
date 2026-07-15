// Small visual enhancements: sticky-header shadow + scroll-reveal.
// Purely cosmetic — the site works fully without JavaScript.

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.querySelectorAll("[data-copy-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = document.getElementById(btn.dataset.copyTarget);
      if (!src) return;
      navigator.clipboard.writeText(src.innerText).then(() => {
        const label = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => { btn.textContent = label; }, 1600);
      });
    });
  });

  const targets = document.querySelectorAll(
    ".steps li, .module-card, .checklist li, .callout, table.plain, .hero-stats span"
  );
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(i % 6, 4) * 60}ms`;
    observer.observe(el);
  });
});
