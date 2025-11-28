/* ============================================================
   TRAVESTIDA DE V2.0 - GRÁFICOS COM CHART.JS
   Visualizações de dados interativas
   ============================================================ */

// Cores do design system
const colors = {
  azulNeon: '#00A0D6',
  azulProfundo: '#005C7A',
  grafiteEscuro: '#0B0E13',
  cinzaMedio: '#2B313C',
  cinzaClaro: '#BAC3D0',
  amarelo: '#C9A740',
  sucesso: '#10B981',
  aviso: '#F59E0B',
  erro: '#EF4444'
};

// Configurações globais do Chart.js
Chart.defaults.color = colors.cinzaClaro;
Chart.defaults.borderColor = 'rgba(0, 160, 214, 0.1)';
Chart.defaults.font.family = "'Inter', sans-serif";

// ============================================================
// GRÁFICO DE EVOLUÇÃO TEMPORAL (2015-2025)
// ============================================================
function initGraficoEvolucao() {
  const ctx = document.getElementById('graficoEvolucao');
  if (!ctx) return;
  
  const dados = {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [{
      label: 'Número de Acórdãos',
      data: [8, 10, 12, 14, 16, 17.5, 15, 13, 11, 9, 7],
      backgroundColor: [
        'rgba(0, 160, 214, 0.5)',
        'rgba(0, 160, 214, 0.5)',
        'rgba(0, 160, 214, 0.5)',
        'rgba(0, 160, 214, 0.5)',
        'rgba(0, 160, 214, 0.5)',
        'rgba(201, 167, 64, 0.7)', // 2020 - pico destacado
        'rgba(0, 160, 214, 0.5)',
        'rgba(0, 160, 214, 0.5)',
        'rgba(0, 160, 214, 0.5)',
        'rgba(0, 160, 214, 0.5)',
        'rgba(0, 160, 214, 0.5)'
      ],
      borderColor: colors.azulNeon,
      borderWidth: 2,
      borderRadius: 5,
      tension: 0.4,
      fill: true
    }]
  };
  
  const chartEvol = new Chart(ctx, {
    type: 'bar',
    data: dados,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: colors.cinzaClaro,
            font: { size: 14, weight: 'bold' }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(11, 14, 19, 0.9)',
          titleColor: colors.azulNeon,
          bodyColor: colors.cinzaClaro,
          borderColor: colors.azulNeon,
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return 'Casos: ' + context.parsed.y.toFixed(1);
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 20,
          ticks: {
            color: colors.cinzaClaro,
            font: { size: 12 }
          },
          grid: {
            color: 'rgba(0, 160, 214, 0.1)',
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: colors.cinzaClaro,
            font: { size: 12 }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        }
      }
    }
  });

  // aplicar interatividade na legenda e escala visual
  try { setLegendOnClick(chartEvol); } catch(e) { console.warn(e); }
  applyChartScaleToCanvas(ctx);
}

// ============================================================
// GRÁFICO DE PIZZA (DISTRIBUIÇÃO POR TRIBUNAL)
// ============================================================
function initGraficoPizza() {
  const ctx = document.getElementById('graficoPizza');
  if (!ctx) return;
  
  const dados = {
    labels: ['TJ-SP', 'TJ-PR', 'TJ-MG', 'TJ-RJ', 'TJ-SC', 'Outros'],
    datasets: [{
      data: [25, 18, 15, 12, 10, 20],
      backgroundColor: [
        'rgba(0, 160, 214, 0.9)',
        'rgba(0, 160, 214, 0.75)',
        'rgba(0, 160, 214, 0.6)',
        'rgba(0, 160, 214, 0.5)',
        'rgba(0, 160, 214, 0.4)',
        'rgba(0, 160, 214, 0.2)'
      ],
      borderColor: colors.grafiteEscuro,
      borderWidth: 2
    }]
  };
  
  const chartPizza = new Chart(ctx, {
    type: 'doughnut',
    data: dados,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: colors.cinzaClaro,
            font: { size: 13 },
            padding: 15,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: 'rgba(11, 14, 19, 0.9)',
          titleColor: colors.azulNeon,
          bodyColor: colors.cinzaClaro,
          borderColor: colors.azulNeon,
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              return label + ': ' + value + '%';
            }
          }
        }
      }
    }
  });

  try { setLegendOnClick(chartPizza); } catch(e) { console.warn(e); }
  applyChartScaleToCanvas(ctx);
}

