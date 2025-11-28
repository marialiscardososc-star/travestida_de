/* ============================================================
   SISTEMA DE FILTROS POR TRIBUNAL
   Gerencia a filtragem de dados por tribunal (TJ-SP, TJ-PR, etc)
   ============================================================ */

const tribunalData = {
  'TJ-SP': {
    percentage: 25,
    cases: 25,
    label: 'TJ-SP',
    region: 'São Paulo'
  },
  'TJ-PR': {
    percentage: 18,
    cases: 18,
    label: 'TJ-PR',
    region: 'Paraná'
  },
  'TJ-MG': {
    percentage: 15,
    cases: 15,
    label: 'TJ-MG',
    region: 'Minas Gerais'
  },
  'Outros': {
    percentage: 42,
    cases: 42,
    label: 'Outros Tribunais',
    region: 'Diversas'
  }
};

let filtroAtual = null;

function initFiltros() {
  const botoesFiltro = document.querySelectorAll('[data-filtro-tribunal]');
  
  botoesFiltro.forEach(botao => {
    botao.addEventListener('click', (e) => {
      e.preventDefault();
      const tribunal = botao.getAttribute('data-filtro-tribunal');
      aplicarFiltro(tribunal);
    });
  });
  
  // console.log('Sistema de filtros inicializado com', botoesFiltro.length, 'botões');
}

function aplicarFiltro(tribunal) {
  filtroAtual = tribunal === 'todos' ? null : tribunal;
  
  // Atualizar estado dos botões
  const botoesFiltro = document.querySelectorAll('[data-filtro-tribunal]');
  botoesFiltro.forEach(botao => {
    const tribunalBotao = botao.getAttribute('data-filtro-tribunal');
    if (tribunalBotao === tribunal) {
      botao.classList.add('ativo');
    } else {
      botao.classList.remove('ativo');
    }
  });
  
  // Filtrar e atualizar visualizações
  filtrarResultados(tribunal);
  atualizarGraficos(tribunal);
  
  // Scroll para resultados
  const secaoResultados = document.getElementById('resultados');
  if (secaoResultados) {
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 80;
    window.scrollTo({
      top: secaoResultados.offsetTop - headerHeight,
      behavior: 'smooth'
    });
  }
  
  // Notificação
  if (tribunal !== 'todos') {
    const nomeTribunal = tribunalData[tribunal]?.label || tribunal;
    const percentage = tribunalData[tribunal]?.percentage || 0;
    showNotification(`Filtro aplicado: ${nomeTribunal} (${percentage}% dos casos)`, 'success');
  } else {
    showNotification('Filtro removido. Mostrando todos os dados.', 'success');
  }
}

function filtrarResultados(tribunal) {
  const secoes = document.querySelectorAll('[data-tribunal-content]');
  
  secoes.forEach(secao => {
    const tribunaisSecao = secao.getAttribute('data-tribunal-content').split(',').map(t => t.trim());
    
    if (tribunal === 'todos' || tribunaisSecao.includes(tribunal) || tribunaisSecao.includes('todos')) {
      secao.style.display = 'block';
      secao.style.opacity = '1';
      secao.style.pointerEvents = 'auto';
    } else {
      secao.style.opacity = '0.4';
      secao.style.pointerEvents = 'none';
    }
  });
}

function atualizarGraficos(tribunal) {
  // Esta função pode ser expandida para atualizar gráficos em tempo real
  // console.log('Gráficos atualizados para tribunal:', tribunal);
}

function showNotification(message, type = 'info') {
  // Remover notificação anterior se existir
  const notificationAnterior = document.querySelector('.notification');
  if (notificationAnterior) {
    notificationAnterior.remove();
  }
  
  // Criar nova notificação
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Remover após 4 segundos
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease-out reverse';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

function getTribunal(code) {
  return tribunalData[code];
}

function getTodosTribunais() {
  return Object.values(tribunalData);
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(initFiltros, 500);
});

// Exportar para uso global
window.aplicarFiltro = aplicarFiltro;
window.getTribunal = getTribunal;
window.getTodosTribunais = getTodosTribunais;
window.showNotification = showNotification;

