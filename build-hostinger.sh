#!/bin/bash

# Script para Build e Deploy no Hostinger
# Executar: bash build-hostinger.sh

set -e  # Exit on error

echo "================================"
echo "🚀 Iniciando Build para Hostinger"
echo "================================"

# 1. Limpar cache e node_modules
echo "📦 Limpando cache anterior..."
rm -rf .next
rm -rf node_modules
rm -rf dist
rm -rf out

# 2. Instalar dependências com yarn
echo "📥 Instalando dependências..."
yarn install --frozen-lockfile --prefer-offline || yarn install

# 3. Exportar variáveis de ambiente
echo "🔧 Configurando variáveis de ambiente..."
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1
export NODE_OPTIONS="--max-old-space-size=3072"

# 4. Build do Next.js
echo "⚙️ Executando build Next.js..."
yarn build

# 5. Verificar se o build foi bem-sucedido
if [ -d ".next" ]; then
    echo "✅ Build completo com sucesso!"
    echo ""
    echo "📊 Informações do build:"
    du -sh .next
    echo ""
    echo "🎯 Deploy pronto!"
else
    echo "❌ Erro: Build não completou corretamente"
    exit 1
fi

# 6. Corrigir permissões
echo "🔐 Corrigindo permissões..."
chmod -R 755 .next
chmod -R 755 public

echo ""
echo "================================"
echo "✨ Build concluído com sucesso!"
echo "================================"
echo ""
echo "Próximas etapas:"
echo "1. Suba o arquivo build-hostinger.sh para o servidor"
echo "2. Acesse via SSH: ssh usuario@host"
echo "3. Navegue até a pasta do projeto"
echo "4. Execute: bash build-hostinger.sh"
echo "5. O servidor via PM2 iniciará automaticamente"
echo ""
