/**
 * Carousel.js
 * Componente autônomo de Carrossel de Imagens com suporte a:
 * - Filtros por estilo
 * - Navegação por setas (Next/Prev) e Bullets
 * - Gestos Touch (Swipe) e Mouse Drag
 * - Acessibilidade por teclado (ArrowLeft, ArrowRight)
 * - Lightbox Modal integrado para zoom e inspeção da arte
 */

export class PortfolioCarousel {
  constructor({
    containerSelector = '#portfolioCarousel',
    lightboxSelector = '#lightboxModal'
  } = {}) {
    this.container = document.querySelector(containerSelector);
    this.lightbox = document.querySelector(lightboxSelector);

    // Dados das 13 imagens de alta resolução em Recursos/Fotos
    this.items = [
      { id: 1, file: 'Recursos/Fotos/imagem_portfolio_1.png', title: 'Composição Autoral', category: 'Autorais', style: 'Blackwork / Autoral' },
      { id: 2, file: 'Recursos/Fotos/imagem_portfolio_2.jpg', title: 'Old School Clássico', category: 'Old School', style: 'Old School' },
      { id: 3, file: 'Recursos/Fotos/imagem_portfolio_3.jpg', title: 'Fineline Botânico', category: 'Fineline', style: 'Fineline' },
      { id: 4, file: 'Recursos/Fotos/imagem_portfolio_4.jpg', title: 'Blackwork Detalhado', category: 'Blackwork', style: 'Blackwork' },
      { id: 5, file: 'Recursos/Fotos/imagem_portfolio_5.jpg', title: 'Arte Autoral Exclusiva', category: 'Autorais', style: 'Autoral' },
      { id: 6, file: 'Recursos/Fotos/imagem_portfolio_6.jpg', title: 'Old School Tradicional', category: 'Old School', style: 'Old School' },
      { id: 7, file: 'Recursos/Fotos/imagem_portfolio_7.jpg', title: 'Linhas Finas e Delicadas', category: 'Fineline', style: 'Fineline' },
      { id: 8, file: 'Recursos/Fotos/imagem_portfolio_8.jpg', title: 'Sombra e Textura Blackwork', category: 'Blackwork', style: 'Blackwork' },
      { id: 9, file: 'Recursos/Fotos/imagem_portfolio_9.jpg', title: 'Projeto Autoral na Pele', category: 'Autorais', style: 'Autoral' },
      { id: 10, file: 'Recursos/Fotos/imagem_portfolio_10.jpg', title: 'Old School Vanguard', category: 'Old School', style: 'Old School' },
      { id: 11, file: 'Recursos/Fotos/imagem_portfolio_11.jpg', title: 'Micro-detalhes Fineline', category: 'Fineline', style: 'Fineline' },
      { id: 12, file: 'Recursos/Fotos/imagem_portfolio_12.jpg', title: 'Contrastes em Blackwork', category: 'Blackwork', style: 'Blackwork' },
      { id: 13, file: 'Recursos/Fotos/imagem_portfolio_13.jpg', title: 'Ilustração Autoral', category: 'Autorais', style: 'Autoral' }
    ];

    this.filteredItems = [...this.items];
    this.currentIndex = 0;
    this.itemsPerPage = this.calculateItemsPerPage();

    // Touch / Drag state
    this.startX = 0;
    this.currentTranslate = 0;
    this.prevTranslate = 0;
    this.isDragging = false;

    if (this.container) {
      this.init();
    }
  }

  calculateItemsPerPage() {
    const width = window.innerWidth;
    if (width <= 600) return 1;
    if (width <= 992) return 2;
    return 3;
  }

  init() {
    this.renderSkeleton();
    this.renderSlides();
    this.bindEvents();
    this.initLightbox();
  }

