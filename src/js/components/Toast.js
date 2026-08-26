/**
 * Toast.js
 * Gerenciador de notificações flutuantes na interface (SRP).
 * Exibe banners de sucesso e erro com animação e acessibilidade.
 */

export class ToastNotifier {
  constructor() {
    this.container = null;
    this.initContainer();
  }

  initContainer() {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(container);
    }
    this.container = container;
  }

  /**
   * Exibe notificação de sucesso
   * @param {string} message
   * @param {string} [title='Solicitação Enviada!']
   * @param {number} [duration=6000]
   */
  showSuccess(message, title = 'Solicitação Enviada!', duration = 6000) {
    this._showToast({
      type: 'success',
      icon: '✓',
      title,
      message,
      duration
    });
  }

  /**
   * Exibe notificação de erro
   * @param {string} message
   * @param {string} [title='Ops! Algo deu errado']
   * @param {number} [duration=7000]
   */
  showError(message, title = 'Ops! Algo deu errado', duration = 7000) {
    this._showToast({
      type: 'error',
      icon: '✕',
      title,
      message,
      duration
    });
  }

  _showToast({ type, icon, title, message, duration }) {
    if (!this.container) this.initContainer();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');

    toast.innerHTML = `
      <div class="toast-icon" aria-hidden="true">${icon}</div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" type="button" aria-label="Fechar notificação">&times;</button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    const dismiss = () => {
      toast.classList.remove('toast-show');
      toast.classList.add('toast-hide');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    };

    closeBtn.addEventListener('click', dismiss);

    this.container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('toast-show');
    });

    if (duration > 0) {
      setTimeout(dismiss, duration);
    }
  }
}

export const Toast = new ToastNotifier();
