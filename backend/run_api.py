#!/usr/bin/env python3
"""
Script para executar a API backend
Execute com: python backend/run_api.py
"""

import subprocess
import sys
import os

# Mudar para diretório do backend
os.chdir(os.path.dirname(os.path.abspath(__file__)))

print("=" * 60)
print("🚀 INICIANDO API BACKEND - Travestida de V2.0")
print("=" * 60)
print("\n📍 URL da API: http://127.0.0.1:5000")
print("📍 Documentação (Swagger): http://127.0.0.1:5000/docs")
print("📍 Health Check: http://127.0.0.1:5000/health")
print("\nPressione CTRL+C para parar o servidor.\n")

# Executar API
try:
    subprocess.run([sys.executable, "-m", "uvicorn", "api:app", "--host", "127.0.0.1", "--port", "5000", "--reload"])
except KeyboardInterrupt:
    print("\n\n✋ API parada pelo usuário")
    sys.exit(0)

