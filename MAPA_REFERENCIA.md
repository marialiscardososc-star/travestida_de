# 🗺️ Mapa de Referência - Componentes e Localizações

## 📂 Estrutura de Arquivos

```
c:\Users\maria\OneDrive\Desktop\trs\
├── ARQUIVOS NOVOS (Fase 2)
│   ├── js/filtros.js ⭐
│   ├── js/storytelling.js ⭐
│   ├── IMPLEMENTACAO_FASE2.md ⭐
│   ├── RESUMO_IMPLEMENTACAO_COMPLETO.md ⭐
│   ├── CHECKLIST_FASE2.md ⭐
│   └── GUIA_RAPIDO_USO.md ⭐
│
├── ARQUIVOS MODIFICADOS
│   ├── index.html (820 linhas)
│   ├── css/style.css (1800+ linhas)
│   └── css/responsive.css (750+ linhas)
│
└── ARQUIVOS EXISTENTES
    ├── js/main.js
    ├── js/charts.js
    ├── js/modals.js
    ├── js/api-client.js
    └── [outros...]
```

---

## 🔍 Componente 1: Sistema de Filtros

### Arquivos Envolvidos

| Arquivo | Tipo | Linhas | Mudanças |
|---------|------|-------|----------|
| `js/filtros.js` | NOVO | 158 | 100% novo |
| `index.html` | Modificado | 820 | +30 linhas |
| `css/style.css` | Modificado | 1800+ | +60 linhas |
| `css/responsive.css` | Modificado | 750+ | +40 linhas |

### Localização no HTML

**Arquivo**: `index.html`  
**Seção**: "O que a Gente Encontrou?" (id="resultados")  
**Posição**: Logo após `<div class="secao-header">`  
**Linhas**: 430-451

```html
<!-- ============================================================
     SISTEMA DE FILTROS POR TRIBUNAL
     ============================================================ -->
<div class="filtros-container">
  <label class="filtros-label">
    🏛️ Filtrar por Tribunal:
  </label>
  <button data-filtro-tribunal="todos" class="ativo">
    Ver Todos
  </button>
  <button data-filtro-tribunal="TJ-SP">TJ-SP (25%)</button>
  <button data-filtro-tribunal="TJ-PR">TJ-PR (18%)</button>
  <button data-filtro-tribunal="TJ-MG">TJ-MG (15%)</button>
  <button data-filtro-tribunal="Outros">Outros (42%)</button>
</div>
```

### Estilos CSS Relacionados

**Arquivo**: `css/style.css`  
**Seção**: "SISTEMA DE FILTROS - BOTÕES DE TRIBUNAL"  
**Linhas**: 1673-1744

```css
.filtros-container { ... }
.filtros-label { ... }
[data-filtro-tribunal] { ... }
[data-filtro-tribunal]:hover { ... }
[data-filtro-tribunal].ativo { ... }
.notification { ... }
.notification.error { ... }
.notification.success { ... }
```

### Estilos Responsivos

**Arquivo**: `css/responsive.css`  
**Linhas**: 688-750 (final do arquivo)

```css
/* Desktop */
.filtros-container { flex-direction: row; }

/* Tablet (880px) */
@media (max-width: 880px)
  .filtros-container { flex-direction: column; }

/* Mobile (640px) */
@media (max-width: 640px)
  [data-filtro-tribunal] { flex: 1 1 calc(33.333% - ...) }

/* Small Mobile (480px) */
@media (max-width: 480px)
  [data-filtro-tribunal] { flex: 1 1 calc(50% - 2px) }
```

### JavaScript

**Arquivo**: `js/filtros.js` (NOVO)  
**Linhas**: 1-158

**Funções Principais**:
- `initFiltros()` - Inicializa event listeners
- `aplicarFiltro(tribunal)` - Aplica o filtro
- `filtrarResultados(tribunal)` - Atualiza UI
- `showNotification(message, type)` - Exibe notificação
- `getTribunal(code)` - Obtém dados
- `getTodosTribunais()` - Lista todos

