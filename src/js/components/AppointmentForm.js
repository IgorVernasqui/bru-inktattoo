/**
 * AppointmentForm.js
 * Controlador do Formulário de Agendamento (SRP / DIP).
 * Valida os 4 campos (Nome, E-mail, Celular, Resumo), aplica máscara e orquestra o envio via NotionService.
 */

import { FormValidator } from '../validators/formValidator.js';
import { Toast } from './Toast.js';

export class AppointmentForm {
  constructor({
    formSelector = '#appointmentForm',
    service,
    toast = Toast,
    validator = FormValidator
  } = {}) {
    this.form = document.querySelector(formSelector);
    this.service = service;
    this.toast = toast;
    this.validator = validator;

    this.fields = {
      nome: document.getElementById('nome'),
      email: document.getElementById('email'),
      celular: document.getElementById('celular'),
      resumo: document.getElementById('resumo')
    };

    this.submitBtn = this.form?.querySelector('#submitBtn');
    this.btnText = this.submitBtn?.querySelector('.btn-text');
    this.btnLoading = this.submitBtn?.querySelector('.btn-loading');

    if (this.form) {
      this.init();
    }
  }

  init() {
    this.bindMask();
    this.bindLiveValidation();
    this.bindSubmit();
  }

  bindMask() {
    if (this.fields.celular) {
      this.fields.celular.addEventListener('input', (e) => {
        e.target.value = this.validator.formatPhoneMask(e.target.value);
      });
    }
  }

  bindLiveValidation() {
    Object.entries(this.fields).forEach(([key, el]) => {
      if (!el) return;

      // Ao sair do campo
      el.addEventListener('blur', () => {
        this.validateField(key, true);
      });

      // Ao digitar
      el.addEventListener('input', () => {
        const group = el.closest('.form-group');
        if (group && group.classList.contains('has-error')) {
          this.validateField(key, false);
        }
      });
    });
  }

  validateField(key, showFeedback = true) {
    const el = this.fields[key];
    if (!el) return true;

    const group = el.closest('.form-group');
    const value = el.value.trim();
    let isValid = false;

    switch (key) {
      case 'nome':
        isValid = this.validator.validateRequired(value, 3);
        break;
      case 'email':
        isValid = this.validator.validateEmail(value);
        break;
      case 'celular':
        isValid = this.validator.validatePhone(value);
        break;
      case 'resumo':
        isValid = this.validator.validateRequired(value, 10);
        break;
      default:
        isValid = Boolean(value);
    }

    if (group) {
      if (isValid) {
        group.classList.remove('has-error');
        group.classList.add('is-valid');
      } else if (showFeedback) {
        group.classList.add('has-error');
        group.classList.remove('is-valid');
      }
    }

    return isValid;
  }

  validateAll() {
    let allValid = true;
    let firstInvalid = null;

    Object.keys(this.fields).forEach(key => {
      const isValid = this.validateField(key, true);
      if (!isValid) {
        allValid = false;
        if (!firstInvalid && this.fields[key]) {
          firstInvalid = this.fields[key];
        }
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      const group = firstInvalid.closest('.form-group');
      if (group) {
        group.animate([
          { transform: 'translateX(0)' },
          { transform: 'translateX(-6px)' },
          { transform: 'translateX(6px)' },
          { transform: 'translateX(-4px)' },
          { transform: 'translateX(4px)' },
          { transform: 'translateX(0)' }
        ], { duration: 350, easing: 'ease-in-out' });
      }
    }

    return allValid;
  }

  setLoading(isLoading) {
    if (!this.submitBtn) return;
    this.submitBtn.disabled = isLoading;

    if (this.btnText && this.btnLoading) {
      if (isLoading) {
        this.btnText.style.display = 'none';
        this.btnLoading.style.display = 'inline-flex';
      } else {
        this.btnText.style.display = 'inline-flex';
        this.btnLoading.style.display = 'none';
      }
    }
  }

  bindSubmit() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!this.validateAll()) {
        this.toast.showError('Por favor, preencha todos os campos obrigatórios corretamente antes de enviar.', 'Atenção');
        return;
      }

      const payload = {
        nome: this.validator.sanitizeInput(this.fields.nome.value),
        email: this.fields.email.value.trim(),
        celular: this.fields.celular.value.trim(),
        resumo: this.validator.sanitizeInput(this.fields.resumo.value)
      };

      this.setLoading(true);

      try {
        await this.service.createAppointment(payload);
        
        // Reset campos e feedback
        this.form.reset();
        Object.values(this.fields).forEach(el => {
          const group = el?.closest('.form-group');
          if (group) {
            group.classList.remove('is-valid', 'has-error');
          }
        });

        this.toast.showSuccess(
          'Sua solicitação foi enviada para o Notion! A tatuadora entrará em contato para alinhar os detalhes.',
          'Agendamento Solicitado!'
        );
      } catch (err) {
        console.error('[AppointmentForm Error]', err);
        this.toast.showError(
          err.message || 'Não foi possível enviar sua solicitação no momento. Por favor, tente novamente.',
          'Erro no Envio'
        );
      } finally {
        this.setLoading(false);
      }
    });
  }
}
