<<<<<<< HEAD
# 🎯 Projeto: Travestida de - Análise Linguística

## 📋 Descrição

Este projeto apresenta uma pesquisa sobre a expressão "travestida de" como marcador de simulação e rigidez discursiva no contexto jurídico brasileiro. O site foi desenvolvido com HTML5, CSS3 e JavaScript puro, sem dependências externas.

## 📁 Estrutura de Arquivos

```
projeto_travestida/
│
├── index.html              # Arquivo HTML principal
├── style.css               # Estilos CSS
├── script.js               # Funcionalidades JavaScript
├── README.md               # Este arquivo
│
├── logo.jpg                # Logo do projeto
├── sobre.autora.jpg        # Imagem da seção "Sobre a Autora"
│
└── Imagens das Seções:
    ├── secao-introducao.png
    ├── secao-metodologia.png
    ├── secao-resultados.png
    ├── secao-discussao.png
    └── secao-agenda.png
```

## 🚀 Como Usar

### 1. Instalação no VS Code

1. **Copie todos os arquivos** para uma pasta no seu computador
2. **Abra a pasta** no VS Code (File > Open Folder)
3. **Certifique-se** de que todos os arquivos estão na mesma pasta raiz

### 2. Visualização Local

Você pode visualizar o site de três formas:

#### Opção A: Abrir diretamente no navegador
- Clique com o botão direito em `index.html`
- Selecione "Open with" > seu navegador preferido

#### Opção B: Usar a extensão Live Server (Recomendado)
1. Instale a extensão "Live Server" no VS Code
2. Clique com o botão direito em `index.html`
3. Selecione "Open with Live Server"
4. O site abrirá automaticamente em `http://localhost:5500`

#### Opção C: Usar Python (se instalado)
```bash
# No terminal, dentro da pasta do projeto:
python -m http.server 8000
# Acesse: http://localhost:8000
```

## 🎨 Recursos Visuais Criados

### Imagens de Cabeçalho das Seções

Todas as imagens foram criadas seguindo o estilo visual das suas referências:

1. **secao-introducao.png** - Ícone de livro aberto em azul neon
2. **secao-metodologia.png** - Ícone de lupa para pesquisa
3. **secao-resultados.png** - Ícone de gráfico de barras
4. **secao-discussao.png** - Ícone de balões de conversa
5. **secao-agenda.png** - Ícone de calendário

Todas as imagens possuem:
- Fundo gradiente azul escuro (#0B0E13 a #005C7A)
- Ícones em azul neon (#00A0D6)
- Texto em branco bold
- Efeito de brilho sutil

## ✨ Funcionalidades Implementadas

### 1. Navegação Suave
- Clique nos links do menu para rolar suavemente até as seções
- Offset automático para compensar o header fixo

### 2. Busca de Conteúdo
- Digite um termo no campo de busca
- Pressione Enter ou clique no botão 🔍
- Ocorrências serão destacadas em amarelo
- Scroll automático para a primeira ocorrência

### 3. Gráfico Dinâmico
- Visualização da evolução temporal (2015-2024)
- Animação suave das barras
- Destaque especial para o ano de pico (2020)
- Hover interativo

### 4. Comparador de Entropia
- Toggle interativo para comparar entropia
- Mudança de cor dinâmica
- Atualização automática dos valores

### 5. Acordeão de Agenda Futura
- 5 painéis expansíveis
- Animação suave de abertura/fechamento
- Ícone rotativo (+)

### 6. Animações de Scroll
- Seções aparecem suavemente ao rolar a página
- Efeito fade-in + slide-up

## 🎨 Paleta de Cores

```css
--azul-neon: #00A0D6        /* Cor principal de destaque */
--azul-profundo: #005C7A    /* Cor secundária */
--grafite-escuro: #0B0E13   /* Fundo escuro */
--cinza-medio: #2B313C      /* Elementos intermediários */
--cinza-claro: #BAC3D0      /* Texto secundário */
--amarelo-destaque: #C9A740 /* Destaques especiais */
--texto-principal: #E5E7EB  /* Texto principal */
--texto-suave: #9CA3AF      /* Texto secundário */
```

## 📱 Responsividade

O site é totalmente responsivo e se adapta a:
- **Desktop:** Layout completo com sidebar
- **Tablet (< 880px):** Layout em coluna única
- **Mobile (< 640px):** Ajustes de fonte e espaçamento

## 🔧 Personalização

### Alterar Dados do Gráfico

Edite o array `dadosEvolucao` em `script.js`:

```javascript
const dadosEvolucao = [
  { ano: 2015, casos: 8 },
  { ano: 2016, casos: 10 },
  // Adicione ou modifique conforme necessário
];
```

### Alterar Cores

Modifique as variáveis CSS em `style.css`:

```css
:root {
  --azul-neon: #00A0D6;
  /* Altere conforme desejado */
}
```

### Adicionar Novas Seções

1. Crie uma nova `<section>` no `index.html`
2. Adicione um link correspondente no `<nav>`
3. Crie uma imagem de cabeçalho (opcional)

## 📊 Melhorias Implementadas

### Em relação ao código original:

1. ✅ **Conteúdo expandido** - Textos mais detalhados e informativos
2. ✅ **Imagens de seção** - Headers visuais para cada seção
3. ✅ **Animações suaves** - Transições e efeitos visuais
4. ✅ **Acessibilidade** - Labels ARIA e estrutura semântica
5. ✅ **SEO** - Meta tags e descrições
6. ✅ **Responsividade aprimorada** - Melhor adaptação mobile
7. ✅ **Interatividade** - Mais elementos interativos
8. ✅ **Documentação** - Comentários e README completo

## 🐛 Solução de Problemas

### Imagens não aparecem?
- Verifique se todas as imagens estão na mesma pasta que o `index.html`
- Verifique os nomes dos arquivos (são case-sensitive)

### Fontes não carregam?
- Certifique-se de estar conectado à internet
- As fontes são carregadas do Google Fonts

### JavaScript não funciona?
- Abra o Console do navegador (F12)
- Verifique se há erros
- Certifique-se de que o `script.js` está na mesma pasta

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique este README
2. Consulte os comentários nos arquivos de código
3. Abra o Console do navegador para debug

## 📄 Licença

Este projeto é de uso acadêmico e educacional.

---

**Desenvolvido com ❤️ para pesquisa em Linguística Forense**
=======
# travestida_de
>>>>>>> 78e1ad25ddc59b12709a4ba3297d5cf775c4c7ae
