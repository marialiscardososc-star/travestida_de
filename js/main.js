/* ============================================================
   TRAVESTIDA DE V2.0 - JAVASCRIPT PRINCIPAL
   Funcionalidades interativas e comportamentos dinâmicos
   ============================================================ */

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initSearch();
  initMenuToggle();
  initAccordion();
  initEntropySlider();
  initScrollAnimations();
  initConceptTags();
  initTooltips();
  initMetodologiaCard();
});

// ============================================================
// NAVEGAÇÃO SUAVE
// ============================================================
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Fechar menu mobile se aberto
        const navPrincipal = document.getElementById('navPrincipal');
        if (navPrincipal.classList.contains('ativo')) {
          navPrincipal.classList.remove('ativo');
          document.getElementById('menuToggle').setAttribute('aria-expanded', 'false');
        }
        
        // Scroll suave
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================================
// BUSCA DE CONTEÚDO
// ============================================================
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        buscarConteudo();
      }
    });
  }
}

function buscarConteudo() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  
  if (searchTerm.length < 2) {
    alert('Digite pelo menos 2 caracteres para buscar');
    return;
  }
  
  // Remover destaques anteriores
  removeHighlights();
  
  // Buscar e destacar
  const main = document.querySelector('main');
  const walker = document.createTreeWalker(
    main,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  
  let node;
  const matches = [];
  
  while (node = walker.nextNode()) {
    const text = node.textContent;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    
    if (regex.test(text)) {
      matches.push(node);
    }
  }
  
  if (matches.length === 0) {
    alert(`Nenhum resultado encontrado para "${searchTerm}"`);
    return;
  }
  
  // Destacar primeiro resultado
  highlightText(matches[0], searchTerm);
  
  // Scroll para primeiro resultado
  const firstHighlight = document.querySelector('.search-highlight');
  if (firstHighlight) {
    const headerHeight = document.querySelector('header').offsetHeight;
    const targetPosition = firstHighlight.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
  
  // Feedback
  showNotification(`${matches.length} resultado(s) encontrado(s)`);
}

function highlightText(node, searchTerm) {
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const text = node.textContent;
  const span = document.createElement('span');
  
  const parts = text.split(regex);
  
  parts.forEach(part => {
    if (part.toLowerCase() === searchTerm.toLowerCase()) {
      const highlight = document.createElement('mark');
      highlight.className = 'search-highlight';
      highlight.textContent = part;
      highlight.style.backgroundColor = '#C9A740';
      highlight.style.color = '#0B0E13';
      highlight.style.padding = '2px 4px';
      highlight.style.borderRadius = '3px';
      span.appendChild(highlight);
    } else {
      span.appendChild(document.createTextNode(part));
    }
  });
  
  node.parentNode.replaceChild(span, node);
}

function removeHighlights() {
  const highlights = document.querySelectorAll('.search-highlight');
  highlights.forEach(highlight => {
    const parent = highlight.parentNode;
    while (highlight.firstChild) {
      parent.insertBefore(highlight.firstChild, highlight);
    }
    parent.removeChild(highlight);
  });
}

// ============================================================
// MENU TOGGLE (MOBILE)
// ============================================================
function initMenuToggle() {
  const menuToggle = document.getElementById('menuToggle');
  const navPrincipal = document.getElementById('navPrincipal');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navPrincipal.classList.toggle('ativo');
      const isExpanded = navPrincipal.classList.contains('ativo');
      menuToggle.setAttribute('aria-expanded', isExpanded);
    });
  }
  
  // Fechar menu ao clicar fora
  document.addEventListener('click', function(e) {
    if (!e.target.closest('header')) {
      navPrincipal.classList.remove('ativo');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ============================================================
// ACORDEÃO
// ============================================================
function initAccordion() {
  const acordeaoItems = document.querySelectorAll('.acordeao-item');
  
  acordeaoItems.forEach(item => {
    const titulo = item.querySelector('.acordeao-titulo');
    const conteudo = item.querySelector('.acordeao-conteudo');
    
    if (titulo && conteudo) {
      titulo.addEventListener('click', function() {
        toggleAcordeao(titulo);
      });
    }
  });
}

function toggleAcordeao(button) {
  const conteudo = button.nextElementSibling;
  
  if (!conteudo) return;
  
  const isOpen = conteudo.classList.contains('ativo');
  
  // Fechar todos os outros
  const allConteudos = document.querySelectorAll('.acordeao-conteudo');
  allConteudos.forEach(c => {
    c.classList.remove('ativo');
  });
  
  // Abrir o clicado se estava fechado
  if (!isOpen) {
    conteudo.classList.add('ativo');
  }
}

// ============================================================
// SLIDER DE ENTROPIA
// ============================================================
function initEntropySlider() {
  const slider = document.getElementById('entropiaSlider');
  
  if (slider) {
    slider.addEventListener('input', function() {
      updateEntropyVisualization(this.value);
    });
  }
}

function updateEntropyVisualization(value) {
  const percent = (value / 100) * 100;
  
  // Atualizar barras
  const altaBar = document.querySelector('.entropia-bar.alta');
  const baixaBar = document.querySelector('.entropia-bar.baixa');
  
  if (altaBar && baixaBar) {
    altaBar.style.width = (100 - percent * 0.3) + '%';
    baixaBar.style.width = (70 - percent * 0.2) + '%';
  }
  
  // Atualizar valores
  const alta = (3.5 - (percent * 0.007)).toFixed(1);
  const baixa = (2.8 - (percent * 0.0056)).toFixed(1);
  
  const altaValue = document.querySelectorAll('.entropia-valor')[0];
  const baixaValue = document.querySelectorAll('.entropia-valor')[1];
  
  if (altaValue) altaValue.textContent = alta;
  if (baixaValue) baixaValue.textContent = baixa;
}

// ============================================================
// ANIMAÇÕES DE SCROLL
// ============================================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  const sections = document.querySelectorAll('.secao-content');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
  });
}

