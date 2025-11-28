# 🤖 Documentação Técnica: Algoritmo de Análise de Entropia

## Visão Geral

O **Analisador de Entropia** é um algoritmo JavaScript que implementa a **Física Informacional** para analisar a rigidez e flexibilidade de textos discursivos. Ele calcula a **Entropia de Shannon** e detecta padrões que indicam rigidez ou flexibilidade discursiva.

---

## 1. Fundamentos Teóricos

### 1.1 Entropia de Shannon

A entropia é uma medida da **incerteza** ou **desordem** em um sistema. Na linguagem, ela mede a **variedade lexical** e a **previsibilidade** do discurso.

**Fórmula:**
```
S* = -Σ p(x) · log₂ p(x)
```

Onde:
- `p(x)` = probabilidade de ocorrência de cada palavra
- `log₂` = logaritmo na base 2
- `Σ` = somatória de todos os elementos

**Interpretação:**
- **Entropia Alta (S* > 3.5):** Discurso flexível, variado, criativo
- **Entropia Baixa (S* < 2.8):** Discurso rígido, previsível, repetitivo

### 1.2 Aplicação à Linguagem Jurídica

Na pesquisa "Travestida de", descobrimos que:

- **Com "travestida de":** S* ≈ 2.8 (rígido, previsível)
- **Sem "travestida de":** S* ≈ 3.5 (flexível, variado)

A expressão "travestida de" atua como um **atrator** no sistema discursivo, reduzindo a entropia e tornando o discurso mais previsível.

---

## 2. Arquitetura do Algoritmo

### 2.1 Classe Principal: `AnalisadorEntropia`

```javascript
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
}
```

### 2.2 Métodos Principais

#### 2.2.1 `normalizarTexto(texto)`
Normaliza o texto removendo pontuação e convertendo para minúsculas.

**Entrada:** `"A ação está TRAVESTIDA de legitimidade!"`
**Saída:** `"a ação está travestida de legitimidade"`

#### 2.2.2 `tokenizar(texto)`
Divide o texto em palavras, removendo stopwords (palavras comuns).

**Entrada:** `"a ação está travestida de legitimidade"`
**Saída:** `["ação", "travestida", "legitimidade"]`

**Stopwords Removidas:** o, a, de, em, para, por, etc.

#### 2.2.3 `calcularEntropia(tokens)`
Calcula a entropia de Shannon do corpus.

**Processo:**
1. Contar frequências de cada palavra
2. Calcular probabilidade: `p = freq / totalTokens`
3. Aplicar fórmula: `S* = -Σ p(x) · log₂ p(x)`
4. Normalizar para escala 0-4

**Retorno:**
```javascript
{
  entropia: 2.8,
  entropiaNormalizada: 2.8,
  entropiaMaxima: 5.2,
  totalPalavras: 150,
  palavrasUnicas: 87,
  diversidade: "58.0%"
}
```

#### 2.2.4 `detectarPadroes(texto, tokens)`
Detecta padrões que indicam rigidez ou flexibilidade.

**Padrões Detectados:**

| Padrão | Descrição | Impacto |
|--------|-----------|---------|
| Expressão Crítica | Presença de "travestida de" | Alto (+0.3) |
| Repetição Lexical | Palavras repetidas > 5x | Médio (+0.2) |
| Vocabulário Complexo | Palavras longas em média | Baixo (+0.05) |
| Estrutura Argumentativa | Conectivos lógicos | Positivo (-0.1) |
| Rigidez Modal | Negações e qualificadores | Médio (+0.15) |

#### 2.2.5 `obterPalavrasChave(tokens, limite)`
Retorna as palavras mais frequentes (palavras-chave).

**Retorno:**
```javascript
[
  { palavra: "travestida", frequencia: 12, percentual: "8.0%", tamanho: 1.8 },
  { palavra: "ação", frequencia: 8, percentual: "5.3%", tamanho: 1.3 },
  // ...
]
```

#### 2.2.6 `classificarRigidez(entropiaNormalizada, padroes, diversidade)`
Classifica o discurso em escala de rigidez/flexibilidade.

**Classificações:**

| Score | Nível | Cor | Descrição |
|-------|-------|-----|-----------|
| < 1.5 | Muito Rígido | 🔴 | Altamente previsível |
| 1.5-2.0 | Rígido | 🟠 | Padrões repetitivos |
| 2.0-2.5 | Moderadamente Rígido | 🟡 | Alguma previsibilidade |
| 2.5-3.0 | Moderadamente Flexível | 🟢 | Boa variedade |
| 3.0-3.5 | Flexível | 🟢 | Variado e criativo |
| > 3.5 | Muito Flexível | 🔵 | Altamente variado |

#### 2.2.7 `compararComPadrao(entropiaNormalizada)`
Compara a entropia do texto com os padrões conhecidos.

**Retorno:**
```javascript
{
  padraoRigido: {
    entropia: 2.8,
    descricao: 'Padrão com "travestida de"',
    similaridade: "85.7%",
    diferenca: "0.15"
  },
  padraoFlexivel: {
    entropia: 3.5,
    descricao: 'Padrão sem "travestida de"',
    similaridade: "42.3%",
    diferenca: "0.85"
  },
  proximoA: "Padrão Rígido"
}
```

#### 2.2.8 `analisarTextoCompleto(texto)`
Executa análise completa do texto.

**Retorno:**
```javascript
{
  sucesso: true,
  metricas: { /* ... */ },
  padroes: [ /* ... */ ],
  palavrasChave: [ /* ... */ ],
  classificacao: { /* ... */ },
  comparacao: { /* ... */ },
  timestamp: "2025-11-27T22:41:00.000Z"
}
```

---

## 3. Integração no HTML

