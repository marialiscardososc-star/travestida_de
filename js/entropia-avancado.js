/* ============================================================
   TRAVESTIDA DE V2.0 - ANÁLISE AVANÇADA DE ENTROPIA
   Algoritmo de análise visual de rigidez/flexibilidade discursiva
   Baseado em Física Informacional e Análise do Discurso
   ============================================================ */

// ============================================================
// CLASSE PRINCIPAL: ANALISADOR DE ENTROPIA
// ============================================================

class AnalisadorEntropia {
  constructor() {
    this.corpus = [];
    this.frequencias = {};
    this.entropia = 0;
    this.entropiaMaxima = 0;
    this.entropiaNormalizada = 0;
    this.padroes = [];
    this.palavrasChave = [];
    this.visualizacoes = {};
  }

  // ============================================================
  // MÉTODO 1: NORMALIZAÇÃO E TOKENIZAÇÃO
  // ============================================================
  
  normalizarTexto(texto) {
    /**
     * Normaliza o texto removendo pontuação, convertendo para minúsculas
     * e preparando para análise
     */
    return texto
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  tokenizar(texto) {
    /**
     * Tokeniza o texto em palavras, removendo stopwords
     * Stopwords: palavras comuns que não agregam significado
     */
    const stopwords = new Set([
      'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas',
      'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas',
      'e', 'ou', 'mas', 'porém', 'contudo', 'todavia',
      'que', 'qual', 'quais', 'quanto', 'quantos',
      'é', 'são', 'foi', 'foram', 'ser', 'estar',
      'para', 'por', 'com', 'sem', 'sobre', 'entre',
      'ao', 'aos', 'à', 'às', 'pelo', 'pela', 'pelos', 'pelas',
      'este', 'esse', 'aquele', 'esta', 'essa', 'aquela',
      'isto', 'isso', 'aquilo',
      'eu', 'tu', 'ele', 'ela', 'nós', 'vós', 'eles', 'elas',
      'me', 'te', 'se', 'nos', 'vos', 'lhe', 'lhes',
      'meu', 'teu', 'seu', 'nosso', 'vosso',
      'muito', 'pouco', 'todo', 'outro', 'mesmo', 'próprio',
      'já', 'ainda', 'nunca', 'sempre', 'talvez',
      'aqui', 'aí', 'ali', 'cá', 'lá', 'onde',
      'como', 'quando', 'onde', 'porque', 'pois',
      'não', 'sim', 'há', 'haja'
    ]);

    const tokens = texto.split(/\s+/)
      .filter(token => token.length > 2 && !stopwords.has(token));

    return tokens;
  }

  // ============================================================
  // MÉTODO 2: CÁLCULO DE ENTROPIA DE SHANNON
  // ============================================================

  calcularEntropia(tokens) {
    /**
     * Calcula a entropia de Shannon do corpus
     * Fórmula: S* = -Σ p(x) · log₂ p(x)
     * 
     * Entropia alta = discurso flexível, variado
     * Entropia baixa = discurso rígido, previsível
     */
    
    if (tokens.length === 0) return 0;

    // Contar frequências
    this.frequencias = {};
    tokens.forEach(token => {
      this.frequencias[token] = (this.frequencias[token] || 0) + 1;
    });

    // Calcular entropia
    const totalTokens = tokens.length;
    let entropia = 0;

    Object.values(this.frequencias).forEach(freq => {
      const p = freq / totalTokens;
      if (p > 0) {
        entropia -= p * Math.log2(p);
      }
    });

    // Calcular entropia máxima possível
    const palavrasUnicas = Object.keys(this.frequencias).length;
    this.entropiaMaxima = Math.log2(palavrasUnicas);

    // Normalizar para escala 0-4 (mais intuitiva)
    this.entropia = entropia;
    this.entropiaNormalizada = (entropia / this.entropiaMaxima) * 4;

    return {
      entropia: this.entropia,
      entropiaNormalizada: Math.min(this.entropiaNormalizada, 4),
      entropiaMaxima: this.entropiaMaxima,
      totalPalavras: totalTokens,
      palavrasUnicas: palavrasUnicas,
      diversidade: (palavrasUnicas / totalTokens * 100).toFixed(1)
    };
  }

  // ============================================================
  // MÉTODO 3: DETECÇÃO DE PADRÕES DISCURSIVOS
  // ============================================================

  detectarPadroes(texto, tokens) {
    /**
     * Detecta padrões específicos que indicam rigidez discursiva
     * Retorna array de padrões encontrados com impacto
     */
    
    this.padroes = [];

    // PADRÃO 1: Expressão "travestida de"
    if (texto.toLowerCase().includes('travestida de')) {
      this.padroes.push({
        tipo: 'Expressão Crítica',
        descricao: 'Detectada a expressão "travestida de"',
        impacto: 'Alto',
        valor: 0.3,
        cor: '#EF4444',
        icone: '⚠️'
      });
    }

    // PADRÃO 2: Repetição de palavras (rigidez lexical)
    const frequencias = {};
    tokens.forEach(token => {
      frequencias[token] = (frequencias[token] || 0) + 1;
    });

    const palavrasRepetidas = Object.entries(frequencias)
      .filter(([_, freq]) => freq > 5)
      .map(([palavra, freq]) => ({ palavra, freq }));

    if (palavrasRepetidas.length > 0) {
      this.padroes.push({
        tipo: 'Repetição Lexical',
        descricao: `${palavrasRepetidas.length} palavra(s) repetida(s) mais de 5 vezes`,
        impacto: 'Médio',
        valor: 0.2,
        cor: '#F59E0B',
        icone: '🔄',
        detalhes: palavrasRepetidas.slice(0, 3).map(p => `${p.palavra} (${p.freq}x)`).join(', ')
      });
    }

    // PADRÃO 3: Vocabulário complexo (palavras longas)
    const comprimentoMedio = tokens.reduce((sum, t) => sum + t.length, 0) / tokens.length;
    if (comprimentoMedio > 7) {
      this.padroes.push({
        tipo: 'Vocabulário Complexo',
        descricao: `Palavras longas em média (${comprimentoMedio.toFixed(1)} caracteres)`,
        impacto: 'Baixo',
        valor: 0.05,
        cor: '#3B82F6',
        icone: '📚'
      });
    }

    // PADRÃO 4: Conectivos lógicos (estrutura argumentativa)
    const conectivos = ['portanto', 'logo', 'assim', 'consequentemente', 'todavia', 'contudo', 'porém', 'entretanto'];
    const conectivosEncontrados = tokens.filter(t => conectivos.includes(t)).length;

    if (conectivosEncontrados > 0) {
      this.padroes.push({
        tipo: 'Estrutura Argumentativa',
        descricao: `${conectivosEncontrados} conectivo(s) lógico(s) detectado(s)`,
        impacto: 'Positivo',
        valor: -0.1,
        cor: '#10B981',
        icone: '🔗'
      });
    }

    // PADRÃO 5: Negações e qualificadores (rigidez modal)
    const negacoes = ['não', 'nunca', 'jamais', 'nenhum', 'nenhuma'];
    const negacoesEncontradas = tokens.filter(t => negacoes.includes(t)).length;

    if (negacoesEncontradas > 2) {
      this.padroes.push({
        tipo: 'Rigidez Modal',
        descricao: `${negacoesEncontradas} negação(ões) ou qualificador(es) absoluto(s)`,
        impacto: 'Médio',
        valor: 0.15,
        cor: '#F59E0B',
        icone: '🚫'
      });
    }

    return this.padroes;
  }

  // ============================================================
  // MÉTODO 4: ANÁLISE DE PALAVRAS-CHAVE
  // ============================================================

  obterPalavrasChave(tokens, limite = 15) {
    /**
     * Retorna as palavras mais frequentes (palavras-chave)
     * Indicam os tópicos centrais do discurso
     */
    
    const frequencias = {};
    tokens.forEach(token => {
      frequencias[token] = (frequencias[token] || 0) + 1;
    });

    this.palavrasChave = Object.entries(frequencias)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limite)
      .map(([palavra, freq]) => ({
        palavra: palavra,
        frequencia: freq,
        percentual: ((freq / tokens.length) * 100).toFixed(1),
        tamanho: 0.8 + (freq / Math.max(...Object.values(frequencias))) * 1.7
      }));

    return this.palavrasChave;
  }