### Script Tag

**Arquivo**: `index.html`  
**Linhas**: 815 (final do arquivo)

```html
<script src="js/filtros.js"></script>
```

---

## 🔍 Componente 2: Storytelling Carousel

### Arquivos Envolvidos

| Arquivo | Tipo | Linhas | Mudanças |
|---------|------|-------|----------|
| `js/storytelling.js` | NOVO | 149 | 100% novo |
| `index.html` | Modificado | 820 | +25 linhas |
| `css/style.css` | Modificado | 1800+ | +150 linhas |
| `css/responsive.css` | Modificado | 750+ | +50 linhas |

### Localização no HTML

**Arquivo**: `index.html`  
**Seção**: "Distribuição Geográfica e Insights Regionais"  
**Posição**: Dentro de `.insights-coluna`  
**Linhas**: 476-498

```html
<!-- ============================================================
     COMPONENTE STORYTELLING CAROUSEL
     ============================================================ -->
<div class="storytelling-carousel">
  <div id="storytelling-carousel"></div>
  
  <div class="carousel-controls">
    <button class="carousel-btn" data-carousel-prev="true" onclick="prevSlide()">
      ← Anterior
    </button>
    <button class="carousel-btn" data-carousel-next="true" onclick="nextSlide()">
      Próximo →
    </button>
  </div>

  <div class="carousel-dots" data-carousel-dots></div>
</div>
```

### Estrutura Renderizada

Dinamicamente renderizado com:
```html
<div class="storytelling-card">
  <div class="card-header">
    <span class="card-icon">📍</span>
    <h4>Concentração Regional</h4>
  </div>
  
  <div class="card-insight">
    <p class="insight-main">58% dos casos no Sudeste e Sul</p>
  </div>

  <div class="card-progress">
    <div class="progress-bar"></div>
    <span class="progress-text">58%</span>
  </div>

  <div class="card-details">
    <p>A expressão "travestida de" está altamente concentrada...</p>
  </div>

  <div class="card-pagination">
    <span class="pagination-indicator">1 / 5</span>
  </div>
</div>
```

### Estilos CSS Relacionados

**Arquivo**: `css/style.css`  
**Seção**: "STORYTELLING CAROUSEL"  
**Linhas**: 1746-1850

```css
.storytelling-carousel { ... }
#storytelling-carousel { ... }
.storytelling-card { ... }
.card-header { ... }
.card-icon { ... }
.card-insight { ... }
.card-progress { ... }
.carousel-controls { ... }
.carousel-btn { ... }
.carousel-dots { ... }
.dot { ... }
.dot.ativo { ... }
```

### Animações CSS

```css
@keyframes slideIn { ... }
@keyframes fadeIn { ... }
```

### Estilos Responsivos

**Arquivo**: `css/responsive.css`  
**Linhas**: 731-770

```css
/* Mobile */
.storytelling-carousel { padding: var(--spacing-md); }
.storytelling-card { padding: var(--spacing-md); }
.carousel-btn { font-size: var(--fs-xs); }

/* Tablet */
@media (max-width: 768px)
  .storytelling-carousel { margin-top: var(--spacing-lg); }
```

### JavaScript

**Arquivo**: `js/storytelling.js` (NOVO)  
**Linhas**: 1-149

**Dados** (`storytellingData`):
- 5 insights com id, icon, title, insight, details, percentage, color

**Funções Principais**:
- `initStorytelling()` - Inicialização
- `renderStorytelling()` - Renderiza card atual
- `setupCarouselControls()` - Setup dos botões
- `nextSlide()` - Próximo slide
- `prevSlide()` - Slide anterior
- `goToSlide(index)` - Vai para slide específico

### Script Tag

**Arquivo**: `index.html`  
**Linhas**: 816 (final do arquivo)

```html
<script src="js/storytelling.js"></script>
```

---

## 📍 Busca Rápida

### Por Funcionalidade

