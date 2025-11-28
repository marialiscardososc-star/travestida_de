# ⚡ Guia Rápido: Integração do Algoritmo de Entropia

## 🎯 O que você recebeu

Um **algoritmo JavaScript completo** que analisa a rigidez/flexibilidade de textos usando **Física Informacional**. O usuário cola um texto, clica em "Analisar" e recebe:

- ✅ Classificação de rigidez/flexibilidade
- ✅ Barra visual de rigidez
- ✅ Nuvem de palavras interativa
- ✅ Padrões discursivos detectados
- ✅ Comparação com padrões conhecidos
- ✅ Gráfico comparativo

---

## 📦 Arquivos Inclusos

```
travestida_de_v2/
├── js/
│   └── entropia-avancado.js          ← Algoritmo principal (650+ linhas)
├── css/
│   └── entropia-visualizacoes.css    ← Estilos (400+ linhas)
├── secao-algoritmo.html              ← HTML pronto para copiar/colar
└── DOCUMENTACAO_ALGORITMO.md         ← Documentação técnica completa
```

---

## 🚀 Integração em 3 Passos

### Passo 1: Copiar os Arquivos

```bash
# Copie para seu projeto:
- js/entropia-avancado.js → seu_projeto/js/
- css/entropia-visualizacoes.css → seu_projeto/css/
```

### Passo 2: Adicionar Referências no HTML

No seu `index.html`, adicione **ANTES** de `</head>`:

```html
<!-- CSS do Algoritmo -->
<link rel="stylesheet" href="css/entropia-visualizacoes.css">

<!-- Chart.js (se não estiver incluído) -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"></script>
```

E **ANTES** de `</body>`:

```html
<!-- Script do Algoritmo -->
<script src="js/entropia-avancado.js"></script>
```

### Passo 3: Copiar a Seção HTML

Abra `secao-algoritmo.html` e copie TODO o conteúdo.

Cole dentro da tag `<main>` do seu `index.html` (em qualquer lugar, mas recomendamos depois da seção de "Discussão").

**Pronto! ✅**

---

## 🧪 Testar Localmente

1. Abra `index.html` no VS Code com **Live Server**
2. Procure pela seção **"Ferramenta Interativa: Analise Seu Próprio Texto"**
3. Cole um texto e clique em **"Analisar Entropia"**
4. Veja os resultados aparecerem em tempo real!

---

## 📊 Como Funciona

### Entrada
```
Cole seu texto aqui (mínimo 50 palavras)
```

### Processamento
1. **Normalização:** Remove pontuação, converte para minúsculas
2. **Tokenização:** Divide em palavras, remove stopwords
3. **Cálculo de Entropia:** Aplica fórmula de Shannon
4. **Detecção de Padrões:** Identifica 5 tipos de padrões
5. **Classificação:** Determina rigidez/flexibilidade

### Saída
```
📊 Classificação: "Rígido" (70% rigidez)
📈 Barra visual de rigidez/flexibilidade
☁️ Nuvem de palavras-chave
🔍 Padrões detectados (com impacto)
🎯 Comparação com padrões conhecidos
📉 Gráfico comparativo
```

---

## 🎨 Customizações Comuns

### Mudar Cores

Edite `css/entropia-visualizacoes.css`:

```css
.btn-analisar {
  background-color: #00A0D6;  /* Mude para sua cor */
}
```

### Adicionar Novos Padrões

Edite `js/entropia-avancado.js`, método `detectarPadroes()`:

```javascript
// PADRÃO 6: Seu novo padrão
if (/* sua condição */) {
  this.padroes.push({
    tipo: 'Seu Padrão',
    descricao: 'Descrição',
    impacto: 'Alto',
    valor: 0.25,
    cor: '#FF0000',
    icone: '⚡'
  });
}
```

### Mudar Stopwords

Edite `js/entropia-avancado.js`, método `tokenizar()`:

```javascript
const stopwords = new Set([
  'sua', 'lista', 'customizada'
]);
```

---

## 📈 Exemplos de Uso

### Exemplo 1: Texto Rígido (com "travestida de")
```
"A ação está travestida de legitimidade. O autor alega que a ação está travestida de direito. A decisão anterior estava travestida de fundamentação."
```
**Resultado:** Entropia ≈ 2.8 | Rigidez: 70% | 🔴 Rígido

### Exemplo 2: Texto Flexível (variado)
```
"A jurisprudência brasileira tem evoluído significativamente. Os tribunais reconhecem diferentes perspectivas. A doutrina aponta para novas interpretações. As decisões contemporâneas refletem essa diversidade de pensamento."
```
**Resultado:** Entropia ≈ 3.5 | Rigidez: 15% | 🟢 Flexível

---

## 🔧 Troubleshooting

### Problema: Gráfico não aparece
**Solução:** Verifique se Chart.js está carregado:
```javascript
console.log(typeof Chart); // Deve ser "function"
```

### Problema: Botão "Analisar" não funciona
**Solução:** Verifique se `entropia-avancado.js` está carregado:
```javascript
console.log(typeof AnalisadorEntropia); // Deve ser "function"
```

### Problema: Texto muito curto
**Solução:** O algoritmo requer mínimo de 10 palavras significativas (após remover stopwords).

---

## 📚 Documentação Completa

Para documentação técnica detalhada, consulte:
- `DOCUMENTACAO_ALGORITMO.md` - Guia técnico completo
- `secao-algoritmo.html` - Exemplos de HTML
- `js/entropia-avancado.js` - Código comentado

---

## 🎓 Conceitos-Chave

| Conceito | Explicação |
|----------|-----------|
| **Entropia (S*)** | Medida de variedade lexical (0-4 scale) |
| **Rigidez** | Discurso previsível, repetitivo (S* < 2.8) |
| **Flexibilidade** | Discurso variado, criativo (S* > 3.5) |
| **Padrão Rígido** | Com "travestida de" (S* ≈ 2.8) |
| **Padrão Flexível** | Sem "travestida de" (S* ≈ 3.5) |
| **Stopwords** | Palavras comuns removidas (o, a, de, etc.) |
| **Palavras-Chave** | Palavras mais frequentes (definem o tema) |

---

## 🚀 Próximos Passos

1. **Integrar no seu projeto** (3 passos acima)
2. **Testar com textos reais** (acórdãos, artigos, etc.)
3. **Customizar conforme necessário** (cores, padrões, etc.)
4. **Fazer deploy no GitHub** (seguindo o guia de implementação)
5. **Coletar feedback de usuários** (melhorar o algoritmo)

---

## 💡 Dicas Profissionais

- **Teste com acórdãos reais** de tribunais brasileiros
- **Compare textos jurídicos** com textos acadêmicos
- **Analise evolução temporal** de um mesmo autor
- **Use para fins educacionais** e de pesquisa

---

## 📞 Suporte

Se tiver dúvidas:
1. Consulte `DOCUMENTACAO_ALGORITMO.md`
2. Verifique o console do navegador (F12)
3. Teste com exemplos fornecidos

---

**Desenvolvido com ❤️ por Manus AI**  
**Data:** 27 de Novembro de 2025

Aproveite! 🚀