  // ============================================================
  // MÉTODO 5: CLASSIFICAÇÃO DE RIGIDEZ/FLEXIBILIDADE
  // ============================================================

  classificarRigidez(entropiaNormalizada, padroes, diversidade) {
    /**
     * Classifica o discurso em escala de rigidez/flexibilidade
     * Retorna classificação, cor e recomendações
     */
    
    // Calcular score de impacto dos padrões
    let impactoPatroes = 0;
    padroes.forEach(p => {
      impactoPatroes += p.valor;
    });

    // Score final = entropia normalizada + impacto dos padrões
    const scoreRigidez = entropiaNormalizada - impactoPatroes;

    let classificacao = {};

    if (scoreRigidez < 1.5) {
      classificacao = {
        nivel: 'Muito Rígido',
        descricao: 'Discurso altamente previsível e repetitivo',
        cor: '#EF4444',
        icone: '🔴',
        percentualRigidez: 90,
        recomendacao: 'Aumentar variedade lexical e estrutural significativamente'
      };
    } else if (scoreRigidez < 2.0) {
      classificacao = {
        nivel: 'Rígido',
        descricao: 'Discurso com padrões repetitivos evidentes',
        cor: '#F59E0B',
        icone: '🟠',
        percentualRigidez: 70,
        recomendacao: 'Diversificar vocabulário e estrutura de frases'
      };
    } else if (scoreRigidez < 2.5) {
      classificacao = {
        nivel: 'Moderadamente Rígido',
        descricao: 'Discurso com alguma previsibilidade',
        cor: '#FBBF24',
        icone: '🟡',
        percentualRigidez: 50,
        recomendacao: 'Manter qualidade atual, explorar variações'
      };
    } else if (scoreRigidez < 3.0) {
      classificacao = {
        nivel: 'Moderadamente Flexível',
        descricao: 'Discurso com boa variedade',
        cor: '#A3E635',
        icone: '🟢',
        percentualRigidez: 30,
        recomendacao: 'Excelente! Continuar com essa abordagem'
      };
    } else if (scoreRigidez < 3.5) {
      classificacao = {
        nivel: 'Flexível',
        descricao: 'Discurso variado e criativo',
        cor: '#10B981',
        icone: '🟢',
        percentualRigidez: 15,
        recomendacao: 'Muito bom! Considerar revisar para clareza'
      };
    } else {
      classificacao = {
        nivel: 'Muito Flexível',
        descricao: 'Discurso altamente variado e criativo',
        cor: '#06B6D4',
        icone: '🔵',
        percentualRigidez: 5,
        recomendacao: 'Excelente diversidade! Revisar para coesão'
      };
    }

    return {
      ...classificacao,
      score: scoreRigidez.toFixed(2),
      diversidade: diversidade
    };
  }