// ============================================================
// GRÁFICO DE CONTEXTO JURÍDICO
// ============================================================
function initGraficoContexto() {
  const ctx = document.getElementById('graficoContexto');
  if (!ctx) return;
  
  const dados = {
    labels: ['Direito Civil', 'Direito Empresarial', 'Direito do Consumidor', 'Outros'],
    datasets: [{
      label: 'Percentual de Ocorrências',
      data: [45, 25, 15, 15],
      backgroundColor: [
        colors.azulNeon,
        colors.azulProfundo,
        colors.amarelo,
        'rgba(0, 160, 214, 0.3)'
      ],
      borderColor: colors.grafiteEscuro,
      borderWidth: 2,
      borderRadius: 5
    }]
  };
  
  const chartContexto = new Chart(ctx, {
    type: 'bar',
    data: dados,
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: colors.cinzaClaro,
            font: { size: 12 }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(11, 14, 19, 0.9)',
          titleColor: colors.azulNeon,
          bodyColor: colors.cinzaClaro,
          borderColor: colors.azulNeon,
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: function(context) {
              return context.parsed.x + '%';
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 50,
          ticks: {
            color: colors.cinzaClaro,
            font: { size: 12 },
            callback: function(value) {
              return value + '%';
            }
          },
          grid: {
            color: 'rgba(0, 160, 214, 0.1)',
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: colors.cinzaClaro,
            font: { size: 12 }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        }
      }
    }
  });

  try { setLegendOnClick(chartContexto); } catch(e) { console.warn(e); }
  applyChartScaleToCanvas(ctx);
}

// ============================================================
// GRÁFICO DE ENTROPIA COMPARATIVA
// ============================================================
function initGraficoEntropia() {
  const ctx = document.getElementById('graficoEntropia');
  if (!ctx) return;
  
  const dados = {
    labels: ['Sem "travestida de"', 'Com "travestida de"'],
    datasets: [{
      label: 'Valor de Entropia (S*)',
      data: [3.5, 2.8],
      backgroundColor: [colors.sucesso, colors.erro],
      borderColor: colors.grafiteEscuro,
      borderWidth: 2,
      borderRadius: 5
    }]
  };
  
  const chartEntropia = new Chart(ctx, {
    type: 'bar',
    data: dados,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: 'x',
      plugins: {
        legend: {
          display: true,
          labels: {
            color: colors.cinzaClaro,
            font: { size: 12 }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(11, 14, 19, 0.9)',
          titleColor: colors.azulNeon,
          bodyColor: colors.cinzaClaro,
          borderColor: colors.azulNeon,
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: function(context) {
              return 'Entropia: ' + context.parsed.y.toFixed(2);
            },
            afterLabel: function(context) {
              if (context.dataIndex === 0) {
                return 'Discurso flexível';
              } else {
                return 'Discurso rígido (20% redução)';
              }
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 4,
          ticks: {
            color: colors.cinzaClaro,
            font: { size: 12 }
          },
          grid: {
            color: 'rgba(0, 160, 214, 0.1)',
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: colors.cinzaClaro,
            font: { size: 12 }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        }
      }
    }
  });

  try { setLegendOnClick(chartEntropia); } catch(e) { console.warn(e); }
  applyChartScaleToCanvas(ctx);
}

// ============================================================
// GRÁFICO DE ENTROPIA COMPARATIVA (PARA ALGORITMO)
// ============================================================
function initGraficoEntropiaComparativa(entropiaTexto) {
  const ctx = document.getElementById('graficoEntropiaComparativa');
  if (!ctx) return;
  
  // Limpar gráfico anterior se existir
  const existingChart = Chart.getChart(ctx);
  if (existingChart) {
    existingChart.destroy();
  }
  
  const dados = {
    labels: ['Seu Texto', 'Média (Com "travestida de")', 'Média (Sem "travestida de")'],
    datasets: [{
      label: 'Entropia (S*)',
      data: [entropiaTexto, 2.8, 3.5],
      backgroundColor: [colors.amarelo, colors.erro, colors.sucesso],
      borderColor: colors.grafiteEscuro,
      borderWidth: 2,
      borderRadius: 5
    }]
  };
  
  const chartEntropiaComp = new Chart(ctx, {
    type: 'bar',
    data: dados,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: colors.cinzaClaro,
            font: { size: 12 }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(11, 14, 19, 0.9)',
          titleColor: colors.azulNeon,
          bodyColor: colors.cinzaClaro,
          borderColor: colors.azulNeon,
          borderWidth: 1,
          padding: 12
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 4,
          ticks: {
            color: colors.cinzaClaro,
            font: { size: 12 }
          },
          grid: {
            color: 'rgba(0, 160, 214, 0.1)',
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: colors.cinzaClaro,
            font: { size: 12 }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        }
      }
    }
  });

  try { setLegendOnClick(chartEntropiaComp); } catch(e) { console.warn(e); }
  applyChartScaleToCanvas(ctx);
}

