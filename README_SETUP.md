# Travestida de V2.0 - Guia de Setup e Execução

## 📋 Visão Geral

**Travestida de** é um projeto interativo de divulgação científica sobre Física Informacional e Análise do Discurso, aplicado ao contexto jurídico brasileiro.

Este projeto integra:
- **Frontend**: HTML, CSS, JavaScript com Charts.js
- **Backend**: FastAPI + Pandas para servir dados e análises
- **Visualizações**: Gráficos interativos, tags clicáveis, popovers, modais

---

## 🚀 Quick Start (Windows PowerShell)

### 1. Instalar Dependências Backend

```powershell
cd backend
pip install -r requirements.txt
```

### 2. Executar Backend (API)

```powershell
python backend/run_api.py
```

Ou diretamente:

```powershell
python -m uvicorn backend.api:app --host 127.0.0.1 --port 5000 --reload
```

**Resultado esperado:**
```
INFO:     Uvicorn running on http://127.0.0.1:5000
```

### 3. Servir Frontend (novo PowerShell)

Na pasta raiz do projeto:

```powershell
python -m http.server 8000
```

Ou, se tiver Node.js instalado:

```powershell
npx http-server -p 8000
```

**Resultado esperado:**
```
Serving HTTP on 0.0.0.0 port 8000
```

### 4. Abrir no Navegador

- **Página Principal**: http://localhost:8000
- **API Backend**: http://127.0.0.1:5000
- **Documentação da API (Swagger)**: http://127.0.0.1:5000/docs

---

## 📁 Estrutura do Projeto

```
travestida_de_v2/
├── index.html                    # Página principal
├── secao-algoritmo.html          # (Arquivo legado - opcional)
├── README.md                     # Este arquivo
├── css/
│   ├── style.css               # Estilos principais
│   ├── responsive.css          # Responsividade
│   ├── fapesp-integration.css  # Estilos FAPESP
│   └── entropia-visualizacoes.css
├── js/
│   ├── main.js                 # Funções principais
│   ├── charts.js               # Configuração dos gráficos
│   ├── modals.js               # Sistema de modais e popovers
│   ├── api-client.js           # Cliente HTTP para backend
│   ├── algoritmo.js            # (Legado)
│   └── entropia-avancado.js    # (Legado)
├── backend/
│   ├── api.py                  # API FastAPI
│   ├── requirements.txt        # Dependências Python
│   └── run_api.py              # Script para executar API
└── assets/
    ├── fonts/
    ├── images/
    └── logos/
```

---

## 🔌 Endpoints da API

### Health Check
```
GET /health
```

### Dashboard Consolidado
```
GET /api/dashboard
```
Retorna: total de acórdãos, período, pico temporal, tribunal líder, etc.

### Evolução Temporal (2015-2025)
```
GET /api/evolucao-temporal
GET /api/evolucao-temporal?tribunal=TJ-SP
```

### Distribuição por Tribunal
```
GET /api/distribuicao-tribunais
```

### Contexto Jurídico
```
GET /api/contexto-juridico
```

### Análise de Entropia
```
GET /api/entropia-comparacao
```

### Calcular Entropia Personalizada
```
POST /api/calcular-entropia
Content-Type: application/json

{ "texto": "Seu texto aqui..." }
```

### Conceitos Jurídicos
```
GET /api/conceitos-frequencia
```

### Filtro por Tribunal
```
GET /api/filtro/tribunal/TJ-SP
```

**Tribunais válidos:** TJ-SP, TJ-PR, TJ-MG, TJ-RJ, TJ-SC

---

## 🎯 Funcionalidades Principais

### 1. Gráficos Interativos
- Evolução temporal (2015-2025)
- Distribuição por tribunal
- Contexto jurídico (Direito Civil, Empresarial, etc.)
- Comparação de entropia

**Escala:** Todos os gráficos foram reduzidos em 70% via CSS (classe `.chart-scale-70`)

### 2. Tags de Conceito Clicável
Palavras-chave como "Simulação", "Doação", "Compra e Venda" aparecem com:
- Destaque visual (fundo amarelo/azul)
- Clique para abrir modal com definição jurídica
- Link para navegação interna (scroll suave)