  // ============================================================
  // MÉTODO 6: ANÁLISE COMPARATIVA
  // ============================================================

  compararComPadrao(entropiaNormalizada) {
    /**
     * Compara a entropia do texto com os padrões conhecidos
     * Padrão com "travestida de": S* ≈ 2.8 (rígido)
     * Padrão sem "travestida de": S* ≈ 3.5 (flexível)
     */
    
    const padraoRigido = 2.8;
    const padraoFlexivel = 3.5;

    const diferencaRigido = Math.abs(entropiaNormalizada - padraoRigido);
    const diferencaFlexivel = Math.abs(entropiaNormalizada - padraoFlexivel);

    const similaridadeRigido = (1 - (diferencaRigido / padraoFlexivel)) * 100;
    const similaridadeFlexivel = (1 - (diferencaFlexivel / padraoFlexivel)) * 100;

    return {
      padraoRigido: {
        entropia: padraoRigido,
        descricao: 'Padrão com "travestida de"',
        similaridade: Math.max(0, similaridadeRigido).toFixed(1),
        diferenca: diferencaRigido.toFixed(2)
      },
      padraoFlexivel: {
        entropia: padraoFlexivel,
        descricao: 'Padrão sem "travestida de"',
        similaridade: Math.max(0, similaridadeFlexivel).toFixed(1),
        diferenca: diferencaFlexivel.toFixed(2)
      },
      proximoA: diferencaRigido < diferencaFlexivel ? 'Padrão Rígido' : 'Padrão Flexível'
    };
  }

  // ============================================================
  // MÉTODO 7: ANÁLISE COMPLETA
  // ============================================================

  analisarTextoCompleto(texto) {
    /**
     * Executa análise completa do texto
     * Retorna objeto com todos os resultados
     */
    
    const textoNormalizado = this.normalizarTexto(texto);
    const tokens = this.tokenizar(textoNormalizado);

    if (tokens.length < 10) {
      return {
        erro: 'Texto muito curto. Por favor, forneça pelo menos 10 palavras significativas.',
        tokens: tokens.length
      };
    }

    const metricas = this.calcularEntropia(tokens);
    const padroes = this.detectarPadroes(texto, tokens);
    const palavrasChave = this.obterPalavrasChave(tokens);
    const classificacao = this.classificarRigidez(
      metricas.entropiaNormalizada,
      padroes,
      metricas.diversidade
    );
    const comparacao = this.compararComPadrao(metricas.entropiaNormalizada);

    return {
      sucesso: true,
      metricas,
      padroes,
      palavrasChave,
      classificacao,
      comparacao,
      timestamp: new Date().toISOString()
    };
  }
}