| Funcionalidade | Arquivo | Linha |
|---|---|---|
| Botões de filtro | index.html | 430-451 |
| Data filtros | js/filtros.js | 7-24 |
| Aplicar filtro | js/filtros.js | 50-80 |
| Notificações | js/filtros.js | 118-140 |
| Carousel | index.html | 476-498 |
| Data carousel | js/storytelling.js | 7-57 |
| Renderizar card | js/storytelling.js | 68-92 |
| Estilos filtros | css/style.css | 1673-1744 |
| Estilos carousel | css/style.css | 1746-1850 |
| Responsivo filtros | css/responsive.css | 688-729 |
| Responsivo carousel | css/responsive.css | 731-770 |

### Por Arquivo

| Arquivo | Conteúdo Principal | Linhas |
|---|---|---|
| `js/filtros.js` | Sistema de filtros | 1-158 |
| `js/storytelling.js` | Carousel de insights | 1-149 |
| `index.html` | HTML estrutura | 1-820 |
| `css/style.css` | Estilos principais | 1-1850+ |
| `css/responsive.css` | Media queries | 1-770+ |

---

## 🎨 Referência de Classes CSS

### Filtros
```css
.filtros-container        /* Container dos botões */
.filtros-label            /* Label dos filtros */
[data-filtro-tribunal]    /* Botões individuais */
.notification             /* Notificações toast */
```

### Carousel
```css
.storytelling-carousel    /* Container principal */
#storytelling-carousel    /* Div de render */
.storytelling-card        /* Card individual */
.card-header              /* Cabeçalho do card */
.card-icon                /* Ícone do card */
.card-insight             /* Seção de destaque */
.card-progress            /* Barra de progresso */
.card-details             /* Seção de detalhes */
.card-pagination          /* Indicador de página */
.carousel-controls        /* Container dos botões */
.carousel-btn             /* Botão de controle */
.carousel-dots            /* Container dos pontos */
.dot                      /* Ponto individual */
```

---

## 🔗 Atributos de Dados

### HTML Atributos
```html
data-filtro-tribunal="TJ-SP"     <!-- Qual tribunal -->
data-carousel-prev="true"         <!-- Botão anterior -->
data-carousel-next="true"         <!-- Botão próximo -->
data-carousel-dots               <!-- Container de dots -->
data-dot-index="0"               <!-- Índice do ponto -->
data-tooltip="..."               <!-- Texto de tooltip -->
```

---

## 📋 Ordem de Carregamento Scripts

**Arquivo**: `index.html` (linhas 810-816)

```html
1. <script src="js/main.js"></script>
2. <script src="js/charts.js"></script>
3. <script src="js/modals.js"></script>
4. <script src="js/filtros.js"></script>
5. <script src="js/storytelling.js"></script>
```

**Importante**: Ordem deve ser mantida para evitar erros de referência.

---

## 🔄 Fluxo de Inicialização

```
1. HTML carrega
2. CSS aplicado
3. DOM pronto
4. DOMContentLoaded dispara
5. main.js → inicializa navegação, etc
6. charts.js → renderiza gráficos
7. modals.js → configura modais
8. filtros.js → initFiltros() chamada após 500ms
9. storytelling.js → initStorytelling() chamada após 800ms
```

---

## 💾 Versioning

| Versão | Data | Mudanças |
|--------|------|----------|
| 1.0 | 2025 | Setup inicial |
| 2.0 | 2025 | Fase 2 - Filtros + Carousel |

---

## 📞 Referência Rápida

**Para adicionar novo tribunal**: Modifique `tribunalData` em `js/filtros.js`

**Para adicionar novo insight**: Modifique `storytellingData` em `js/storytelling.js`

**Para mudar cores**: Modifique CSS variables em `css/style.css` (linhas 1-50)

**Para mudar animações**: Modifique `--transition-*` em `css/style.css`

---

**Mapa atualizado**: 2025  
**Versão do Projeto**: 2.0 (Fase 2)  
**Status**: ✅ Documentação Completa