// ============================================================
// NOTIFICAÇÕES
// ============================================================
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 200px;
    right: 20px;
    background-color: #00A0D6;
    color: #0B0E13;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 600;
    z-index: 2000;
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ============================================================
// UTILITÁRIOS
// ============================================================

// Função para obter parâmetro da URL
function getUrlParameter(name) {
  const url = new URL(window.location);
  return url.searchParams.get(name);
}

// ============================================================
// TAGS DE CONCEITO INTERATIVAS
// - elementos com classe `.tag-conceito`
// - devem ter atributo `data-conceito-id` (id da âncora na página)
// - opcionalmente `data-definicao` com texto para o popover
// ============================================================
function initConceptTags() {
  const tags = document.querySelectorAll('.tag-conceito');
  if (!tags || tags.length === 0) return;

  tags.forEach(tag => {
    tag.style.cursor = 'pointer';
    tag.addEventListener('click', (e) => {
      const conceptId = tag.getAttribute('data-conceito-id') || slugify(tag.textContent || '');
      const def = tag.getAttribute('data-definicao') || null;

      // scroll para a âncora se existir
      const target = document.getElementById(conceptId);
      if (target) {
        const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
        window.scrollTo({ top: target.offsetTop - headerHeight - 20, behavior: 'smooth' });
        target.classList.add('highlight-anchor');
        setTimeout(() => target.classList.remove('highlight-anchor'), 1800);
      }

      // abrir popover com definição (se houver)
      if (def) {
        openConceptPopover(tag, def);
      }
    });
  });
}

