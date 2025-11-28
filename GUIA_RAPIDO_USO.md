# 🚀 Guia Rápido - Como Usar as Novas Funcionalidades

## 🏛️ Sistema de Filtros por Tribunal

### Localização
Seção "O que a Gente Encontrou?" - logo abaixo do título

### Como Usar
1. **Ver Todos os Dados** (padrão)
   - Clique em "Ver Todos"
   - Mostra 100% dos dados

2. **Filtrar por TJ-SP**
   - Clique em "TJ-SP (25%)"
   - Mostra dados apenas de São Paulo
   - Notificação: "Filtro aplicado: TJ-SP (25% dos casos)"

3. **Filtrar por TJ-PR**
   - Clique em "TJ-PR (18%)"
   - Mostra dados apenas do Paraná

4. **Filtrar por TJ-MG**
   - Clique em "TJ-MG (15%)"
   - Mostra dados apenas de Minas Gerais

5. **Filtrar por Outros**
   - Clique em "Outros (42%)"
   - Mostra dados de outros tribunais

### Dica Visual
- Botão ativo: **Azul brilhante com glow**
- Botão inativo: Cinza transparente
- Hover: Azul claro

---

## 📊 Storytelling Carousel

### Localização
Seção "Distribuição Geográfica" - lado direito do gráfico de pizza

### 5 Slides Disponíveis

#### 📍 Slide 1: Concentração Regional
- **Insight**: 58% dos casos no Sudeste e Sul
- **Detalhes**: A expressão está altamente concentrada em 3 regiões
- **Métrica**: 58%

#### 🏛️ Slide 2: Liderança do TJ-SP
- **Insight**: 25% do total de casos
- **Detalhes**: São Paulo lidera em litígios comerciais
- **Métrica**: 25%

#### 🗺️ Slide 3: Distribuição Equilibrada
- **Insight**: Outros tribunais com 42% dos casos
- **Detalhes**: Padrão jurídico nacional
- **Métrica**: 42%

#### 📈 Slide 4: Padrão de Crescimento
- **Insight**: Pico em 2020 com 17,5 casos
- **Detalhes**: Ciclos económicos e seu impacto
- **Métrica**: 100% (pico máximo)

#### 🔄 Slide 5: Rigidez do Discurso
- **Insight**: Entropia reduz de 3,5 para 2,8
- **Detalhes**: Fórmula cristalizada no direito
- **Métrica**: 80% (20% de rigidez)

### Como Navegar

**Opção 1: Botões**
- Clique "← Anterior" para slide anterior
- Clique "Próximo →" para próximo slide

**Opção 2: Pontos (Dots)**
- 5 pontos pretos aparecem abaixo
- Clique em qualquer ponto para ir direto

**Opção 3: Indicador**
- "1 / 5" no slide 1
- "2 / 5" no slide 2
- E assim por diante

---

## 📱 Responsividade

### Desktop (880px+)
- Filtros em linha horizontal
- Carousel ao lado do gráfico (2 colunas)
- Botões maiores, mais espaçados

### Tablet (768px - 880px)
- Filtros adaptam automaticamente
- Carousel em coluna abaixo do gráfico
- Tamanho reduzido

### Mobile (480px - 768px)
- Filtros em grid 2 colunas
- Botões menores
- Carousel em tela cheia

### Small Mobile (<480px)
- Filtros empilhados 2x2
- Botões muito menores
- Carousel otimizado para toque

---

## ⚙️ Configuração Técnica

### Para Desenvolvedores

#### Modificar Dados dos Filtros
**Arquivo**: `js/filtros.js` (linhas 7-24)
```javascript
const tribunalData = {
  'TJ-SP': {
    percentage: 25,     // Alterar percentual aqui
    cases: 25,         // Alterar número de casos
    label: 'TJ-SP',    // Alterar rótulo
    region: 'São Paulo' // Alterar região
  },
  // ... outros tribunais
};
```

#### Adicionar Novo Tribunal
```javascript
const tribunalData = {
  // ... tribunais existentes
  'TJ-RJ': {
    percentage: 10,
    cases: 10,
    label: 'TJ-RJ',
    region: 'Rio de Janeiro'
  }
};
```
Depois adicione no HTML:
```html
<button data-filtro-tribunal="TJ-RJ">TJ-RJ (10%)</button>
```

