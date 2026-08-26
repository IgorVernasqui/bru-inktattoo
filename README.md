# Bru Inktattoo Studio — Web & Notion MCP Integration

Website institucional e sistema de agendamento de orçamentos para o **Estúdio de Tatuagem** (*Bru Inktattoo — Bruna Ink*), desenvolvido em estrita conformidade com a especificação técnica descrita no [SDD.md](file:///Users/49012848865/Documents/Projeto%20-%20Final/SDD.md), princípios **SOLID**, arquitetura modular desacoplada e integração com o **Notion MCP Server**.

---

## 🏛️ Arquitetura Modular & Princípios SOLID

A estrutura do projeto separa rigorosamente responsabilidades entre apresentação (CSS), lógica de negócio (JS) e serviços de integração:

```text
projeto-tatuagem/
├── Recursos/                      # Insumos originais de conteúdo e mídia
│   ├── conteudo.txt               # Textos de base (Biografia, Dicas, Cuidados, Parceiros)
│   ├── Fotos/                     # 13 fotos de alta fidelidade do portfólio + estúdio
│   └── Video/                     # Vídeos institucionais do estúdio
├── src/
│   ├── css/
│   │   ├── variables.css          # Design tokens (paleta dark aesthetic, ouro, tipografia, sombras)
│   │   ├── base.css               # Reset, tipografia global, containers e scroll-reveal
│   │   ├── components.css         # Componentes isolados (botões, toasts, carrossel, lightbox, inputs)
│   │   └── sections.css           # Layouts das 8 seções, navbar responsiva e footer
│   └── js/
│       ├── validators/
│       │   └── formValidator.js   # Validações puras (RFC 5322 regex, máscara de telefone) [SRP]
│       ├── services/
│       │   ├── contentLoader.js   # Parser e injetor de dados de Recursos/conteudo.txt [SRP/OCP]
│       │   └── notionService.js   # Adaptador de envio de agendamento ao Notion [DIP/LSP]
│       ├── components/
│       │   ├── Toast.js           # Gerenciador de notificações flutuantes (Sucesso/Erro) [SRP]
│       │   ├── Navigation.js      # Navbar fixa com blur, menu mobile e scrollspy [SRP]
│       │   ├── Carousel.js        # Carrossel com touch swipe, bullets, lightbox e filtros [SRP]
│       │   └── AppointmentForm.js # Gerenciador de eventos e ciclo de vida do formulário [SRP/DIP]
│       └── app.js                 # Ponto de entrada (Bootstrap e injeção de dependências)
├── index.html                     # Estrutura semântica HTML5 acessível (WCAG AA)
├── server.js                      # Backend Node.js (servidor de arquivos estáticos e API Notion)
├── package.json
└── SDD.md                         # Especificação técnica completa
```

### Princípios SOLID Aplicados
1. **S (Single Responsibility):** `formValidator.js` apenas valida dados puros; `Toast.js` apenas gerencia notificações visuais; `Navigation.js` cuida da navegação; `Carousel.js` cuida da galeria interativa.
2. **O (Open/Closed):** `contentLoader.js` permite expandir tópicos e novos parceiros sem necessidade de refatorar a estrutura visual.
3. **L (Liskov Substitution):** `notionService.js` pode ser substituído por qualquer outro adapter de persistência sem impacto na UI.
4. **I (Interface Segregation):** Componentes consomem apenas os métodos e utilitários estritamente necessários.
5. **D (Dependency Inversion):** `AppointmentForm.js` recebe abstrações injetadas do validador, serviço de dados e componente de toasts no bootstrap de `app.js`.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (v16 ou superior)

### 1. Iniciar o Servidor Local
```bash
npm start
```
O servidor estará acessível em:
👉 **`http://localhost:3001`**

### 2. Conectar com o Notion (Opcional em Produção)
Para envio direto para a base/página do Notion:
```bash
NOTION_TOKEN=<seu_token_notion> npm start
```
*(Nota: em ambiente de desenvolvimento sem token, o servidor simula o registro localmente com log estruturado sem travar a interface).*

---

## 🎨 Funcionalidades em Destaque

- **Carrossel Interativo de Portfólio:**
  - 13 trabalhos de alta resolução das categorias *Old School*, *Blackwork*, *Fineline* e *Autorais*.
  - Navegação por botões Anterior/Próximo e Bullets interativos.
  - Suporte completo a gestos touch (*swipe left / swipe right*) em smartphones.
  - Lightbox / Modal integrado para inspeção com zoom e tecla ESC para fechar.
- **Carga Dinâmica de Conteúdo:**
  - Carregamento assíncrono e parsing de `Recursos/conteudo.txt` com fallback estruturado para exibição instantânea.
- **Formulário com Validação em Tempo Real:**
  - 4 campos obrigatórios conforme o SDD: `Nome Completo`, `E-mail`, `Celular (WhatsApp com máscara)` e `Resumo da Ideia`.
  - Sanitização anti-XSS e conformidade com a LGPD.
  - Estados visuais de loading com spinner animado e Toasts de feedback (*Sucesso* e *Erro*).
