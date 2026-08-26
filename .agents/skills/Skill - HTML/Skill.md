# Skill: Modern Transparent Neon Website

## Objetivo

Criar páginas web modernas, profissionais e visualmente impactantes, utilizando **HTML5 semântico**, **CSS moderno** e **JavaScript limpo**, com uma identidade visual baseada em:

- Transparência e efeito glassmorphism
- Neon e iluminação suave
- Fundo escuro e sofisticado
- Gradientes modernos
- Bordas luminosas
- Animações sutis
- Interface responsiva
- Aparência premium e tecnológica

---

## 1. Estrutura HTML

Sempre utilizar HTML5 semântico e bem organizado.

Estrutura base:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Descrição da página">

  <title>Título da Página</title>

  <link rel="stylesheet" href="style.css">
</head>

<body>

  <header>
    <!-- Navegação -->
  </header>

  <main>
    <section>
      <!-- Conteúdo principal -->
    </section>
  </main>

  <footer>
    <!-- Rodapé -->
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

### Regras

- Usar `header`, `nav`, `main`, `section`, `article`, `aside` e `footer` quando semanticamente apropriado.
- Evitar excesso de `<div>` sem função clara.
- Manter hierarquia correta de `h1`, `h2`, `h3`.
- Nunca utilizar múltiplos `h1` sem necessidade.
- Imagens devem possuir `alt`.
- Links devem utilizar `<a>`.
- Botões devem utilizar `<button>` quando representarem ações.
- HTML deve ser indentado e fácil de manter.
- Classes devem possuir nomes descritivos.
- Evitar estilos inline.

---

## 2. Design Visual

A interface deve transmitir uma sensação de:

**Tecnologia + Futuro + Elegância + Transparência + Neon.**

### Fundo

Utilizar fundo predominantemente escuro.

Preferências:

- Preto
- Grafite
- Azul-marinho muito escuro
- Roxo extremamente escuro

Adicionar gradientes radiais ou lineares discretos para criar profundidade.

Exemplo:

```css
body {
  background:
    radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.08), transparent 30%),
    radial-gradient(circle at 80% 80%, rgba(140, 0, 255, 0.08), transparent 30%),
    #050509;
}
```

---

## 3. Glassmorphism

Elementos importantes devem utilizar aparência de vidro.

Características:

- Fundo semitransparente
- `backdrop-filter: blur()`
- Bordas finas e translúcidas
- Sombras suaves
- Leve brilho interno

Exemplo:

```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
}
```

Não exagerar no blur. O conteúdo deve continuar legível.

---

## 4. Neon

Utilizar neon como elemento de destaque, não como decoração excessiva.

Cores recomendadas:

- Cyan
- Azul elétrico
- Roxo
- Magenta
- Verde neon

Exemplo:

```css
.neon {
  color: #8fffff;
  text-shadow:
    0 0 10px rgba(0, 255, 255, 0.6),
    0 0 30px rgba(0, 255, 255, 0.3);
}
```

Utilizar neon principalmente em:

- Botões
- Links ativos
- Ícones
- Bordas
- Títulos importantes
- Elementos de destaque
- Hover

---

## 5. Tipografia

Utilizar tipografia moderna, limpa e tecnológica.

Preferências:

- Inter
- Manrope
- Space Grotesk
- Sora
- Geist

A hierarquia visual deve ser clara.

### Títulos

- Grandes
- Forte contraste
- Poucas palavras
- Peso elevado
- Possível uso de gradiente no texto

### Texto

- Tamanho confortável
- Alto contraste
- Line-height generoso
- Evitar textos excessivamente compactados

---

## 6. Layout

Priorizar:

- CSS Grid
- Flexbox
- Container centralizado
- Espaçamento consistente
- Grandes áreas de respiro

Exemplo:

```css
.container {
  width: min(1200px, 90%);
  margin-inline: auto;
}
```

Não criar layouts excessivamente densos.

O design deve parecer sofisticado e espaçoso.

---

## 7. Botões

Botões devem possuir aparência moderna.

Características:

- Bordas arredondadas
- Gradiente ou transparência
- Pequeno brilho neon
- Transição suave
- Feedback visual no hover

Exemplo:

```css
.button {
  border: 1px solid rgba(0, 255, 255, 0.4);
  background: rgba(0, 255, 255, 0.08);
  color: white;
  padding: 12px 22px;
  border-radius: 12px;
  transition: 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.25);
}
```