#### Modificar Insights do Carousel
**Arquivo**: `js/storytelling.js` (linhas 7-60)
```javascript
const storytellingData = [
  {
    id: 'regional-concentration',
    icon: '📍',           // Mudar ícone
    title: 'Seu Título',  // Mudar título
    insight: 'Seu Insight',
    details: 'Seus detalhes',
    percentage: 58,       // Mudar percentual
    color: '#00A0D6'      // Mudar cor
  },
  // ... outros insights
];
```

#### Mudar Cores de Filtros
**Arquivo**: `css/style.css` (linhas 1700-1720)
```css
[data-filtro-tribunal] {
  border: 2px solid rgba(0, 160, 214, 0.4);  /* Cor da borda */
  color: var(--texto-suave);                  /* Cor do texto */
}

[data-filtro-tribunal].ativo {
  background: linear-gradient(135deg, rgba(0, 160, 214, 0.3), rgba(0, 160, 214, 0.1));
  border-color: var(--azul-neon);             /* Cor quando ativo */
  color: var(--azul-neon);                    /* Cor do texto quando ativo */
}
```

---

## 🎨 Customizações Visuais

### Alterar Cor do Tema
**Arquivo**: `css/style.css` (linhas 1-50)
```css
:root {
  --azul-neon: #00A0D6;      /* Cor primária */
  --amarelo-destaque: #C9A740; /* Cor secundária */
  /* ... outras cores */
}
```

### Alterar Velocidade de Animação
**Arquivo**: `css/style.css` (linhas 30-40)
```css
:root {
  --transition-fast: 150ms ease;   /* Alterar 150ms */
  --transition-base: 300ms ease;   /* Alterar 300ms */
  --transition-slow: 500ms ease;   /* Alterar 500ms */
}
```

### Remover Animações (Performance)
**Arquivo**: `css/style.css`
```css
/* Procure por */
animation: slideIn 0.3s ease-out;

/* Remova ou altere para */
animation: none;
```

---

## 🐛 Troubleshooting

### Filtros não aparecem
**Solução 1**: Verifique se `js/filtros.js` foi carregado
- Abra DevTools (F12) → Console
- Verifique se há erros JavaScript

**Solução 2**: Verifique se o HTML está correto
- Procure por `class="filtros-container"`
- Verifique se todos `<button>` têm `data-filtro-tribunal`

**Solução 3**: Limpe cache
- Pressione Ctrl+Shift+Delete
- Limpe cache e cookies

### Carousel não aparece
**Solução 1**: Verifique se `js/storytelling.js` foi carregado
- Abra DevTools (F12) → Console
- Procure por erros

**Solução 2**: Verifique se `#storytelling-carousel` existe
- Procure no HTML por este ID
- Confirme que está dentro da seção de distribuição

### Notificações não aparecem
**Solução 1**: Verifique z-index
```css
.notification {
  z-index: 1000;  /* Aumente se necessário */
}
```

**Solução 2**: Verifique se `showNotification()` é chamada
- Abra DevTools → Console
- Digite `showNotification('Teste', 'success')`
- Pressione Enter

### Responsividade quebrada
**Solução 1**: Limpe cache do navegador
**Solução 2**: Pressione F12 → Clique em "Toggle device toolbar"
**Solução 3**: Recarregue a página com Ctrl+F5

---

## 📚 Documentação Completa

Para mais detalhes, consulte:
- `IMPLEMENTACAO_FASE2.md` - Detalhes técnicos
- `RESUMO_IMPLEMENTACAO_COMPLETO.md` - Visão geral completa
- `CHECKLIST_FASE2.md` - Checklist de implementação

---

## 💡 Dicas

1. **Teste em múltiplos navegadores**: Chrome, Firefox, Safari, Edge
2. **Use DevTools**: F12 para debug
3. **Teste responsividade**: F12 → Responsive Mode
4. **Monitore performance**: F12 → Performance tab
5. **Valide HTML**: https://validator.w3.org/

---

**Última atualização**: 2025  
**Versão**: 2.0 (Fase 2)  
**Status**: ✅ Pronto para Uso
