/* ============================================================
   📊 DADOS — EVOLUÇÃO TEMPORAL DA EXPRESSÃO
   ============================================================ */

const dadosEvolucao = [
  { ano: 2015, casos: 8 },
  { ano: 2016, casos: 10 },
  { ano: 2017, casos: 12 },
  { ano: 2018, casos: 15 },
  { ano: 2019, casos: 16 },
  { ano: 2020, casos: 18, pico: true }, // pico
  { ano: 2021, casos: 14 },
  { ano: 2022, casos: 12 },
  { ano: 2023, casos: 10 },
  { ano: 2024, casos: 7 },
];

/* ============================================================
   📈 1) GRÁFICO DE BARRAS DINÂMICO
   ============================================================ */

function renderChart() {
  const container = document.getElementById('chart-evolucao');
  if (!container) return;

  const maxCasos = Math.max(...dadosEvolucao.map(d => d.casos));
  let htmlContent = '';

  dadosEvolucao.forEach(item => {
    const largura = (item.casos / maxCasos) * 100;
    const classePico = item.pico ? ' pico' : '';

    htmlContent += `
      <div class="barra-grafico${classePico}" style="width:${largura}%;">
        <span>${item.ano}</span>
        <span>${item.casos} casos</span>
      </div>
    `;
  });

  container.innerHTML = htmlContent;
}

/* ============================================================
   🔁 2) TOGGLE DE ENTROPIA
   ============================================================ */

function toggleEntropia() {
  const checkbox = document.getElementById('entropiaToggle');
  const valorElement = document.getElementById('entropiaValor');
  const descricaoElement = document.getElementById('entropiaDescricao');
  if (!checkbox || !valorElement || !descricaoElement) return;

  const isChecked = checkbox.checked;

  if (isChecked) {
    // COM "travestida de" → entropia mais baixa, mais previsível
    valorElement.textContent = 'S* = 2,8';
    descricaoElement.textContent = 'Baixa variabilidade lexical. Alta previsibilidade (82%).';
    valorElement.style.color = '#00A0D6'; // azul-neon
  } else {
    // SEM "travestida de" → entropia mais alta, menos previsível
    valorElement.textContent = 'S* = 3,5';
    descricaoElement.textContent = 'Maior variabilidade lexical. Menos previsibilidade.';
    valorElement.style.color = '#C9A740'; // amarelo-destaque
  }
}

/* ============================================================
   📚 3) ACORDEÃO (AGENDA DE PESQUISAS FUTURAS)
   ============================================================ */

function toggleAccordion(idPainel) {
  const painel = document.getElementById(idPainel);
  if (!painel) return;

  // o botão é aquele que chamou essa função
  const botao = event.currentTarget || document.querySelector(
    `.acordeao-botao[onclick*="${idPainel}"]`
  );

  if (botao) {
    botao.classList.toggle('ativo');
  }

  if (painel.style.maxHeight) {
    // fechar
    painel.style.maxHeight = null;
    painel.style.paddingTop = '0';
    painel.style.paddingBottom = '0';
  } else {
    // abrir
    painel.style.maxHeight = painel.scrollHeight + 'px';
    painel.style.paddingTop = '12px';
    painel.style.paddingBottom = '14px';
  }
}

/* ============================================================
   🔍 4) BUSCA DE CONTEÚDO NA PÁGINA
   ============================================================ */

function buscarConteudo() {
  const input = document.getElementById('searchInput');
  const main = document.querySelector('main');
  if (!input || !main) return;

  const termo = input.value.toLowerCase().trim();
  removerHighlights(main);

  if (!termo) {
    alert("Digite um termo para buscar (ex.: 'entropia', 'simulação', '85%').");
    return;
  }

  let ocorrencias = 0;
  const regex = new RegExp(termo, 'gi');

  main.innerHTML = main.innerHTML.replace(regex, match => {
    ocorrencias++;
    return `<span class="highlight">${match}</span>`;
  });

  if (ocorrencias > 0) {
    alert(`Foram encontradas ${ocorrencias} ocorrência(s) de "${termo}".`);
    const primeiro = document.querySelector('.highlight');
    if (primeiro) {
      primeiro.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  } else {
    alert(`Nenhuma ocorrência encontrada para "${termo}".`);
  }
}

function removerHighlights(elemento) {
  const spans = elemento.querySelectorAll('.highlight');
  spans.forEach(span => {
    const parent = span.parentNode;
    parent.replaceChild(document.createTextNode(span.textContent), span);
    parent.normalize();
  });
}

/* ============================================================
   🧭 5) SCROLL SUAVE PARA OS LINKS DO MENU
   ============================================================ */

function ativarScrollSuave() {
  const links = document.querySelectorAll('nav a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const alvo = document.querySelector(link.getAttribute('href'));
      if (alvo) {
        const offset = 90; // altura aproximada do header
        const top = alvo.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ============================================================
   ✨ 6) ANIMAÇÃO DE ENTRADA DAS SEÇÕES
   ============================================================ */

function ativarAnimacoesScroll() {
  const observer = new IntersectionObserver(entries => {
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

  const secoes = document.querySelectorAll('.secao');
  secoes.forEach(secao => {
    secao.style.opacity = '0';
    secao.style.transform = 'translateY(20px)';
    secao.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(secao);
  });
}

/* ============================================================
   🚀 INICIALIZAÇÃO GERAL
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Renderiza o gráfico de barras
  renderChart();

  // 2. Ativa scroll suave no menu
  ativarScrollSuave();

  // 3. Ativa Enter na busca
  const input = document.getElementById('searchInput');
  if (input) {
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        buscarConteudo();
      }
    });
  }

  // 4. Garante estado inicial do comparador de entropia
  toggleEntropia();

  // 5. Ativa animações de scroll
  ativarAnimacoesScroll();

  // 6. Log de inicialização
  console.log('🎯 Sistema inicializado com sucesso!');
  console.log('📊 Dados carregados:', dadosEvolucao.length, 'anos');
});
