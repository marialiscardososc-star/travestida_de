/* ============================================================
   TRAVESTIDA DE V2.0 - SISTEMA DE MODAIS E POPOVERS
   Gerencia interatividade de tags de conceito e cards clicáveis
   ============================================================ */

// ============================================================
// DICIONÁRIO DE DEFINIÇÕES
// ============================================================
const definicoesConceitosJuridicos = {
  'simulacao': {
    titulo: '🏛️ Simulação',
    frequencia: '45%',
    definicao: 'Frequência: 45%. É o contexto principal. A expressão atua como marcador técnico do vício social do negócio jurídico (Arts. 167-168 do Código Civil), indicando que o ato aparente esconde uma intenção diversa da declarada.'
  },
  'doacao': {
    titulo: '🎁 Doação',
    frequencia: '15%',
    definicao: 'Frequência: 15%. Frequentemente associada a fraudes sucessórias ou lesão à meação, onde uma venda é "travestida" para encobrir uma doação inoficiosa e prejudicar herdeiros.'
  },
  'compra-venda': {
    titulo: '💼 Compra e Venda',
    frequencia: '12%',
    definicao: 'Frequência: 12%. Utilizada para mascarar transferências de propriedade, muitas vezes ocultando agiotagem (garantia de empréstimo) ou fraude contra credores.'
  },
  'fomento': {
    titulo: '📊 Fomento / Factoring',
    frequencia: '10%',
    definicao: 'Frequência: 10%. Comum no Direito Empresarial. A expressão é usada para descaracterizar operações de empréstimo pessoal (privativas de bancos) que foram disfarçadas de fomento mercantil ou cessão de crédito.'
  },
  'factoring': {
    titulo: '📈 Factoring',
    frequencia: '8%',
    definicao: 'Frequência: 8%. Operação comercial frequentemente disfarçada de investimento, envolvendo a aquisição de direitos creditórios por instituições financeiras não-bancárias.'
  },
  'entropia-shannon': {
    titulo: '⚡ Entropia de Shannon',
    frequencia: 'Conceito Fundamental',
    definicao: 'Medida da desordem ou imprevisibilidade de um sistema. No discurso, alta entropia significa criatividade e variedade; baixa entropia significa repetição e rigidez. Fórmula: S* = -Σ p(x) · log₂ p(x)'
  }
};

const definicoesConceitosAplicacoes = {
  'jurisprudencia': {
    titulo: '📜 Jurisprudência',
    definicao: 'A métrica de entropia pode servir como ferramenta de autocrítica para magistrados, ajudando a identificar se suas fundamentações estão excessivamente repetitivas e automatizadas (baixa entropia) ou se consideram as nuances específicas do caso concreto.'
  },
  'jornalismo': {
    titulo: '📰 Jornalismo',
    definicao: 'Aplicação na Análise de Enquadramento (Framing): Identificar como a mídia utiliza marcadores estigmatizantes repetitivos para cristalizar narrativas sobre grupos vulneráveis, reduzindo a complexidade dos fatos.'
  },
  'politica': {
    titulo: '🏛️ Política',
    definicao: 'Monitoramento de discurso parlamentar para identificar "pontos de congelamento" ideológico, onde o debate perde flexibilidade e se torna mera repetição de slogans (baixa entropia).'
  },
  'publicidade': {
    titulo: '📢 Publicidade',
    definicao: 'Análise de campanhas publicitárias para detectar uso de linguagem repetitiva (baixa entropia) que busca cristalizar marcas e mensagens, versus estratégias de criatividade (alta entropia) que inovam narrativas de consumo.'
  },
  'educacao': {
    titulo: '🎓 Educação',
    definicao: 'Uso da Física Informacional como ferramenta didática para ensinar análise crítica de texto, reconhecimento de padrões discursivos, e desenvolvimento de pensamento transdisciplinar em estudantes.'
  }
};

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    initModalsEventListeners();
  }, 300);
});

