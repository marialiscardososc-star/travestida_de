/* ============================================================
   TRAVESTIDA DE V2.0 - ALGORITMO DE ANÁLISE DE ENTROPIA
   Análise automática de textos usando Física Informacional
   ============================================================ */

// ============================================================
// FUNÇÃO PRINCIPAL DE ANÁLISE
// ============================================================
function analisarTexto() {
  const textoInput = document.getElementById('textoInput');
  const texto = textoInput.value.trim();
  
  if (texto.length < 50) {
    alert('Por favor, cole um texto com pelo menos 50 caracteres');
    return;
  }
  
  // Mostrar resultados
  const resultados = document.getElementById('resultados');
  resultados.style.display = 'block';
  
  // Calcular métricas
  const metricas = calcularMetricas(texto);
  
  // Atualizar visualizações
  atualizarResultados(metricas);
  
  // Scroll para resultados
  setTimeout(() => {
    resultados.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// ============================================================
// CÁLCULO DE MÉTRICAS
// ============================================================
function calcularMetricas(texto) {
  // Normalizar texto
  const textoNormalizado = normalizarTexto(texto);
  
  // Tokenizar
  const tokens = tokenizar(textoNormalizado);
  
  // Calcular entropia
  const entropia = calcularEntropia(tokens);
  
  // Palavras mais frequentes
  const palavrasFrequentes = obterPalavrasFrequentes(tokens, 15);
  
  // Padrões detectados
  const padroes = detectarPadroes(texto, tokens);
  
  // Recomendações
  const recomendacoes = gerarRecomendacoes(entropia, tokens, padroes);
  
  return {
    entropia: entropia,
    palavrasFrequentes: palavrasFrequentes,
    padroes: padroes,
    recomendacoes: recomendacoes,
    totalPalavras: tokens.length,
    palavrasUnicas: new Set(tokens).size
  };
}

// ============================================================
// NORMALIZAÇÃO DE TEXTO
// ============================================================
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ============================================================
// TOKENIZAÇÃO
// ============================================================
function tokenizar(texto) {
  const palavrasVazias = new Set([
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
    'não', 'sim', 'há', 'há', 'haja'
  ]);
  
  const tokens = texto.split(/\s+/)
    .filter(token => token.length > 2 && !palavrasVazias.has(token));
  
  return tokens;
}

// ============================================================
// CÁLCULO DE ENTROPIA DE SHANNON
// ============================================================
function calcularEntropia(tokens) {
  if (tokens.length === 0) return 0;
  
  // Contar frequências
  const frequencias = {};
  tokens.forEach(token => {
    frequencias[token] = (frequencias[token] || 0) + 1;
  });
  
  // Calcular probabilidades
  const totalTokens = tokens.length;
  let entropia = 0;
  
  Object.values(frequencias).forEach(freq => {
    const p = freq / totalTokens;
    if (p > 0) {
      entropia -= p * Math.log2(p);
    }
  });
  
  // Normalizar para escala 0-4
  const entropiaNormalizada = (entropia / Math.log2(totalTokens)) * 4;
  
  return Math.min(entropiaNormalizada, 4);
}

// ============================================================
// OBTER PALAVRAS MAIS FREQUENTES
// ============================================================
function obterPalavrasFrequentes(tokens, limite = 15) {
  const frequencias = {};
  
  tokens.forEach(token => {
    frequencias[token] = (frequencias[token] || 0) + 1;
  });
  
  return Object.entries(frequencias)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limite)
    .map(([palavra, freq]) => ({
      palavra: palavra,
      frequencia: freq,
      percentual: ((freq / tokens.length) * 100).toFixed(1)
    }));
}

// ============================================================
// DETECTAR PADRÕES
// ============================================================
function detectarPadroes(texto, tokens) {
  const padroes = [];
  
  // Padrão 1: Expressão "travestida de"
  if (texto.toLowerCase().includes('travestida de')) {
    padroes.push({
      tipo: 'Expressão Crítica',
      descricao: 'Detectada a expressão "travestida de"',
      impacto: 'Alto - reduz entropia do discurso'
    });
  }
  
  // Padrão 2: Repetição de palavras
  const frequencias = {};
  tokens.forEach(token => {
    frequencias[token] = (frequencias[token] || 0) + 1;
  });
  
  const palavrasRepetidas = Object.entries(frequencias)
    .filter(([_, freq]) => freq > 5)
    .map(([palavra, freq]) => ({ palavra, freq }));
  
  if (palavrasRepetidas.length > 0) {
    padroes.push({
      tipo: 'Repetição Lexical',
      descricao: `${palavrasRepetidas.length} palavra(s) repetida(s) mais de 5 vezes`,
      impacto: 'Médio - indica rigidez discursiva'
    });
  }
  
  // Padrão 3: Comprimento médio de palavras
  const comprimentoMedio = tokens.reduce((sum, t) => sum + t.length, 0) / tokens.length;
  if (comprimentoMedio > 7) {
    padroes.push({
      tipo: 'Vocabulário Complexo',
      descricao: `Palavras longas em média (${comprimentoMedio.toFixed(1)} caracteres)`,
      impacto: 'Baixo - indica formalidade'
    });
  }
  
  // Padrão 4: Conectivos lógicos
  const conectivos = ['portanto', 'logo', 'assim', 'consequentemente', 'todavia', 'contudo'];
  const conectivosEncontrados = tokens.filter(t => conectivos.includes(t)).length;
  
  if (conectivosEncontrados > 3) {
    padroes.push({
      tipo: 'Estrutura Argumentativa',
      descricao: `${conectivosEncontrados} conectivos lógicos detectados`,
      impacto: 'Positivo - indica estrutura clara'
    });
  }
  
  return padroes.length > 0 ? padroes : [
    {
      tipo: 'Padrão Geral',
      descricao: 'Nenhum padrão específico detectado',
      impacto: 'Neutro'
    }
  ];
}

// ============================================================
// GERAR RECOMENDAÇÕES
// ============================================================
function gerarRecomendacoes(entropia, tokens, padroes) {
  const recomendacoes = [];
  
  // Recomendação baseada em entropia
  if (entropia < 2.0) {
    recomendacoes.push({
      tipo: '⚠️ Entropia Muito Baixa',
      sugestao: 'Seu texto é muito rígido e previsível. Tente usar sinônimos e variar a estrutura das frases.',
      acao: 'Substitua palavras repetidas por sinônimos'
    });
  } else if (entropia < 2.5) {
    recomendacoes.push({
      tipo: '⚠️ Entropia Baixa',
      sugestao: 'Seu texto tem entropia baixa, similar ao padrão "com travestida de". Aumente a variedade lexical.',
      acao: 'Diversifique o vocabulário e estrutura de frases'
    });
  } else if (entropia < 3.0) {
    recomendacoes.push({
      tipo: '✓ Entropia Moderada',
      sugestao: 'Seu texto tem uma boa variabilidade. Continue assim!',
      acao: 'Mantenha a qualidade atual'
    });
  } else {
    recomendacoes.push({
      tipo: '✓ Entropia Alta',
      sugestao: 'Seu texto é muito flexível e variado. Excelente diversidade lexical!',
      acao: 'Considere revisar para clareza e consistência'
    });
  }
  
  // Recomendação baseada em palavras únicas
  const diversidade = new Set(tokens).size / tokens.length;
  if (diversidade < 0.4) {
    recomendacoes.push({
      tipo: '⚠️ Baixa Diversidade Lexical',
      sugestao: `Apenas ${(diversidade * 100).toFixed(1)}% das palavras são únicas. Aumente a variedade.`,
      acao: 'Use mais sinônimos e expressões alternativas'
    });
  }
  
  // Recomendação baseada em padrões
  if (padroes.some(p => p.tipo === 'Expressão Crítica')) {
    recomendacoes.push({
      tipo: '📌 Expressão "Travestida de" Detectada',
      sugestao: 'Esta expressão reduz a entropia. Considere usar alternativas para aumentar flexibilidade.',
      acao: 'Explore sinônimos: "disfarçado de", "apresentado como", "simulando ser"'
    });
  }
  
  return recomendacoes;
}

// ============================================================
// ATUALIZAR RESULTADOS NA PÁGINA
// ============================================================
function atualizarResultados(metricas) {
  // Entropia
  const entropiaValor = document.getElementById('entropiaValor');
  if (entropiaValor) {
    entropiaValor.textContent = metricas.entropia.toFixed(2);
  }
  
  // Interpretação
  const interpretacao = document.getElementById('entropiaInterpretacao');
  if (interpretacao) {
    let texto = '';
    if (metricas.entropia < 2.5) {
      texto = `Entropia baixa (${metricas.entropia.toFixed(2)}). Seu texto é similar ao padrão "com travestida de" - rígido e previsível.`;
    } else if (metricas.entropia < 3.0) {
      texto = `Entropia moderada (${metricas.entropia.toFixed(2)}). Seu texto tem uma boa variabilidade lexical.`;
    } else {
      texto = `Entropia alta (${metricas.entropia.toFixed(2)}). Seu texto é flexível e criativo com excelente diversidade.`;
    }
    interpretacao.textContent = texto;
  }
  
  // Gráfico de Entropia Comparativa
  initGraficoEntropiaComparativa(metricas.entropia);
  
  // Nuvem de Palavras
  atualizarNuvemPalavras(metricas.palavrasFrequentes);
  
  // Padrões
  atualizarPadroes(metricas.padroes);
  
  // Recomendações
  atualizarRecomendacoes(metricas.recomendacoes);
}

// ============================================================
// ATUALIZAR NUVEM DE PALAVRAS
// ============================================================
function atualizarNuvemPalavras(palavrasFrequentes) {
  const container = document.getElementById('nuvemPalavras');
  if (!container) return;
  
  container.innerHTML = '';
  
  const maxFreq = Math.max(...palavrasFrequentes.map(p => p.frequencia));
  
  palavrasFrequentes.forEach(item => {
    const tamanho = 0.8 + (item.frequencia / maxFreq) * 1.7;
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = item.palavra;
    span.style.fontSize = tamanho + 'em';
    span.title = `${item.frequencia} ocorrências (${item.percentual}%)`;
    container.appendChild(span);
  });
}

// ============================================================
// ATUALIZAR PADRÕES
// ============================================================
function atualizarPadroes(padroes) {
  const container = document.getElementById('padroes');
  if (!container) return;
  
  container.innerHTML = '';
  
  padroes.forEach(padrao => {
    const div = document.createElement('div');
    div.style.cssText = `
      padding: 12px;
      background-color: rgba(0, 160, 214, 0.05);
      border-left: 3px solid #00A0D6;
      margin-bottom: 12px;
      border-radius: 4px;
    `;
    
    div.innerHTML = `
      <strong style="color: #00A0D6;">${padrao.tipo}</strong><br>
      <span style="color: #9CA3AF; font-size: 0.9em;">${padrao.descricao}</span><br>
      <span style="color: #C9A740; font-size: 0.85em; font-weight: 600;">Impacto: ${padrao.impacto}</span>
    `;
    
    container.appendChild(div);
  });
}

// ============================================================
// ATUALIZAR RECOMENDAÇÕES
// ============================================================
function atualizarRecomendacoes(recomendacoes) {
  const container = document.getElementById('recomendacoes');
  if (!container) return;
  
  container.innerHTML = '';
  
  recomendacoes.forEach(rec => {
    const div = document.createElement('div');
    div.style.cssText = `
      padding: 12px;
      background-color: rgba(0, 160, 214, 0.05);
      border-left: 3px solid #C9A740;
      margin-bottom: 12px;
      border-radius: 4px;
    `;
    
    div.innerHTML = `
      <strong style="color: #C9A740;">${rec.tipo}</strong><br>
      <span style="color: #E5E7EB; font-size: 0.95em;">${rec.sugestao}</span><br>
      <span style="color: #00A0D6; font-size: 0.9em; font-weight: 600;">→ ${rec.acao}</span>
    `;
    
    container.appendChild(div);
  });
}

// ============================================================
// LIMPAR ANÁLISE
// ============================================================
function limparAnalise() {
  document.getElementById('textoInput').value = '';
  document.getElementById('resultados').style.display = 'none';
  document.getElementById('textoInput').focus();
}

// ============================================================
// EXPORT PARA OUTRAS FUNÇÕES
// ============================================================
window.analisarTexto = analisarTexto;
window.limparAnalise = limparAnalise;