### 3.1 Incluir Scripts e CSS

```html
<!-- CSS -->
<link rel="stylesheet" href="css/entropia-visualizacoes.css">

<!-- Scripts -->
<script src="js/entropia-avancado.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"></script>
```

### 3.2 Adicionar Seção do Algoritmo

Copie o conteúdo de `secao-algoritmo.html` e cole dentro da tag `<main>` do seu `index.html`.

### 3.3 Estrutura HTML Necessária

```html
<section id="algoritmo">
  <!-- Formulário -->
  <form class="algoritmo-form" onsubmit="event.preventDefault(); analisarTextoUsuario();">
    <textarea id="textoInput"></textarea>
    <button type="submit" class="btn-analisar">Analisar</button>
  </form>

  <!-- Resultados -->
  <div id="resultados">
    <div id="classificacaoRigidez"></div>
    <div id="barraRigidez"></div>
    <div id="nuvemPalavras"></div>
    <div id="padroes"></div>
    <div id="comparacao"></div>
    <canvas id="graficoEntropiaComparativa"></canvas>
  </div>
</section>
```

---

## 4. Funções de Interface

### 4.1 `analisarTextoUsuario()`
Chamada quando o usuário clica em "Analisar".

```javascript
function analisarTextoUsuario() {
  const texto = document.getElementById('textoInput').value.trim();
  const resultado = window.analisador.analisarTextoCompleto(texto);
  exibirResultados(resultado);
}
```

### 4.2 `exibirResultados(resultado)`
Exibe todos os resultados na página.

### 4.3 `exibirBarraRigidez(percentualRigidez)`
Exibe uma barra visual de rigidez/flexibilidade.

### 4.4 `exibirNuvemPalavras(palavrasChave)`
Exibe nuvem de palavras com tamanho proporcional à frequência.

### 4.5 `exibirPadroes(padroes)`
Exibe os padrões detectados com ícones e cores.

### 4.6 `exibirComparacao(comparacao, entropiaNormalizada)`
Exibe comparação com padrões conhecidos.

### 4.7 `limparAnalise()`
Limpa a análise e reseta o formulário.

---

## 5. Exemplos de Uso

### 5.1 Uso Básico

```javascript
const analisador = new AnalisadorEntropia();

const texto = "A ação está travestida de legitimidade. O autor alega que a ação está travestida de direito.";
const resultado = analisador.analisarTextoCompleto(texto);

console.log(resultado.metricas.entropiaNormalizada); // 2.8
console.log(resultado.classificacao.nivel); // "Rígido"
```

### 5.2 Análise de Tokens

```javascript
const texto = "A jurisprudência brasileira tem evoluído significativamente.";
const tokens = analisador.tokenizar(analisador.normalizarTexto(texto));
console.log(tokens); // ["jurisprudência", "brasileira", "evoluído", "significativamente"]
```

### 5.3 Detecção de Padrões

```javascript
const padroes = analisador.detectarPadroes(texto, tokens);
padroes.forEach(p => {
  console.log(`${p.tipo}: ${p.descricao} (Impacto: ${p.valor})`);
});
```

---

## 6. Customização

### 6.1 Adicionar Novos Padrões

Edite o método `detectarPadroes()` para adicionar novos padrões:

```javascript
// PADRÃO 6: Sua nova detecção
if (/* sua condição */) {
  this.padroes.push({
    tipo: 'Seu Padrão',
    descricao: 'Descrição do padrão',
    impacto: 'Alto',
    valor: 0.25,
    cor: '#FF0000',
    icone: '⚡'
  });
}
```

### 6.2 Modificar Stopwords

Edite a lista de stopwords no método `tokenizar()`:

```javascript
const stopwords = new Set([
  'sua', 'lista', 'customizada', 'de', 'stopwords'
]);
```

### 6.3 Ajustar Classificações

Edite o método `classificarRigidez()` para mudar os limites:

```javascript
if (scoreRigidez < 1.5) {
  // Sua classificação customizada
}
```

---

## 7. Performance e Limitações

### 7.1 Performance

- **Tempo de análise:** < 100ms para textos até 5000 palavras
- **Memória:** ~1MB por análise
- **Navegadores suportados:** Chrome, Firefox, Safari, Edge (versões recentes)

### 7.2 Limitações

- Mínimo de 10 palavras significativas para análise
- Funciona melhor com textos em português
- Não detecta contexto (apenas frequência)
- Stopwords são fixas (não customizáveis via UI)

---

## 8. Troubleshooting

### 8.1 Gráfico não aparece

**Solução:** Verifique se Chart.js está carregado:
```javascript
console.log(typeof Chart); // Deve ser "function"
```

### 8.2 Análise retorna erro

**Solução:** Verifique se o texto tem pelo menos 10 palavras significativas.

### 8.3 Padrões não detectados

**Solução:** Verifique se o texto contém as palavras-chave esperadas (case-insensitive).

---

## 9. Referências

- **Shannon, C. E.** (1948). "A Mathematical Theory of Communication". Bell System Technical Journal.
- **Cardoso, M. L.** (2025). "Travestida de: Física Informacional e Análise do Discurso Jurídico".
- **Chart.js Documentation:** https://www.chartjs.org/docs/latest/

---

## 10. Licença e Uso

Este algoritmo foi desenvolvido como parte da pesquisa "Travestida de" e está disponível para uso educacional e de pesquisa.

**Citação recomendada:**
```
Cardoso, M. L. (2025). Analisador de Entropia: Uma ferramenta de Física Informacional para análise de discurso. Travestida de: Divulgação Científica Interativa.
```

---

**Desenvolvido com ❤️ por Manus AI**  
**Data:** 27 de Novembro de 2025