  renderSkeleton() {
    this.container.innerHTML = `
      <div class="carousel-wrapper" tabindex="0" aria-label="Galeria de Portfólio" role="region">
        <div class="carousel-filters" role="tablist">
          <button class="filter-btn active" data-category="Todos" role="tab" aria-selected="true">Todos</button>
          <button class="filter-btn" data-category="Old School" role="tab" aria-selected="false">Old School</button>
          <button class="filter-btn" data-category="Blackwork" role="tab" aria-selected="false">Blackwork</button>
          <button class="filter-btn" data-category="Fineline" role="tab" aria-selected="false">Fineline</button>
          <button class="filter-btn" data-category="Autorais" role="tab" aria-selected="false">Autorais</button>
        </div>

        <div class="carousel-viewport">
          <div class="carousel-track" id="carouselTrack" aria-live="polite"></div>
        </div>

        <div class="carousel-controls">
          <button class="carousel-arrow carousel-arrow-prev" id="carouselPrevBtn" aria-label="Imagem Anterior">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div class="carousel-bullets" id="carouselBullets" role="tablist" aria-label="Indicadores de slide"></div>

          <span class="carousel-counter" id="carouselCounter">01 / ${String(this.items.length).padStart(2, '0')}</span>

          <button class="carousel-arrow carousel-arrow-next" id="carouselNextBtn" aria-label="Próxima Imagem">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    `;

    this.track = this.container.querySelector('#carouselTrack');
    this.prevBtn = this.container.querySelector('#carouselPrevBtn');
    this.nextBtn = this.container.querySelector('#carouselNextBtn');
    this.bulletsContainer = this.container.querySelector('#carouselBullets');
    this.counter = this.container.querySelector('#carouselCounter');
  }

  renderSlides() {
    this.track.innerHTML = this.filteredItems.map((item, idx) => `
      <article class="carousel-card" data-index="${idx}" data-category="${item.category}">
        <img 
          src="${item.file}" 
          alt="${item.title} — ${item.style}" 
          class="carousel-card-img" 
          loading="lazy"
        />
        <div class="carousel-card-overlay">
          <span class="carousel-card-tag">${item.style}</span>
          <h3 class="carousel-card-title">${item.title}</h3>
          <button class="carousel-card-btn" data-lightbox-trigger="${idx}" aria-label="Ampliar ${item.title}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            Ampliar Arte
          </button>
        </div>
      </article>
    `).join('');

    this.renderBullets();
    this.updatePosition();
  }

  renderBullets() {
    const maxIndex = Math.max(0, this.filteredItems.length - this.itemsPerPage);
    const numBullets = Math.min(this.filteredItems.length, maxIndex + 1);

    this.bulletsContainer.innerHTML = '';
    for (let i = 0; i < numBullets; i++) {
      const bullet = document.createElement('button');
      bullet.className = `carousel-bullet ${i === this.currentIndex ? 'active' : ''}`;
      bullet.setAttribute('aria-label', `Ir para slide ${i + 1}`);
      bullet.addEventListener('click', () => this.goToSlide(i));
      this.bulletsContainer.appendChild(bullet);
    }
  }

  bindEvents() {
    // Resize recalculation
    window.addEventListener('resize', () => {
      const newItemsPerPage = this.calculateItemsPerPage();
      if (newItemsPerPage !== this.itemsPerPage) {
        this.itemsPerPage = newItemsPerPage;
        this.currentIndex = Math.min(this.currentIndex, Math.max(0, this.filteredItems.length - this.itemsPerPage));
        this.renderBullets();
        this.updatePosition();
      }
    });

    // Prev / Next Buttons
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());

