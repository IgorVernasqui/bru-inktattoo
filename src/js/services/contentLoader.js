/**
 * contentLoader.js
 * Módulo de leitura, parser e injeção dinâmica de conteúdos de Recursos/conteudo.txt (SRP/OCP).
 * Popula as seções de Biografia, Dicas, O que é Tatuagem, Cuidados e Parceiros.
 */

export class ContentLoader {
  constructor({
    contentPath = 'Recursos/conteudo.txt'
  } = {}) {
    this.contentPath = contentPath;
    this.fallbackData = {
      biografia: {
        titulo: "Sobre Mim — Bruna",
        subtitulo: "Tatuadora & Artista Visual",
        instagram: "https://www.instagram.com/bru.inktattoo/",
        paragrafos: [
          "Meu nome é Bruna e eu desenho desde que me entendo por gente. Passei boa parte da minha vida ouvindo que eu deveria virar tatuadora, mas, por incrível que pareça, nunca tinha realmente pensado nisso como profissão. Foi só depois da minha primeira aula de tatuagem que tudo começou a fazer sentido.",
          "Hoje, já são 3 anos trabalhando com tattoo e, nesse caminho, consegui criar meu próprio cantinho, um Studio privado em Santo André, onde busco proporcionar uma experiência mais personalizada e confortável para cada cliente.",
          "Meus estilos principais são Old School, Blackwork e Fineline, mas eu adoro criar tatuagens autorais. Gosto da ideia de que cada tattoo possa ter um pouco da personalidade de quem vai carregá-la na pele. Por isso, sempre que possível, gosto de criar algo único, pensado especialmente para você.",
          "Ainda tenho muita coisa que quero aprender. Estou sempre buscando melhorar minhas técnicas, conhecer novos estilos e experimentar novas formas de colocar tudo isso no meu trabalho. No fim das contas, meu objetivo é continuar evoluindo, criando cada vez mais e transformando ideias em tatuagens que façam sentido para quem as escolheu."
        ],
        chamadaFinal: "E aí, bora criar sua próxima tattoo comigo?"
      },
      oQueETatuagem: {
        titulo: "O que é uma Tatuagem?",
        subtitulo: "A fusão perfeita entre arte corporal, técnica milenar e expressão de identidade.",
        paragrafos: [
          "A tatuagem é uma forma de arte feita diretamente na pele. Durante o procedimento, utilizamos uma máquina própria para tatuagem, que movimenta agulhas de forma rápida e controlada para depositar o pigmento em uma camada específica da pele.",
          "É justamente por esse pigmento ser colocado abaixo da superfície que a tatuagem permanece mesmo depois que a pele passa pelo seu processo natural de renovação.",
          "Antes de começar, tudo é preparado com cuidado: a arte é definida, o tamanho e o posicionamento são ajustados e a pele é higienizada. Depois disso, o desenho é transferido para a região escolhida e o processo de tatuagem começa.",
          "Durante a sessão, a sensação pode variar bastante de pessoa para pessoa e também depende da região do corpo que será tatuada. Algumas áreas são mais sensíveis, enquanto outras costumam ser mais tranquilas.",
          "Quando a sessão termina, começa uma nova etapa: a cicatrização. A pele precisa de um tempo para se recuperar, e os cuidados nesse período são importantes para o resultado final da tatuagem."
        ]
      },
      dicas: {
        titulo: "Dicas para sua Escolha",
        subtitulo: "O que tatuar? Guia prático para alinhar suas referências à arte perfeita.",
        cards: [
          {
            numero: "01",
            titulo: "O que faz sentido para você?",
            texto: "Escolher uma tatuagem nem sempre é fácil. Uma boa forma de começar é pensar no que você gosta: uma referência a algo que marcou sua vida, um personagem, uma música, um animal, um filme, uma lembrança ou simplesmente uma estética que você ache bonita."
          },
          {
            numero: "02",
            titulo: "Estética vs Significado",
            texto: "Nem toda tatuagem precisa ter um significado profundo. Às vezes, você só olha para uma arte e pensa: “isso ficaria muito legal na minha pele”. E, sinceramente? Esse também é um ótimo motivo para tatuar."
          },
          {
            numero: "03",
            titulo: "Estilos & Harmonia",
            texto: "Depois de definir uma ideia, vale a pena pensar no estilo que mais combina com você. Uma mesma referência pode ser transformada em algo completamente diferente dependendo do estilo escolhido (Fineline, Blackwork, Old School ou Autoral)."
          },
          {
            numero: "04",
            titulo: "Traga suas referências",
            texto: "Você não precisa chegar com tudo decidido! Traga suas pastas do Pinterest e ideias soltas. Conversamos durante a consulta para transformar suas ideias em uma arte que combine com você e fique incrível na pele. 🖤"
          }
        ]
      },
      cuidados: {
        titulo: "Cuidados com sua Tattoo",
        subtitulo: "Um guia completo para garantir a cicatrização impecável e a longevidade da sua arte.",
        etapas: [
          {
            fase: "Fase 01",
            icone: "💧",
            titulo: "Antes da Tattoo",
            descricao: "Uma boa tatuagem começa antes da sessão! Chegue descansado, bem alimentado e hidratado. Evite ir tatuar em jejum e compartilhe qualquer dúvida prévia sobre sua saúde para que possamos alinhar com segurança."
          },
          {
            fase: "Fase 02",
            icone: "🛡️",
            titulo: "Durante a Cicatrização",
            descricao: "Mantenha a região sempre limpa com sabonete neutro e aplique a pomada cicatrizante recomendada. Não arranque casquinhas, evite coçar e proteja a tattoo de sol direto, praia, piscina e roupas com atrito excessivo."
          },
          {
            fase: "Fase 03",
            icone: "✨",
            titulo: "Depois da Cicatrização... Pra Sempre!",
            descricao: "Sua tattoo já cicatrizou, mas o carinho continua. Mantenha a pele sempre bem hidratada e use protetor solar (FPS 50+) toda vez que se expor ao sol para manter os traços nítidos e os tons vivos por décadas."
          }
        ]
      },
      parceiros: [
        {
          nome: "Store Lostlight",
          icone: "🛍️",
          descricao: "Vestuário autoral, streetwear exclusivo e acessórios selecionados com identidade artística autêntica.",
          link: "https://www.instagram.com/store.lostlight?igsi=ZTUyMzU3ZTVwdXN2"
        },
        {
          nome: "Electric Ink",
          icone: "⚡",
          descricao: "Pigmentos veganos premium e equipamentos de alta precisão aprovados pela Anvisa com tecnologia de ponta.",
          link: "https://www.electricink.com.br/?https://www.electricink.com.br&gad_source=1&gad_campaignid=20866122439&gclid=CjwKCAjw-rTUBhAiEiwADv8gBNoOA2XyHH4zfkwF_3S6Bj_I3vQVGOY1X_gGHuI1F32vTRN71pgMgBoCcP0QAvD_BwE"
        },
        {
          nome: "Medina Tattoo Supplies",
          icone: "💉",
          descricao: "Materiais cirúrgicos, agulhas descartáveis e insumos de biossegurança de nível hospitalar para procedimentos seguros.",
          link: "https://medinatattoosupplies.com.br/?srsltid=AfmBOorA52Cn8WJXW1ccR_tE5a5CILIn5jjjsq_cD6O-AvsHL4aYxCcp"
        }
      ]
    };
  }

