/**
 * Navigation.js
 * Gerenciador de navegação, menu mobile e scrollspy (SRP).
 */

export class Navigation {
  constructor({
    navbarSelector = '#navbar',
    navLinksSelector = '.nav-link',
    toggleBtnSelector = '#navToggleBtn',
    sectionsSelector = 'section[id]',
    offset = 80
  } = {}) {
    this.navbar = document.querySelector(navbarSelector);
    this.navLinks = document.querySelectorAll(navLinksSelector);
    this.toggleBtn = document.querySelector(toggleBtnSelector);
    this.sections = document.querySelectorAll(sectionsSelector);
    this.offset = offset;

    this.init();
  }

  init() {
    this.bindScrollEffects();
    this.bindSmoothScroll();
    this.bindMobileMenu();
    this.bindScrollSpy();
  }

  bindScrollEffects() {
    if (!this.navbar) return;
    const handleScroll = () => {
      if (window.scrollY > 40) {
        this.navbar.classList.add('is-scrolled');
      } else {
        this.navbar.classList.remove('is-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  bindSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#' || !targetId) return;

        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;

        e.preventDefault();
        this.closeMobileMenu();

        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - this.offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    });
  }

  bindMobileMenu() {
    if (!this.toggleBtn || !this.navbar) return;

    this.toggleBtn.addEventListener('click', () => {
      const isOpen = this.navbar.classList.toggle('is-open');
      this.toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.navbar.classList.contains('is-open')) {
        this.closeMobileMenu();
      }
    });
  }

  closeMobileMenu() {
    if (this.navbar && this.navbar.classList.contains('is-open')) {
      this.navbar.classList.remove('is-open');
      if (this.toggleBtn) {
        this.toggleBtn.setAttribute('aria-expanded', 'false');
      }
    }
  }

  bindScrollSpy() {
    if (!this.sections.length || !this.navLinks.length) return;

    const observerOptions = {
      root: null,
      rootMargin: `-${this.offset}px 0px -50% 0px`,
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          this.navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    }, observerOptions);

    this.sections.forEach(section => observer.observe(section));
  }
}