function openConceptPopover(anchorEl, text) {
  closeAllPopovers();
  const rect = anchorEl.getBoundingClientRect();
  const pop = document.createElement('div');
  pop.className = 'concept-popover';
  pop.textContent = text;
  document.body.appendChild(pop);

  const top = rect.top + window.scrollY - pop.offsetHeight - 12;
  const left = rect.left + window.scrollX;
  pop.style.top = (top > 20 ? top : rect.bottom + window.scrollY + 12) + 'px';
  pop.style.left = left + 'px';

  // fechar ao clicar fora
  setTimeout(() => {
    document.addEventListener('click', closePopoverOnOutside);
  }, 10);
}

function closeAllPopovers() {
  const existing = document.querySelectorAll('.concept-popover');
  existing.forEach(e => e.remove());
  document.removeEventListener('click', closePopoverOnOutside);
}

function closePopoverOnOutside(e) {
  if (!e.target.closest || !document.querySelector('.concept-popover')) return;
  if (!e.target.closest('.concept-popover') && !e.target.classList.contains('tag-conceito')) {
    closeAllPopovers();
  }
}

// tornar slugify disponível aqui (reaproveita função em charts.js se estiver global)
function slugify(text) {
  return (text||'').toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

// Função para scroll suave personalizado
function smoothScroll(target, duration = 1000) {
  const element = document.querySelector(target);
  if (!element) return;
  
  const start = window.scrollY;
  const end = element.offsetTop - 100;
  const distance = end - start;
  let startTime = null;
  
  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    window.scrollTo(0, start + distance * easeInOutQuad(progress));
    
    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };
  
  requestAnimationFrame(animation);
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// ============================================================
// DARK MODE TOGGLE (OPCIONAL)
// ============================================================
function initDarkModeToggle() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (prefersDark) {
    document.documentElement.style.colorScheme = 'dark';
  }
  
  // Ouvir mudanças de preferência do sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    document.documentElement.style.colorScheme = e.matches ? 'dark' : 'light';
  });
}

// ============================================================
// ANALYTICS (OPCIONAL)
// ============================================================
function trackEvent(category, action, label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
}

// Rastrear cliques em botões
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('btn')) {
    trackEvent('engagement', 'button_click', e.target.textContent);
  }
});

// ============================================================
// EXPORT PARA OUTRAS FUNÇÕES
// ============================================================
window.buscarConteudo = buscarConteudo;
window.toggleAcordeao = toggleAcordeao;

// ============================================================
// CARD METODOLOGIA EXPANSÍVEL
// ============================================================
function initMetodologiaCard() {
  const card = document.getElementById('metodologiaCardContent');
  if (!card) return;
  
  // Card começa fechado
  card.classList.add('metodologia-closed');
}

function toggleMetodologiaCard() {
  const card = document.getElementById('metodologiaCardContent');
  if (!card) return;
  
  card.classList.toggle('metodologia-closed');
  card.classList.toggle('metodologia-open');
}

// ============================================================
// TOOLTIPS SIMPLES
// ============================================================
function initTooltips() {
  const tooltips = document.querySelectorAll('.tooltip-trigger');
  
  tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', function() {
      const title = this.getAttribute('title');
      if (!title) return;
      
      const tooltipEl = document.createElement('div');
      tooltipEl.className = 'tooltip-box';
      tooltipEl.textContent = title;
      tooltipEl.style.cssText = `
        position: absolute;
        background-color: rgba(11, 14, 19, 0.95);
        color: var(--cinza-claro);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.85rem;
        border: 1px solid rgba(0, 160, 214, 0.2);
        z-index: 2000;
        max-width: 250px;
        white-space: normal;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      `;
      
      document.body.appendChild(tooltipEl);
      
      const rect = this.getBoundingClientRect();
      tooltipEl.style.top = (rect.top + window.scrollY - tooltipEl.offsetHeight - 8) + 'px';
      tooltipEl.style.left = (rect.left + window.scrollX + rect.width / 2 - tooltipEl.offsetWidth / 2) + 'px';
      
      const closeTooltip = () => {
        tooltipEl.remove();
        this.removeEventListener('mouseleave', closeTooltip);
      };
      
      this.addEventListener('mouseleave', closeTooltip);
    });
  });
}