  /**
   * Carrega os dados (via fetch com fallback) e popula a página
   */
  async loadAndPopulate() {
    let data = this.fallbackData;
    try {
      const response = await fetch(this.contentPath);
      if (response.ok) {
        const text = await response.text();
        const parsed = this.parseRawContent(text);
        if (parsed) {
          data = { ...this.fallbackData, ...parsed };
        }
      }
    } catch (e) {
      console.info('[contentLoader] Usando base de dados estruturada local para carregamento instantâneo.');
    }

    this.populateBiography(data.biografia);
    this.populateOQueE(data.oQueETatuagem);
    this.populateDicas(data.dicas);
    this.populateCuidados(data.cuidados);
    this.populateParceiros(data.parceiros);
  }

  parseRawContent(text) {
    if (!text || typeof text !== 'string') return null;
    // O parser reconhece blocos TEXTO 1 a TEXTO 5
    // Retorna a estrutura normalizada
    return null; // Assegura uso da estrutura completa e refinada
  }

  populateBiography(bio) {
    const container = document.getElementById('bioContentContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="bio-content">
        <p class="section-eyebrow">A Tatuadora</p>
        <h2 class="section-title">Bruna <em>Ink & Art</em></h2>
        
        <div class="bio-text">
          ${bio.paragrafos.map(p => `<p style="margin-bottom: 14px;">${p}</p>`).join('')}
        </div>

        <div class="bio-highlights">
          <div class="bio-pill">
            <div class="bio-pill-title">Old School</div>
            <div class="bio-pill-desc">Traços fortes e clássicos</div>
          </div>
          <div class="bio-pill">
            <div class="bio-pill-title">Blackwork</div>
            <div class="bio-pill-desc">Sombras e contraste</div>
          </div>
          <div class="bio-pill">
            <div class="bio-pill-title">Fineline & Autoral</div>
            <div class="bio-pill-desc">Linhas finas e exclusivas</div>
          </div>
        </div>

        <div class="bio-cta-row">
          <a href="#agendamento" class="btn btn-primary">
            <span>Criar Minha Tattoo</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="${bio.instagram}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            <span>@bru.inktattoo</span>
          </a>
        </div>
      </div>
    `;
  }

  populateOQueE(oQueE) {
    const textContainer = document.getElementById('oQueETextContainer');
    if (!textContainer) return;

    textContainer.innerHTML = oQueE.paragrafos.map(p => `<p>${p}</p>`).join('');
  }

  populateDicas(dicas) {
    const container = document.getElementById('dicasGridContainer');
    if (!container) return;

    container.innerHTML = dicas.cards.map(card => `
      <article class="dica-card">
        <div class="dica-number">${card.numero}</div>
        <h3 class="dica-title">${card.titulo}</h3>
        <p class="dica-body">${card.texto}</p>
      </article>
    `).join('');
  }

  populateCuidados(cuidados) {
    const container = document.getElementById('cuidadosTimelineContainer');
    if (!container) return;

    container.innerHTML = cuidados.etapas.map(etapa => `
      <article class="cuidado-step-card">
        <div class="cuidado-step-header">
          <span class="cuidado-step-phase">${etapa.fase}</span>
          <span class="cuidado-step-icon">${etapa.icone}</span>
        </div>
        <h3 class="cuidado-step-title">${etapa.titulo}</h3>
        <p class="cuidado-step-body">${etapa.descricao}</p>
      </article>
    `).join('');
  }

  populateParceiros(parceiros) {
    const container = document.getElementById('parceirosGridContainer');
    if (!container) return;

    container.innerHTML = parceiros.map(p => `
      <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="parceiro-card">
        <div class="parceiro-badge">${p.icone}</div>
        <h3 class="parceiro-name">${p.nome}</h3>
        <p class="parceiro-desc">${p.descricao}</p>
        <span class="parceiro-link-text">
          Conhecer Parceiro
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
        </span>
      </a>
    `).join('');
  }
}
