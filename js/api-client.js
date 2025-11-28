/* ============================================================
   TRAVESTIDA DE V2.0 - CLIENTE API
   Gerencia chamadas HTTP para o backend FastAPI
   ============================================================ */

const API_BASE_URL = 'http://127.0.0.1:5000';

// ============================================================
// CONFIGURAÇÃO GLOBAL
// ============================================================
let filtroTribunalAtual = null;

// ============================================================
// UTILITIES
// ============================================================
async function fetchAPI(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar ${endpoint}:`, error);
    return null;
  }
}

async function postAPI(endpoint, payload) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto: payload })
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao fazer POST em ${endpoint}:`, error);
    return null;
  }
}

// ============================================================
// CARREGAR DADOS DO DASHBOARD
// ============================================================
async function carregarDashboard() {
  console.log('📊 Carregando dados do dashboard...');
  
  const dados = await fetchAPI('/api/dashboard');
  if (!dados) {
    console.warn('Dashboard não disponível - usando dados locais');
    return;
  }

  // Atualizar badges principais (se existirem elementos)
  const badges = document.querySelectorAll('.badge-number');
  if (badges.length >= 1) badges[0].textContent = dados.data.total_acordaos;
  if (badges.length >= 2) badges[1].textContent = dados.data.taxa_procedencia;
  if (badges.length >= 3) badges[2].textContent = dados.data.entropia_reducao;
  
  console.log('✅ Dashboard carregado');
}

// ============================================================
// CARREGAR GRÁFICOS (COM DELAY PARA GARANTIR RENDERIZAÇÃO)
// ============================================================
async function carregarGraficosComAPI() {
  console.log('📈 Carregando dados dos gráficos...');

  // Esperar DOM estar pronto
  setTimeout(async () => {
    // Evolução Temporal
    const evolucao = await fetchAPI('/api/evolucao-temporal');
    if (evolucao) atualizarGraficoEvolucao(evolucao.data);

    // Distribuição de Tribunais
    const distribuicao = await fetchAPI('/api/distribuicao-tribunais');
    if (distribuicao) atualizarGraficoPizza(distribuicao.data);

    // Contexto Jurídico
    const contexto = await fetchAPI('/api/contexto-juridico');
    if (contexto) atualizarGraficoContexto(contexto.data);

    // Entropia
    const entropia = await fetchAPI('/api/entropia-comparacao');
    if (entropia) atualizarGraficoEntropia(entropia.data);

    console.log('✅ Gráficos carregados');
  }, 1500);
}

// ============================================================
// ATUALIZAR GRÁFICOS (HELPER FUNCTIONS)
// ============================================================
function atualizarGraficoEvolucao(data) {
  const ctx = document.getElementById('graficoEvolucao');
  if (!ctx) return;

  const chart = Chart.getChart(ctx);
  if (chart) chart.destroy();

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        label: data.datasets[0].label,
        data: data.datasets[0].data,
        backgroundColor: 'rgba(0, 160, 214, 0.6)',
        borderColor: '#00A0D6',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: '#BAC3D0' } } },
      scales: {
        y: { beginAtZero: true, ticks: { color: '#BAC3D0' }, grid: { color: 'rgba(0,160,214,0.1)' } }
      }
    }
  });
}

function atualizarGraficoPizza(data) {
  const ctx = document.getElementById('graficoPizza');
  if (!ctx) return;

  const chart = Chart.getChart(ctx);
  if (chart) chart.destroy();

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.labels,
      datasets: [{
        data: data.casos,
        backgroundColor: [
          'rgba(0, 160, 214, 0.8)',
          'rgba(0, 160, 214, 0.6)',
          'rgba(0, 160, 214, 0.4)',
          'rgba(0, 160, 214, 0.3)',
          'rgba(0, 160, 214, 0.2)',
          'rgba(0, 160, 214, 0.1)'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom', labels: { color: '#BAC3D0' } } }
    }
  });
}

function atualizarGraficoContexto(data) {
  const ctx = document.getElementById('graficoContexto');
  if (!ctx) return;

  const chart = Chart.getChart(ctx);
  if (chart) chart.destroy();

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Percentual (%)',
        data: data.datasets[0].data,
        backgroundColor: '#00A0D6',
        borderColor: '#00A0D6',
        borderWidth: 2
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      scales: {
        x: { beginAtZero: true, max: 50, ticks: { color: '#BAC3D0', callback: v => v + '%' } }
      }
    }
  });
}

function atualizarGraficoEntropia(data) {
  const ctx = document.getElementById('graficoEntropia');
  if (!ctx) return;

  const chart = Chart.getChart(ctx);
  if (chart) chart.destroy();

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Entropia (S*)',
        data: data.datasets[0].data,
        backgroundColor: ['#10B981', '#EF4444'],
        borderColor: ['#059669', '#DC2626'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, max: 4, ticks: { color: '#BAC3D0' } }
      }
    }
  });
}

// ============================================================
// FILTRO POR TRIBUNAL
// ============================================================
async function filtrarPorTribunal(tribunalCode) {
  console.log(`🏛️ Filtrando por ${tribunalCode}...`);
  
  filtroTribunalAtual = tribunalCode;
  
  const dados = await fetchAPI(`/api/filtro/tribunal/${tribunalCode}`);
  if (!dados) {
    alert('Erro ao filtrar dados. Tente novamente.');
    return;
  }

  // Atualizar seção com os dados do tribunal
  const tribunalInfo = document.querySelector('#resultados-tribunal') || criarSeccaoFiltro();
  tribunalInfo.innerHTML = `
    <h3>📍 Filtrando por ${dados.data.tribunal}</h3>
    <p><strong>Casos:</strong> ${dados.data.casos}</p>
    <p><strong>Percentual do Total:</strong> ${dados.data.percentual}%</p>
    <p><strong>Entropia Média:</strong> ${dados.data.entropia_media}</p>
  `;

  console.log('✅ Filtro aplicado');
}

function criarSeccaoFiltro() {
  const secao = document.createElement('div');
  secao.id = 'resultados-tribunal';
  secao.style.cssText = `
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: rgba(0, 160, 214, 0.05);
    border-left: 4px solid var(--azul-neon);
    border-radius: 8px;
  `;
  document.querySelector('main').appendChild(secao);
  return secao;
}

// ============================================================
// ANÁLISE DE TEXTO PERSONALIZADO
// ============================================================
async function analisarTextoComAPI(texto) {
  console.log('🔍 Analisando texto...');
  
  if (!texto || texto.trim().length < 20) {
    alert('Por favor, cole um texto com pelo menos 20 caracteres');
    return null;
  }

  const resultado = await postAPI('/api/calcular-entropia', texto);
  if (!resultado) {
    alert('Erro ao analisar texto');
    return null;
  }

  return resultado.data;
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  // Verificar se API está disponível
  fetchAPI('/health').then(data => {
    if (data && data.status === 'ok') {
      console.log('✅ API Backend disponível');
      carregarDashboard();
      carregarGraficosComAPI();
    } else {
      console.warn('⚠️ API Backend não disponível - usando dados locais');
    }
  });
});

// ============================================================
// EXPORTAR FUNÇÕES
// ============================================================
window.filtrarPorTribunal = filtrarPorTribunal;
window.analisarTextoComAPI = analisarTextoComAPI;
window.carregarDashboard = carregarDashboard;
window.carregarGraficosComAPI = carregarGraficosComAPI;