---

## 8. Animações

Utilizar animações discretas e elegantes.

Priorizar:

- `opacity`
- `transform`
- `filter`
- `box-shadow`

Exemplos:

- Fade-in
- Slide-up
- Hover elevation
- Neon glow
- Gradientes animados
- Pequeno movimento de elementos decorativos

Evitar animações exageradas.

Respeitar usuários que preferem menos movimento:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Responsividade

O site deve funcionar perfeitamente em:

- Desktop
- Notebook
- Tablet
- Smartphone

Utilizar abordagem mobile-first quando possível.

Nunca depender exclusivamente de tamanhos fixos.

Evitar:

```css
width: 1200px;
```

Preferir:

```css
width: min(1200px, 100%);
```

---

## 10. Acessibilidade

Sempre considerar acessibilidade.

Regras:

- Contraste adequado
- `alt` em imagens
- Foco visível
- Navegação por teclado
- Botões claramente identificáveis
- Links compreensíveis
- Não utilizar apenas cores para transmitir informações
- Respeitar `prefers-reduced-motion`

Exemplo:

```css
:focus-visible {
  outline: 2px solid #8fffff;
  outline-offset: 4px;
}
```

---

## 11. Performance

O código deve ser simples e eficiente.

Priorizar:

- CSS organizado
- JavaScript apenas quando necessário
- Imagens otimizadas
- Lazy loading para imagens fora da primeira viewport
- Evitar bibliotecas desnecessárias
- Evitar efeitos extremamente pesados

Não adicionar frameworks ou dependências externas sem necessidade.

---

## 12. JavaScript

JavaScript deve ser:

- Modular
- Pequeno
- Fácil de entender
- Separado do HTML quando possível

Utilizar JavaScript para:

- Menu mobile
- Interações
- Modais
- Tabs
- Animações controladas
- Validação de formulários
- Elementos dinâmicos

Não utilizar JavaScript para resolver problemas que podem ser resolvidos com HTML/CSS.

---

## 13. Componentes Visuais

Cards devem seguir o padrão:

```text
┌─────────────────────────────┐
│  ÍCONE / ELEMENTO NEON      │
│                             │
│  Título                     │
│  Descrição curta            │
│                             │
│  Ação →                     │
└─────────────────────────────┘
```

Características:

- Glassmorphism
- Bordas sutis
- Radius entre 12px e 24px
- Hover elegante
- Glow discreto
- Espaçamento generoso

---

## 14. Regra de Consistência

Todos os elementos devem parecer pertencer ao mesmo sistema visual.

Não misturar:

- Estilos muito diferentes de botão
- Raios de borda aleatórios
- Muitas cores neon simultaneamente
- Sombras exageradas
- Gradientes sem propósito
- Tipografias diferentes sem necessidade

Criar uma pequena linguagem visual e mantê-la em toda a página.

---

## 15. CSS Variables

Sempre que possível, centralizar as principais propriedades:

```css
:root {
  --bg: #050509;
  --surface: rgba(255, 255, 255, 0.05);
  --border: rgba(255, 255, 255, 0.10);

  --text: #ffffff;
  --muted: rgba(255, 255, 255, 0.65);

  --neon-cyan: #00ffff;
  --neon-blue: #4d7cff;
  --neon-purple: #9b5cff;

  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;

  --transition: 0.3s ease;
}
```

---

## 16. Resultado Esperado

O resultado final deve parecer um **site premium, moderno e tecnológico**, semelhante a uma interface futurista.

A composição deve transmitir:

> **Dark UI + Glassmorphism + Neon + Minimalismo + Alta tecnologia**

O design deve ser bonito sem sacrificar:

- Usabilidade
- Legibilidade
- Acessibilidade
- Performance
- Responsividade
- Estrutura semântica

---

## Regra Final

Antes de finalizar qualquer página:

1. Verificar a estrutura semântica do HTML.
2. Verificar responsividade.
3. Verificar contraste e legibilidade.
4. Verificar estados de hover e focus.
5. Verificar se o visual mantém o conceito **transparent neon**.
6. Remover elementos visuais desnecessários.
7. Garantir que o código esteja limpo e organizado.
8. Garantir que a experiência mobile seja tão boa quanto a desktop.
9. Não utilizar efeitos neon em excesso.
10. Priorizar sempre **elegância sobre exagero**.