// ============================================================
// INICIALIZAÇÃO DE TODOS OS GRÁFICOS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  // Pequeno delay para garantir que o DOM está pronto
  setTimeout(() => {
    initGraficoEvolucao();
    initGraficoPizza();
    initGraficoContexto();
    initGraficoEntropia();
    // construir CTA/legendas dinâmicas
    setTimeout(() => { buildCTALegends(); }, 250);
  }, 100);
});

/* ============================================================
   HELPERS: aplicar escala, legenda interativa, CTA
   - setLegendOnClick: define comportamento ao clicar na legenda
   - applyChartScaleToCanvas: aplica classes CSS para reduzir visual
   - buildCTALegends: cria um pequeno CTA flutuante com botões de legenda
   ============================================================ */

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

function temporaryHighlight(el) {
  if (!el) return;
  el.classList.add('highlight-anchor');
  setTimeout(() => el.classList.remove('highlight-anchor'), 2000);
}

function setLegendOnClick(chart) {
  if (!chart || !chart.options || !chart.options.plugins || !chart.options.plugins.legend) return;

  chart.options.plugins.legend.onClick = function(e, legendItem, legend) {
    const label = legendItem.text || (legend.chart.data.labels && legend.chart.data.labels[legendItem.index]) || '';
    const id = slugify(label);
    const el = document.getElementById(id);

    if (el) {
      const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
      window.scrollTo({ top: el.offsetTop - headerHeight - 20, behavior: 'smooth' });
      temporaryHighlight(el);
    } else {
      if (typeof showNotification === 'function') {
        showNotification(`Seção "${label}" não encontrada na página`);
      }
    }
  };

  chart.update();
}

function applyChartScaleToCanvas(canvasElem) {
  try {
    if (!canvasElem) return;
    // se recebeu contexto (ctx) e não elemento, tentar obter elemento
    const canvas = (canvasElem.canvas) ? canvasElem.canvas : canvasElem;
    canvas.classList.add('chart-canvas', 'chart-scale-70');
  } catch (e) {
    console.warn('Não foi possível aplicar escala ao canvas', e);
  }
}

function buildCTALegends() {
  // evitar construir duplicado
  if (document.getElementById('ctaLegendContainer')) return;

  const container = document.createElement('div');
  container.id = 'ctaLegendContainer';
  container.className = 'cta-legend';
  container.innerHTML = `<h4>Explorar Legendas</h4><ul id="ctaLegendList"></ul>`;
  document.body.appendChild(container);

  const list = container.querySelector('#ctaLegendList');

  const canvasIds = ['graficoEvolucao','graficoPizza','graficoContexto','graficoEntropia','graficoEntropiaComparativa'];

  canvasIds.forEach(cid => {
    const c = document.getElementById(cid);
    if (!c) return;
    const chart = Chart.getChart(c);
    if (!chart) return;

    const labels = chart.data.labels || [];
    labels.forEach(label => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.textContent = label;
      btn.addEventListener('click', () => {
        const id = slugify(label);
        const el = document.getElementById(id);
        if (el) {
          const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
          window.scrollTo({ top: el.offsetTop - headerHeight - 20, behavior: 'smooth' });
          temporaryHighlight(el);
        } else {
          if (typeof showNotification === 'function') showNotification(`Seção "${label}" não encontrada`);
        }
      });
      li.appendChild(btn);
      list.appendChild(li);
    });
  });
}

// tornar função disponível globalmente
window.buildCTALegends = buildCTALegends;

// ============================================================
// EXPORT PARA OUTRAS FUNÇÕES
// ============================================================
window.initGraficoEntropiaComparativa = initGraficoEntropiaComparativa;
