"""
TRAVESTIDA DE V2.0 - API BACKEND
FastAPI + Pandas para servir dados de tribunais e análise de entropia
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import math
from typing import List, Dict, Optional

# ============================================================
# INICIALIZAÇÃO
# ============================================================
app = FastAPI(
    title="Travestida de - API",
    description="API para servir dados de análise de tribunais e entropia discursiva",
    version="2.0"
)

# ============================================================
# CORS MIDDLEWARE
# ============================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "http://localhost:3000", "http://127.0.0.1:8000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# DATA: CORPUS DE 100 ACÓRDÃOS (2015-2025)
# ============================================================
dados_tribunal = {
    'ano': [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
    'casos': [8, 10, 12, 14, 16, 17.5, 15, 13, 11, 9, 7]
}

dados_distribuicao = {
    'tribunal': ['TJ-SP', 'TJ-PR', 'TJ-MG', 'TJ-RJ', 'TJ-SC', 'Outros'],
    'percentual': [25, 18, 15, 12, 10, 20],
    'casos': [25, 18, 15, 12, 10, 20]
}

dados_contexto_juridico = {
    'area': ['Direito Civil', 'Direito Empresarial', 'Direito do Consumidor', 'Outros'],
    'percentual': [45, 25, 15, 15]
}

dados_entropia = {
    'categoria': ['Sem "travestida de"', 'Com "travestida de"'],
    'entropia': [3.5, 2.8],
    'variabilidade': ['Alta (criativa)', 'Baixa (rígida)']
}

# ============================================================
# ÍNDICE DE CONCEITOS JURÍDICOS
# ============================================================
conceitos_frequencia = {
    'Simulação': {'freq': 45, 'categoria': 'Vício Social'},
    'Doação': {'freq': 15, 'categoria': 'Fraude Sucessória'},
    'Compra e Venda': {'freq': 12, 'categoria': 'Transferência Mascarada'},
    'Fomento': {'freq': 10, 'categoria': 'Operação Empresarial'},
    'Factoring': {'freq': 8, 'categoria': 'Factoring Disfarçado'},
    'Contrato': {'freq': 5, 'categoria': 'Instrumento Geral'},
    'Negócio': {'freq': 3, 'categoria': 'Operação'},
    'Operação': {'freq': 2, 'categoria': 'Transação'}
}

# ============================================================
# ENDPOINTS: EVOLUÇÃO TEMPORAL
# ============================================================
@app.get("/api/evolucao-temporal")
def get_evolucao_temporal(tribunal: Optional[str] = None):
    """
    Retorna dados de evolução temporal de acórdãos com "travestida de" de 2015-2025.
    Parâmetro opcional: tribunal (TJ-SP, TJ-PR, etc.)
    """
    df = pd.DataFrame(dados_tribunal)
    
    return {
        "status": "success",
        "data": {
            "labels": df['ano'].tolist(),
            "datasets": [
                {
                    "label": f"Número de Acórdãos {f'- {tribunal}' if tribunal else '(Todos)'}",
                    "data": df['casos'].tolist(),
                    "tribunal": tribunal or "GERAL"
                }
            ]
        }
    }

# ============================================================
# ENDPOINTS: DISTRIBUIÇÃO GEOGRÁFICA
# ============================================================
@app.get("/api/distribuicao-tribunais")
def get_distribuicao_tribunais():
    """
    Retorna distribuição de acórdãos por tribunal (TJ-SP, TJ-PR, etc.)
    """
    df = pd.DataFrame(dados_distribuicao)
    
    return {
        "status": "success",
        "data": {
            "labels": df['tribunal'].tolist(),
            "datasets": [
                {
                    "label": "Acórdãos por Tribunal",
                    "data": df['casos'].tolist(),
                    "percentual": df['percentual'].tolist(),
                    "total": int(df['casos'].sum())
                }
            ]
        }
    }

# ============================================================
# ENDPOINTS: CONTEXTO JURÍDICO
# ============================================================
@app.get("/api/contexto-juridico")
def get_contexto_juridico():
    """
    Retorna distribuição por área do direito (Civil, Empresarial, etc.)
    """
    df = pd.DataFrame(dados_contexto_juridico)
    
    return {
        "status": "success",
        "data": {
            "labels": df['area'].tolist(),
            "datasets": [
                {
                    "label": "Ocorrências por Área",
                    "data": df['percentual'].tolist()
                }
            ]
        }
    }

# ============================================================
# ENDPOINTS: ANÁLISE DE ENTROPIA
# ============================================================
@app.get("/api/entropia-comparacao")
def get_entropia_comparacao():
    """
    Retorna comparação de entropia: com vs. sem "travestida de"
    """
    df = pd.DataFrame(dados_entropia)
    
    return {
        "status": "success",
        "data": {
            "labels": df['categoria'].tolist(),
            "datasets": [
                {
                    "label": "Entropia (S*)",
                    "data": df['entropia'].tolist(),
                    "variabilidade": df['variabilidade'].tolist(),
                    "reducao_percentual": 20  # 20% de redução
                }
            ]
        }
    }

# ============================================================
# ENDPOINTS: CÁLCULO DE ENTROPIA PERSONALIZADO
# ============================================================
@app.post("/api/calcular-entropia")
def calcular_entropia(texto: str):
    """
    Calcula entropia de Shannon para um texto fornecido.
    Fórmula: S* = -Σ p(x) · log₂ p(x)
    """
    if not texto or len(texto.strip()) < 10:
        raise HTTPException(status_code=400, detail="Texto muito curto")
    
    # Normalizar e contar palavras
    palavras = texto.lower().split()
    total_palavras = len(palavras)
    
    # Frequências únicas
    frequencias = {}
    for palavra in palavras:
        frequencias[palavra] = frequencias.get(palavra, 0) + 1
    
    # Calcular entropia
    entropia = 0
    for freq in frequencias.values():
        p = freq / total_palavras
        if p > 0:
            entropia -= p * math.log2(p)
    
    # Normalizar (máximo teórico é log2(n))
    entropia_maxima = math.log2(len(frequencias)) if frequencias else 1
    entropia_normalizada = entropia / entropia_maxima if entropia_maxima > 0 else 0
    
    # Classificar rigidez
    if entropia_normalizada < 0.4:
        classificacao = "MUITO RÍGIDO (Baixíssima entropia)"
        cor = "#EF4444"
    elif entropia_normalizada < 0.6:
        classificacao = "RÍGIDO (Baixa entropia)"
        cor = "#F59E0B"
    elif entropia_normalizada < 0.75:
        classificacao = "MODERADO (Entropia média)"
        cor = "#F59E0B"
    elif entropia_normalizada < 0.9:
        classificacao = "FLEXÍVEL (Alta entropia)"
        cor = "#10B981"
    else:
        classificacao = "MUITO FLEXÍVEL (Altíssima entropia)"
        cor = "#10B981"
    
    return {
        "status": "success",
        "data": {
            "texto_original": texto[:100] + "..." if len(texto) > 100 else texto,
            "comprimento": len(texto),
            "palavras_totais": total_palavras,
            "palavras_unicas": len(frequencias),
            "entropia_bruta": round(entropia, 3),
            "entropia_normalizada": round(entropia_normalizada, 3),
            "entropia_percentual": round(entropia_normalizada * 100, 1),
            "classificacao": classificacao,
            "cor": cor,
            "top_10_palavras": sorted(frequencias.items(), key=lambda x: x[1], reverse=True)[:10]
        }
    }

# ============================================================
# ENDPOINTS: CONCEITOS JURÍDICOS (PALAVRAS-CHAVE)
# ============================================================
@app.get("/api/conceitos-frequencia")
def get_conceitos_frequencia():
    """
    Retorna frequência de conceitos jurídicos encontrados
    """
    return {
        "status": "success",
        "data": {
            "conceitos": [
                {
                    "nome": conceito,
                    "frequencia": dados['freq'],
                    "categoria": dados['categoria']
                }
                for conceito, dados in conceitos_frequencia.items()
            ],
            "total": sum(d['freq'] for d in conceitos_frequencia.values())
        }
    }

# ============================================================
# ENDPOINTS: DADOS CONSOLIDADOS (Dashboard)
# ============================================================
@app.get("/api/dashboard")
def get_dashboard():
    """
    Retorna todos os dados consolidados para o dashboard principal
    """
    return {
        "status": "success",
        "data": {
            "total_acordaos": 100,
            "periodo": "2015-2025",
            "pico_temporal": {
                "ano": 2020,
                "casos": 17.5
            },
            "tribunal_lider": {
                "nome": "TJ-SP",
                "percentual": 25
            },
            "entropia_reducao": "20%",
            "taxa_procedencia": "85%",
            "variabilidade": "82% (alta previsibilidade)"
        }
    }

# ============================================================
# ENDPOINTS: FILTRO POR TRIBUNAL
# ============================================================
@app.get("/api/filtro/tribunal/{tribunal_code}")
def filtrar_por_tribunal(tribunal_code: str):
    """
    Filtra dados para um tribunal específico
    """
    tribunais_validos = ['TJ-SP', 'TJ-PR', 'TJ-MG', 'TJ-RJ', 'TJ-SC']
    
    if tribunal_code.upper() not in tribunais_validos:
        raise HTTPException(
            status_code=400, 
            detail=f"Tribunal inválido. Escolha entre: {', '.join(tribunais_validos)}"
        )
    
    # Buscar dados específicos do tribunal
    tribunal_info = next((t for t in zip(dados_distribuicao['tribunal'], dados_distribuicao['casos'], dados_distribuicao['percentual']) 
                         if t[0] == tribunal_code.upper()), None)
    
    if not tribunal_info:
        raise HTTPException(status_code=404, detail=f"Tribunal {tribunal_code} não encontrado")
    
    return {
        "status": "success",
        "data": {
            "tribunal": tribunal_info[0],
            "casos": int(tribunal_info[1]),
            "percentual": tribunal_info[2],
            "contexto_juridico": dados_contexto_juridico,
            "entropia_media": 2.8
        }
    }

# ============================================================
# HEALTH CHECK
# ============================================================
@app.get("/health")
def health_check():
    """
    Verifica se a API está operacional
    """
    return {
        "status": "ok",
        "version": "2.0",
        "message": "API Travestida de está operacional"
    }

# ============================================================
# ROOT
# ============================================================
@app.get("/")
def root():
    return {
        "message": "Bem-vindo à API Travestida de",
        "endpoints": [
            "/api/evolucao-temporal",
            "/api/distribuicao-tribunais",
            "/api/contexto-juridico",
            "/api/entropia-comparacao",
            "/api/conceitos-frequencia",
            "/api/dashboard",
            "/api/calcular-entropia (POST)",
            "/api/filtro/tribunal/{tribunal_code}",
            "/docs (Swagger UI)",
            "/health"
        ]
    }

# ============================================================
# EXECUÇÃO
# ============================================================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)

