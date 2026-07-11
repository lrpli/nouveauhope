(function () {
  function initNav() {
    var navs = document.querySelectorAll('.navbar');
    navs.forEach(function (nav, idx) {
      var toggle = nav.querySelector('.nav-toggle');
      var menu = nav.querySelector('.nav-links');
      if (!toggle || !menu) return;

      if (!menu.id) {
        menu.id = idx === 0 ? 'primary-nav' : 'primary-nav-' + idx;
      }
      toggle.setAttribute('aria-controls', menu.id);
      if (!toggle.hasAttribute('aria-expanded')) {
        toggle.setAttribute('aria-expanded', 'false');
      }

      toggle.addEventListener('click', function () {
        var isOpen = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
      });

      menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          menu.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          menu.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  function initFadeIn() {
    var items = document.querySelectorAll('.fade-in');
    if (!items.length) return;

    var prefersReduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initContactForm() {
    var form = document.querySelector('[data-contact-form]');
    var success = document.getElementById('form-success');
    if (!form || !success) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      success.style.display = 'block';
      form.style.display = 'none';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initFadeIn();
    initContactForm();
  });
})();
