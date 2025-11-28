/* ============================================================
   TRAVESTIDA DE V2.0 - FILTRO DE TRIBUNAIS
   Sistema de filtro funcional para dados de acórdãos por tribunal
   ============================================================ */

// Estado global do filtro
let currentTribunalFilter = null;

// Dados simulados de acórdãos por tribunal
const acordaosByTribunal = {
  'TJ-SP': {
    count: 25,
    percentage: 25,
    description: 'Tribunal de Justiça de São Paulo - Concentração maior em litígios comerciais e cíveis'
  },
  'TJ-PR': {
    count: 18,
    percentage: 18,
    description: 'Tribunal de Justiça do Paraná - Casos significativos em negócios jurídicos'
  },
  'TJ-MG': {
    count: 15,
    percentage: 15,
    description: 'Tribunal de Justiça de Minas Gerais - Distribuição equilibrada entre áreas'
  },
  'Outros': {
    count: 42,
    percentage: 42,
    description: 'Demais tribunais brasileiros distribuídos regionalmente'
  }
};

// ============================================================
// INICIALIZAÇÃO DO FILTRO
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  initTribunalFilter();
});

function initTribunalFilter() {
  const tribunalBtns = document.querySelectorAll('.tribunal-btn');
  
  tribunalBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const tribunal = this.getAttribute('data-tribunal');
      
      if (tribunal === currentTribunalFilter) {
        // Desselecionar se já está selecionado
        resetTribunalFilter();
      } else {
        // Selecionar novo tribunal
        applyTribunalFilter(tribunal);
      }
    });
  });
}

// ============================================================
// APLICAR FILTRO POR TRIBUNAL
// ============================================================
function applyTribunalFilter(tribunal) {
  currentTribunalFilter = tribunal;
  
  // Atualizar estado visual dos botões
  const tribunalBtns = document.querySelectorAll('.tribunal-btn');
  tribunalBtns.forEach(btn => {
    if (btn.getAttribute('data-tribunal') === tribunal) {
      btn.classList.add('tribunal-btn-active');
    } else {
      btn.classList.remove('tribunal-btn-active');
    }
  });
  
  // Filtrar dados na página
  filterResultadosByTribunal(tribunal);
  
  // Mostrar notificação
  const tribunalData = acordaosByTribunal[tribunal];
  showNotification(`Filtrado: ${tribunal} (${tribunalData.count} acórdãos - ${tribunalData.percentage}%)`);
}

// ============================================================
// RESETAR FILTRO
// ============================================================
function resetTribunalFilter() {
  currentTribunalFilter = null;
  
  // Remover estado ativo dos botões
  const tribunalBtns = document.querySelectorAll('.tribunal-btn');
  tribunalBtns.forEach(btn => {
    btn.classList.remove('tribunal-btn-active');
  });
  
  // Mostrar todos os resultados
  showAllResultados();
  
  // Mostrar notificação
  showNotification('Filtro removido - mostrando todos os acórdãos');
}

// ============================================================
// FILTRAR RESULTADOS (SIMULADO)
// ============================================================
function filterResultadosByTribunal(tribunal) {
  const secaoResultados = document.getElementById('resultados');
  if (!secaoResultados) return;
  
  // Adicionar classe para aplicar estilos CSS de filtro
  secaoResultados.classList.add('tribunal-filtered');
  secaoResultados.setAttribute('data-tribunal-filter', tribunal);
  
  // Scroll para a seção de resultados
  const headerHeight = document.querySelector('header').offsetHeight;
  const targetPosition = secaoResultados.offsetTop - headerHeight;
  
  setTimeout(() => {
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }, 300);
}

// ============================================================
// MOSTRAR TODOS OS RESULTADOS
// ============================================================
function showAllResultados() {
  const secaoResultados = document.getElementById('resultados');
  if (!secaoResultados) return;
  
  secaoResultados.classList.remove('tribunal-filtered');
  secaoResultados.removeAttribute('data-tribunal-filter');
}

// ============================================================
// EXPORTAR PARA ESCOPO GLOBAL
// ============================================================
window.applyTribunalFilter = applyTribunalFilter;
window.resetTribunalFilter = resetTribunalFilter;
window.filterResultadosByTribunal = filterResultadosByTribunal;