// ============================================================
// FUNÇÃO DE INTEGRAÇÃO COM HTML
// ============================================================

function inicializarAnalisador() {
  /**
   * Inicializa o analisador e conecta com elementos HTML
   */
  window.analisador = new AnalisadorEntropia();
}

function analisarTextoUsuario() {
  /**
   * Função chamada quando o usuário clica em "Analisar"
   */
  const textoInput = document.getElementById('textoInput');
  const texto = textoInput.value.trim();

  if (!texto) {
    alert('Por favor, cole um texto para analisar');
    return;
  }

  // Analisar
  const resultado = window.analisador.analisarTextoCompleto(texto);

  if (resultado.erro) {
    alert(resultado.erro);
    return;
  }

  // Mostrar resultados
  exibirResultados(resultado);

  // Scroll para resultados
  setTimeout(() => {
    document.getElementById('resultados').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function exibirResultados(resultado) {
  /**
   * Exibe os resultados na página
   */
  const resultados = document.getElementById('resultados');
  resultados.style.display = 'block';

  // Entropia
  const entropiaValor = document.getElementById('entropiaValor');
  if (entropiaValor) {
    entropiaValor.textContent = resultado.metricas.entropiaNormalizada.toFixed(2);
  }

  // Classificação
  const classificacao = resultado.classificacao;
  const classElement = document.getElementById('classificacaoRigidez');
  if (classElement) {
    classElement.innerHTML = `
      <div style="text-align: center; padding: 2rem; background-color: rgba(0, 160, 214, 0.05); border-radius: 8px; border: 2px solid ${classificacao.cor};">
        <div style="font-size: 3rem; margin-bottom: 1rem;">${classificacao.icone}</div>
        <h3 style="color: ${classificacao.cor}; margin-bottom: 0.5rem;">${classificacao.nivel}</h3>
        <p style="color: #9CA3AF; margin-bottom: 1rem;">${classificacao.descricao}</p>
        <div style="display: flex; justify-content: center; align-items: center; gap: 1rem;">
          <div style="flex: 1;">
            <div style="font-size: 2rem; font-weight: 700; color: ${classificacao.cor};">${classificacao.percentualRigidez}%</div>
            <div style="font-size: 0.85rem; color: #9CA3AF;">Rigidez</div>
          </div>
          <div style="flex: 1;">
            <div style="font-size: 2rem; font-weight: 700; color: #00A0D6;">${100 - classificacao.percentualRigidez}%</div>
            <div style="font-size: 0.85rem; color: #9CA3AF;">Flexibilidade</div>
          </div>
        </div>
      </div>
    `;
  }

  // Barra de Rigidez/Flexibilidade
  exibirBarraRigidez(resultado.classificacao.percentualRigidez);

  // Nuvem de Palavras
  exibirNuvemPalavras(resultado.palavrasChave);

  // Padrões
  exibirPadroes(resultado.padroes);

  // Comparação com Padrões
  exibirComparacao(resultado.comparacao, resultado.metricas.entropiaNormalizada);

  // Gráfico de Entropia
  if (typeof initGraficoEntropiaComparativa === 'function') {
    initGraficoEntropiaComparativa(resultado.metricas.entropiaNormalizada);
  }
}

function exibirBarraRigidez(percentualRigidez) {
  /**
   * Exibe uma barra visual de rigidez/flexibilidade
   */
  const container = document.getElementById('barraRigidez');
  if (!container) return;

  const cor = percentualRigidez > 70 ? '#EF4444' : 
              percentualRigidez > 50 ? '#F59E0B' :
              percentualRigidez > 30 ? '#FBBF24' :
              percentualRigidez > 15 ? '#10B981' : '#06B6D4';

  container.innerHTML = `
    <div style="margin-bottom: 1rem;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span style="font-weight: 600;">Rigidez Discursiva</span>
        <span style="font-weight: 700; color: ${cor};">${percentualRigidez}%</span>
      </div>
      <div style="width: 100%; height: 24px; background-color: rgba(0, 160, 214, 0.1); border-radius: 12px; overflow: hidden;">
        <div style="width: ${percentualRigidez}%; height: 100%; background: linear-gradient(90deg, #06B6D4, ${cor}); transition: width 0.5s ease;"></div>
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 0.5rem; font-size: 0.85rem; color: #9CA3AF;">
        <span>Flexível</span>
        <span>Rígido</span>
      </div>
    </div>
  `;
}

function exibirNuvemPalavras(palavrasChave) {
  /**
   * Exibe nuvem de palavras com tamanho proporcional à frequência
   */
  const container = document.getElementById('nuvemPalavras');
  if (!container) return;

  container.innerHTML = '';

  palavrasChave.forEach(item => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = item.palavra;
    span.style.fontSize = item.tamanho + 'em';
    span.style.opacity = 0.6 + (item.frequencia / Math.max(...palavrasChave.map(p => p.frequencia))) * 0.4;
    span.title = `${item.frequencia} ocorrências (${item.percentual}%)`;
    container.appendChild(span);
  });
}

function exibirPadroes(padroes) {
  /**
   * Exibe os padrões detectados
   */
  const container = document.getElementById('padroes');
  if (!container) return;

  container.innerHTML = '';

  padroes.forEach(padrao => {
    const div = document.createElement('div');
    div.style.cssText = `
      padding: 1rem;
      background-color: rgba(0, 160, 214, 0.05);
      border-left: 4px solid ${padrao.cor};
      margin-bottom: 1rem;
      border-radius: 4px;
    `;

    let conteudo = `
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <span style="font-size: 1.5rem;">${padrao.icone}</span>
        <strong style="color: ${padrao.cor};">${padrao.tipo}</strong>
        <span style="font-size: 0.85rem; color: #9CA3AF; margin-left: auto;">Impacto: ${padrao.impacto}</span>
      </div>
      <p style="color: #E5E7EB; margin: 0.5rem 0; font-size: 0.95rem;">${padrao.descricao}</p>
    `;

    if (padrao.detalhes) {
      conteudo += `<p style="color: #9CA3AF; font-size: 0.85rem; margin: 0.5rem 0;">Exemplos: ${padrao.detalhes}</p>`;
    }

    div.innerHTML = conteudo;
    container.appendChild(div);
  });
}

function exibirComparacao(comparacao, entropiaNormalizada) {
  /**
   * Exibe comparação com padrões conhecidos
   */
  const container = document.getElementById('comparacao');
  if (!container) return;

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <div style="padding: 1rem; background-color: rgba(239, 68, 68, 0.1); border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.3);">
        <h4 style="color: #EF4444; margin-bottom: 0.5rem;">🔴 ${comparacao.padraoRigido.descricao}</h4>
        <p style="color: #E5E7EB; margin: 0.5rem 0;">Entropia: <strong>${comparacao.padraoRigido.entropia}</strong></p>
        <p style="color: #E5E7EB; margin: 0.5rem 0;">Similaridade: <strong>${comparacao.padraoRigido.similaridade}%</strong></p>
      </div>
      <div style="padding: 1rem; background-color: rgba(16, 185, 129, 0.1); border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.3);">
        <h4 style="color: #10B981; margin-bottom: 0.5rem;">🟢 ${comparacao.padraoFlexivel.descricao}</h4>
        <p style="color: #E5E7EB; margin: 0.5rem 0;">Entropia: <strong>${comparacao.padraoFlexivel.entropia}</strong></p>
        <p style="color: #E5E7EB; margin: 0.5rem 0;">Similaridade: <strong>${comparacao.padraoFlexivel.similaridade}%</strong></p>
      </div>
    </div>
    <div style="margin-top: 1rem; padding: 1rem; background-color: rgba(0, 160, 214, 0.05); border-radius: 8px;">
      <p style="color: #E5E7EB;">
        <strong>Seu texto está mais próximo do:</strong> <span style="color: #00A0D6; font-weight: 700;">${comparacao.proximoA}</span>
      </p>
    </div>
  `;
}

function limparAnalise() {
  /**
   * Limpa a análise e reseta o formulário
   */
  document.getElementById('textoInput').value = '';
  document.getElementById('resultados').style.display = 'none';
  document.getElementById('textoInput').focus();
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  inicializarAnalisador();
});

// ============================================================
// EXPORT PARA OUTRAS FUNÇÕES
// ============================================================

window.analisarTextoUsuario = analisarTextoUsuario;
window.limparAnalise = limparAnalise;
window.AnalisadorEntropia = AnalisadorEntropia;
