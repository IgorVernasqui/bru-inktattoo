/**
 * app.js
 * Ponto de entrada (Bootstrap) da aplicação.
 * Realiza a injeção de dependências e inicialização dos componentes desacoplados.
 */

import { Navigation } from './components/Navigation.js';
import { PortfolioCarousel } from './components/Carousel.js';
import { ContentLoader } from './services/contentLoader.js';
import { NotionService } from './services/notionService.js';
import { AppointmentForm } from './components/AppointmentForm.js';
import { Toast } from './components/Toast.js';

class App {
  static init() {
    console.log('✨ Inicializando Estúdio de Tatuagem — Bru Inktattoo');

    // 1. Inicializa Navegação e ScrollSpy
    const navigation = new Navigation({
      navbarSelector: '#navbar',
      navLinksSelector: '.nav-link',
      toggleBtnSelector: '#navToggleBtn',
      sectionsSelector: 'section[id]',
      offset: 80
    });

    // 2. Carrega Conteúdos Dinâmicos de Recursos/conteudo.txt
    const contentLoader = new ContentLoader({
      contentPath: 'Recursos/conteudo.txt'
    });
    contentLoader.loadAndPopulate();

    // 3. Inicializa Carrossel Interativo com as 13 imagens
    const carousel = new PortfolioCarousel({
      containerSelector: '#portfolioCarousel',
      lightboxSelector: '#lightboxModal'
    });

    // 4. Configura Serviço do Notion e Formulário de Agendamento (DIP)
    const notionService = new NotionService({
      endpoint: '/agendar'
    });

    const appointmentForm = new AppointmentForm({
      formSelector: '#appointmentForm',
      service: notionService,
      toast: Toast
    });

    // 5. Configura Animações de Entrada (Scroll Reveal)
    this.initScrollReveal();

    // 6. Configura efeito de Parallax no Hero
    this.initHeroParallax();

    // 7. Configura Player e Alternância de Vídeos do Studio
    this.initStudioVideo();
  }

  static initStudioVideo() {
    const video = document.getElementById('studioVideo');
    const buttons = document.querySelectorAll('.video-tab-btn');
    if (!video || !buttons.length) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const src = btn.getAttribute('data-video');
        if (!src) return;

        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        video.src = src;
        video.load();
        video.play().catch(() => {});
      });
    });
  }

  static initScrollReveal() {
    const revealElements = document.querySelectorAll(
      '.section-header, .bio-grid, .studio-grid, .dica-card, .tattoo-concept-card, .cuidado-step-card, .parceiro-card, .booking-form-card'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      el.classList.add('reveal-init');
      observer.observe(el);
    });
  }

  static initHeroParallax() {
    const heroBg = document.querySelector('.hero-bg-layer');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `scale(1.02) translateY(${scrollY * 0.25}px)`;
      }
    }, { passive: true });
  }
}

// Inicialização segura após o carregamento do DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