**Exemplo:**
```html
<span class="tag-conceito" 
      data-conceito-id="conceito-simulacao" 
      data-definicao="Frequência: 45%. Definição...">
  Simulação
</span>
```

### 3. Sistema de Modais
- Modais dinâmicos para conceitos jurídicos
- Modais para aplicações (Jurisprudência, Jornalismo, Política, etc.)
- Popovers com tooltips
- Fechamento automático ao clicar fora

### 4. CTA de Legendas Dinâmicas
Painel flutuante no canto inferior direito com botões que levam aos conceitos relacionados nos gráficos

### 5. Newsletter Integration
CTA para inscrição na newsletter "Perspectivas de Resistência" (Substack)

---

## ⚙️ Customização

### Adicionar Novo Endpoint API

1. Editar `backend/api.py`
2. Adicionar função com decorator `@app.get()` ou `@app.post()`
3. Reiniciar API

Exemplo:
```python
@app.get("/api/novo-endpoint")
def get_novo_endpoint():
    return {"status": "success", "data": {...}}
```

### Modificar Dados do Corpus

Os dados estão em `backend/api.py` nas variáveis:
- `dados_tribunal`
- `dados_distribuicao`
- `dados_contexto_juridico`
- `dados_entropia`
- `conceitos_frequencia`

### Adicionar Nova Tag de Conceito

1. Adicionar entrada em `js/modals.js` em `definicoesConceitosJuridicos` ou `definicoesConceitosAplicacoes`
2. Adicionar span com classe `tag-conceito` no HTML
3. Adicionar `data-conceito-id` correspondente

---

## 🐛 Troubleshooting

### API não conecta (erro 404/CORS)
- Verificar se backend está rodando em `http://127.0.0.1:5000`
- Checar console do navegador para mensagens de erro
- Limpar cache (F5 ou Ctrl+Shift+Delete)

### Gráficos não aparecem
- Abrir console (F12) e procurar por erros de Chart.js
- Verificar se Chart.js está sendo carregado via CDN
- Checar se IDs dos canvas correspondem às funções JS

### Modais não funcionam
- Verificar se `js/modals.js` está sendo carregado
- Verificar se `data-conceito-id` dos elementos está correto
- Abrir console para ver se há erros de JavaScript

### CORS error ao fazer fetch
- Backend deve estar com `CORSMiddleware` ativo
- Verificar `allow_origins` em `backend/api.py`

---

## 📊 Dados do Corpus

**Total de Acórdãos:** 100
**Período:** 2015-2025

### Distribuição Geográfica
- TJ-SP: 25 (25%)
- TJ-PR: 18 (18%)
- TJ-MG: 15 (15%)
- TJ-RJ: 12 (12%)
- TJ-SC: 10 (10%)
- Outros: 20 (20%)

### Contexto Jurídico
- Direito Civil: 45%
- Direito Empresarial: 25%
- Direito do Consumidor: 15%
- Outros: 15%

### Conceitos Jurídicos (Frequência)
- Simulação: 45%
- Doação: 15%
- Compra e Venda: 12%
- Fomento: 10%
- Factoring: 8%
- Outros: 10%

### Métricas de Entropia
- **Sem "travestida de":** S* = 3.5 (Alta entropia = flexível)
- **Com "travestida de":** S* = 2.8 (Baixa entropia = rígido)
- **Redução:** 20%
- **Variabilidade com expressão:** 82% (alta previsibilidade)
- **Taxa de procedência:** 85%

---

## 🎓 Sobre a Pesquisa

Esta pesquisa investiga como a expressão "travestida de" funciona como um marcador linguístico de rigidez discursiva no contexto jurídico brasileiro, utilizando conceitos de **Física Informacional** e **Entropia de Shannon**.

**Autora:** Maria Lis Cardoso  
**Newsletter:** [Perspectivas de Resistência](https://marialiscardoso.substack.com/)  
**GitHub:** https://github.com/marialiscardososc-star/travestida_de  

---

## 📝 Licença

[Especificar licença aqui]

---

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor:
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

## ❓ Dúvidas?

Abra uma issue no GitHub ou entre em contato via LinkedIn:
https://www.linkedin.com/in/marialiscardoso/

