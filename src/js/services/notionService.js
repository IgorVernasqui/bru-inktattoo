/**
 * notionService.js
 * Adaptador de serviço para envio e integração com Notion (DIP/LSP).
 * Encapsula a comunicação HTTP com o backend Node.js / Notion MCP.
 */

export class NotionService {
  constructor({
    endpoint = '/agendar'
  } = {}) {
    this.endpoint = endpoint;
  }

  /**
   * Envia os 4 campos especificados para registro na base/página do Notion
   * @param {Object} payload
   * @param {string} payload.nome - Nome completo
   * @param {string} payload.email - E-mail válido
   * @param {string} payload.celular - Telefone/WhatsApp com DDD
   * @param {string} payload.resumo - Resumo da ideia e estilo
   * @returns {Promise<{ ok: boolean, pageId?: string, message?: string }>}
   */
  async createAppointment({ nome, email, celular, resumo }) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nome: String(nome).trim(),
          email: String(email).trim(),
          celular: String(celular).trim(),
          resumo: String(resumo).trim()
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        const errorMsg = data.error || data.message || `Erro no servidor (Status ${response.status})`;
        throw new Error(errorMsg);
      }

      return {
        ok: true,
        pageId: data.pageId,
        message: 'Solicitação registrada com sucesso no Notion.'
      };
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error('O servidor demorou muito para responder. Por favor, verifique sua conexão.');
      }
      throw err;
    }
  }
}
