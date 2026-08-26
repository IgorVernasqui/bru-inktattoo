/**
 * formValidator.js
 * Módulo de validação pura e formatação de dados (SRP - Single Responsibility Principle).
 * Não acessa o DOM ou APIs externas diretamente.
 */

export const FormValidator = {
  // Regex compatível com RFC 5322 simplificado
  emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  /**
   * Valida endereço de e-mail
   * @param {string} email
   * @returns {boolean}
   */
  validateEmail(email) {
    if (!email || typeof email !== 'string') return false;
    return this.emailRegex.test(email.trim());
  },

  /**
   * Valida número de telefone/celular com DDD (10 ou 11 dígitos)
   * @param {string} phone
   * @returns {boolean}
   */
  validatePhone(phone) {
    if (!phone || typeof phone !== 'string') return false;
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10 || digits.length === 11;
  },

  /**
   * Aplica máscara de telefone progressiva no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
   * @param {string} value
   * @returns {string}
   */
  formatPhoneMask(value) {
    if (!value) return '';
    const digits = String(value).replace(/\D/g, '').slice(0, 11);
    if (digits.length === 0) return '';
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  },

  /**
   * Valida campo obrigatório de texto com comprimento mínimo
   * @param {string} text
   * @param {number} minLength
   * @returns {boolean}
   */
  validateRequired(text, minLength = 3) {
    if (typeof text !== 'string') return false;
    return text.trim().length >= minLength;
  },

  /**
   * Sanitiza strings contra Cross-Site Scripting (XSS)
   * @param {string} str
   * @returns {string}
   */
  sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
};
