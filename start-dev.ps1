# Script PowerShell para inicializar projeto Travestida de
# Execute com: .\start-dev.ps1

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "🚀 Iniciando Travestida de V2.0 (Desenvolvimento)" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Python está instalado
$pythonCheck = python --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Python não encontrado. Por favor, instale Python 3.8+" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Python encontrado: $pythonCheck" -ForegroundColor Green

# Verificar se pip está instalado
$pipCheck = pip --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ pip não encontrado." -ForegroundColor Red
    exit 1
}
Write-Host "✅ pip encontrado: $pipCheck" -ForegroundColor Green
Write-Host ""

# Instalar dependências backend se não existir venv
if (-Not (Test-Path "backend\venv")) {
    Write-Host "📦 Instalando dependências backend..." -ForegroundColor Yellow
    cd backend
    pip install -r requirements.txt
    cd ..
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "🎯 Próximas etapas:" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Abra um PowerShell novo e execute:" -ForegroundColor Yellow
Write-Host "    cd backend" -ForegroundColor White
Write-Host "    python run_api.py" -ForegroundColor White
Write-Host ""
Write-Host "2️⃣  Abra outro PowerShell e execute:" -ForegroundColor Yellow
Write-Host "    python -m http.server 8000" -ForegroundColor White
Write-Host ""
Write-Host "3️⃣  Abra o navegador em:" -ForegroundColor Yellow
Write-Host "    http://localhost:8000" -ForegroundColor White
Write-Host ""
Write-Host "4️⃣  Acesse a documentação da API em:" -ForegroundColor Yellow
Write-Host "    http://127.0.0.1:5000/docs" -ForegroundColor White
Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "✨ Ambiente pronto para desenvolvimento!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