    // Filters
    const filterBtns = this.container.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const category = btn.getAttribute('data-category');
        this.filterCategory(category);
      });
    });

    // Keyboard navigation
    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });

    // Touch & Drag Support
    this.track.addEventListener('touchstart', (e) => this.touchStart(e), { passive: true });
    this.track.addEventListener('touchmove', (e) => this.touchMove(e), { passive: true });
    this.track.addEventListener('touchend', () => this.touchEnd());

    this.track.addEventListener('mousedown', (e) => this.dragStart(e));
    this.track.addEventListener('mousemove', (e) => this.dragMove(e));
    this.track.addEventListener('mouseup', () => this.dragEnd());
    this.track.addEventListener('mouseleave', () => this.dragEnd());

    // Lightbox triggers on cards
    this.track.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-lightbox-trigger]');
      if (trigger) {
        const idx = parseInt(trigger.getAttribute('data-lightbox-trigger'), 10);
        this.openLightbox(idx);
      }
    });
  }

  filterCategory(category) {
    if (category === 'Todos') {
      this.filteredItems = [...this.items];
    } else {
      this.filteredItems = this.items.filter(item => item.category === category);
    }
    this.currentIndex = 0;
    this.renderSlides();
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updatePosition();
    } else {
      // Loop to end
      const maxIndex = Math.max(0, this.filteredItems.length - this.itemsPerPage);
      this.currentIndex = maxIndex;
      this.updatePosition();
    }
  }

  nextSlide() {
    const maxIndex = Math.max(0, this.filteredItems.length - this.itemsPerPage);
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.updatePosition();
    } else {
      // Loop to beginning
      this.currentIndex = 0;
      this.updatePosition();
    }
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updatePosition();
  }

  updatePosition() {
    if (!this.track) return;
    const cards = this.track.querySelectorAll('.carousel-card');
    if (!cards.length) return;

    const gap = 24;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const offset = this.currentIndex * (cardWidth + gap);

    this.track.style.transform = `translateX(-${offset}px)`;

    // Update Bullets
    const bullets = this.bulletsContainer.querySelectorAll('.carousel-bullet');
    bullets.forEach((b, i) => {
      if (i === this.currentIndex) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Update Counter
    if (this.counter) {
      const current = String(this.currentIndex + 1).padStart(2, '0');
      const total = String(this.filteredItems.length).padStart(2, '0');
      this.counter.textContent = `${current} / ${total}`;
    }
  }

  // ── Touch & Drag Handlers ──
  touchStart(e) {
    this.startX = e.touches[0].clientX;
    this.isDragging = true;
  }

  touchMove(e) {
    if (!this.isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - this.startX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.prevSlide();
      } else {
        this.nextSlide();
      }
      this.isDragging = false;
    }
  }

  touchEnd() {
    this.isDragging = false;
  }

  dragStart(e) {
    this.startX = e.clientX;
    this.isDragging = true;
    this.track.classList.add('is-dragging');
  }

  dragMove(e) {
    if (!this.isDragging) return;
    const diff = e.clientX - this.startX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) {
        this.prevSlide();
      } else {
        this.nextSlide();
      }
      this.isDragging = false;
      this.track.classList.remove('is-dragging');
    }
  }

  dragEnd() {
    this.isDragging = false;
    this.track.classList.remove('is-dragging');
  }

  // ── Lightbox Modal ──
  initLightbox() {
    if (!this.lightbox) {
      this.lightbox = document.createElement('div');
      this.lightbox.id = 'lightboxModal';
      this.lightbox.className = 'lightbox-modal';
      this.lightbox.setAttribute('role', 'dialog');
      this.lightbox.setAttribute('aria-modal', 'true');
      this.lightbox.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close" aria-label="Fechar">&times;</button>
          <img src="" alt="" class="lightbox-img" id="lightboxImg" />
          <div class="lightbox-caption" id="lightboxCaption"></div>
        </div>
      `;
      document.body.appendChild(this.lightbox);
    }

    const closeBtn = this.lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => this.closeLightbox());

    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.lightbox.classList.contains('is-open')) {
        this.closeLightbox();
      }
    });
  }

  openLightbox(index) {
    const item = this.filteredItems[index];
    if (!item) return;

    const img = this.lightbox.querySelector('#lightboxImg');
    const caption = this.lightbox.querySelector('#lightboxCaption');

    img.src = item.file;
    img.alt = `${item.title} — ${item.style}`;
    caption.textContent = `${item.title} (${item.style})`;

    this.lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    if (!this.lightbox) return;
    this.lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}
