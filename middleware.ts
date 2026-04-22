import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Armazenamento temporário em memória
const ipCache = new Map<string, { count: number; lastReset: number }>()

const MAX_REQUESTS = 60 // Limite de requisições
const WINDOW_MS = 60 * 1000 // Janela de 1 minuto

export function middleware(request: NextRequest) {
  // Pega o IP real vindo da Cloudflare ou do proxy da Hostinger
  const ip = request.headers.get('cf-connecting-ip') ?? 
             request.headers.get('x-real-ip') ?? 
             '127.0.0.1'

  const now = Date.now()
  const userData = ipCache.get(ip) || { count: 0, lastReset: now }

  // Reseta o contador se a janela de tempo passou
  if (now - userData.lastReset > WINDOW_MS) {
    userData.count = 0
    userData.lastReset = now
  }

  userData.count++
  ipCache.set(ip, userData)

  // Bloqueia se passar do limite
  if (userData.count > MAX_REQUESTS) {
    return new NextResponse('Muitas requisições. Seu IP foi temporariamente limitado.', {
      status: 429,
      headers: { 'Content-Type': 'text/plain' }
    })
  }

  return NextResponse.next()
}

// Aplica o rate limit apenas em rotas críticas (API e Login)
export const config = {
  matcher: ['/api/:path*', '/login'],
}