/* ============================================================
   COMPONENTE DE STORYTELLING - CAROUSEL
   Exibe insights narrativos sobre os dados geográficos
   ============================================================ */

const storytellingData = [
  {
    id: 'regional-concentration',
    icon: '📍',
    title: 'Concentração Regional',
    insight: '58% dos casos no Sudeste e Sul',
    details: 'A expressão "travestida de" está altamente concentrada em três regiões: São Paulo, Paraná e Minas Gerais. Isso reflete o volume processual e a sofisticação dos litígios comerciais nessas regiões.',
    percentage: 58,
    color: '#00A0D6'
  },
  {
    id: 'sp-leadership',
    icon: '🏛️',
    title: 'Liderança do TJ-SP',
    insight: '25% do total de casos',
    details: 'São Paulo lidera significativamente na utilização desta expressão, especialmente em litígios comerciais e contratos civis. Isso reflete sua relevância como centro jurídico e comercial do país.',
    percentage: 25,
    color: '#00A0D6'
  },
  {
    id: 'regional-distribution',
    icon: '🗺️',
    title: 'Distribuição Equilibrada',
    insight: 'Outros tribunais: 42% dos casos',
    details: 'Apesar da concentração no Sudeste-Sul, há uma distribuição significativa em outros tribunais do país. Isso indica que a expressão "travestida de" é utilizada como padrão jurídico nacional.',
    percentage: 42,
    color: '#C9A740'
  },
  {
    id: 'growth-pattern',
    icon: '📈',
    title: 'Padrão de Crescimento',
    insight: 'Pico em 2020 com 17,5 casos',
    details: 'O maior volume de casos ocorreu em 2020, possivelmente relacionado ao aumento de litígios durante a pandemia. Essa tendência revela ciclos económicos e seu impacto na jurisprudência.',
    percentage: 100,
    color: '#00A0D6'
  },
  {
    id: 'entropy-pattern',
    icon: '🔄',
    title: 'Rigidez do Discurso',
    insight: 'Entropia reduz de 3,5 para 2,8',
    details: 'Quando a expressão "travestida de" aparece, o discurso jurídico se torna 20% mais rígido. Isso demonstra que a expressão funciona como uma "fórmula cristalizada" no direito.',
    percentage: 80,
    color: '#00A0D6'
  }
];

let indiceAtual = 0;

function initStorytelling() {
  const container = document.getElementById('storytelling-carousel');
  if (!container) {
    console.log('Container de storytelling não encontrado');
    return;
  }

  renderStorytelling();
  setupCarouselControls();
}

function renderStorytelling() {
  const container = document.getElementById('storytelling-carousel');
  if (!container) return;

  const dados = storytellingData[indiceAtual];

  const html = `
    <div class="storytelling-card" style="animation: fadeIn 0.5s ease-in-out;">
      <div class="card-header">
        <span class="card-icon">${dados.icon}</span>
        <h4>${dados.title}</h4>
      </div>
      
      <div class="card-insight">
        <p class="insight-main">${dados.insight}</p>
      </div>

      <div class="card-progress">
        <div class="progress-bar" style="width: ${dados.percentage}%; background-color: ${dados.color};"></div>
        <span class="progress-text">${dados.percentage}%</span>
      </div>

      <div class="card-details">
        <p>${dados.details}</p>
      </div>

      <div class="card-pagination">
        <span class="pagination-indicator">${indiceAtual + 1} / ${storytellingData.length}</span>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function setupCarouselControls() {
  const container = document.getElementById('storytelling-carousel');
  if (!container) return;

  // Botões de navegação
  const prevBtn = document.querySelector('[data-carousel-prev]');
  const nextBtn = document.querySelector('[data-carousel-next]');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      indiceAtual = (indiceAtual - 1 + storytellingData.length) % storytellingData.length;
      renderStorytelling();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      indiceAtual = (indiceAtual + 1) % storytellingData.length;
      renderStorytelling();
    });
  }

  // Dots para navegação
  const dotsContainer = document.querySelector('[data-carousel-dots]');
  if (dotsContainer) {
    dotsContainer.innerHTML = storytellingData
      .map((_, idx) => `
        <button class="dot ${idx === indiceAtual ? 'ativo' : ''}" 
                data-dot-index="${idx}"
                aria-label="Ir para slide ${idx + 1}">
        </button>
      `)
      .join('');

    dotsContainer.querySelectorAll('.dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        indiceAtual = parseInt(e.target.getAttribute('data-dot-index'));
        renderStorytelling();
      });
    });
  }
}

function nextSlide() {
  indiceAtual = (indiceAtual + 1) % storytellingData.length;
  renderStorytelling();
}

function prevSlide() {
  indiceAtual = (indiceAtual - 1 + storytellingData.length) % storytellingData.length;
  renderStorytelling();
}

function goToSlide(index) {
  if (index >= 0 && index < storytellingData.length) {
    indiceAtual = index;
    renderStorytelling();
  }
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(initStorytelling, 800);
});

// Exportar para uso global
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;
