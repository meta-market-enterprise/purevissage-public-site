(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll('.intro-grid, .section-heading, .activity-card, .signature-inner, .details-grid, .contact-grid');
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('motion-in');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -20px 0px' });
  targets.forEach((target) => observer.observe(target));

  const header = document.querySelector('.site-header');
  if (header) {
    let scheduled = false;
    window.addEventListener('scroll', () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
        scheduled = false;
      });
    }, { passive: true });
  }
})();