// ============================================================
// SISTEMA DE MODAIS E EVENTOS
// ============================================================
function initModalsEventListeners() {
  // Palavras-chave (conceitos jurídicos)
  const palavrasChave = document.querySelectorAll('.word-cloud .tag-conceito');
  palavrasChave.forEach(palavra => {
    palavra.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const conceptId = palavra.getAttribute('data-conceito-id') || '';
      const mainKey = conceptId.replace('conceito-', '');
      mostrarModalConceito(mainKey, palavra);
    });
  });

  // Cards de aplicações
  const aplicacoes = document.querySelectorAll('.aplicacoes .aplicacao.tag-conceito');
  aplicacoes.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const conceptId = card.getAttribute('data-conceito-id') || '';
      const mainKey = conceptId.replace('aplicacao-', '');
      mostrarModalAplicacao(mainKey, card);
    });
  });

  // Fechar modais ao clicar fora
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.tag-conceito') && !e.target.closest('.concept-modal')) {
      fecharTodosModais();
    }
  });
}

function mostrarModalConceito(chave, elemento) {
  fecharTodosModais();

  const dados = definicoesConceitosJuridicos[chave];
  if (!dados) return;

  const modal = criarModalHTML(dados.titulo, dados.frequencia, dados.definicao);
  document.body.appendChild(modal);

  posicionarModalProximo(modal, elemento);
  modal.classList.add('show');
}

function mostrarModalAplicacao(chave, elemento) {
  fecharTodosModais();

  const dados = definicoesConceitosAplicacoes[chave];
  if (!dados) return;

  const modal = criarModalHTML(dados.titulo, '', dados.definicao);
  document.body.appendChild(modal);

  posicionarModalProximo(modal, elemento);
  modal.classList.add('show');
}

function criarModalHTML(titulo, frequencia, conteudo) {
  const modal = document.createElement('div');
  modal.className = 'concept-modal';
  modal.id = 'modal-' + Date.now();

  let freqHtml = '';
  if (frequencia) {
    freqHtml = `<div class="modal-frequency" style="font-size: var(--fs-sm); color: var(--azul-neon); font-weight: 600; margin-bottom: 8px;">Frequência: ${frequencia}</div>`;
  }

  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" onclick="this.parentElement.parentElement.remove()">✕</button>
      <h4 style="margin-top: 0; color: var(--amarelo-destaque);">${titulo}</h4>
      ${freqHtml}
      <p style="margin: 0; color: var(--cinza-claro); line-height: 1.5; font-size: 0.95rem;">${conteudo}</p>
    </div>
  `;

  modal.style.cssText = `
    position: fixed;
    z-index: 3000;
    opacity: 0;
    transition: opacity 0.3s ease-out;
  `;

  return modal;
}

function posicionarModalProximo(modal, elemento) {
  // Isso será feito após o render
  setTimeout(() => {
    const rect = elemento.getBoundingClientRect();
    let top = rect.top + window.scrollY - modal.offsetHeight - 12;
    let left = rect.left + window.scrollX + (rect.width / 2) - (modal.offsetWidth / 2);

    // Ajustes de overflow
    if (top < 100) {
      top = rect.bottom + window.scrollY + 12;
    }

    if (left + modal.offsetWidth > window.innerWidth) {
      left = window.innerWidth - modal.offsetWidth - 20;
    }

    if (left < 20) {
      left = 20;
    }

    modal.style.top = top + 'px';
    modal.style.left = left + 'px';
  }, 0);
}

function fecharTodosModais() {
  const modais = document.querySelectorAll('.concept-modal');
  modais.forEach(modal => modal.remove());
}

// ============================================================
// EXPORTAR FUNÇÕES GLOBAIS
// ============================================================
window.mostrarModalConceito = mostrarModalConceito;
window.mostrarModalAplicacao = mostrarModalAplicacao;
window.fecharTodosModais = fecharTodosModais;