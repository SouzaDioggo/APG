"use client"

import { MessageCircle, ArrowDown } from "lucide-react"

export function FloatingElements() {
  return (
    <>
      {/* Support Indicator */}
      <div className="fixed bottom-8 left-8 z-40 hidden md:flex flex-col items-center gap-2">
        <p className="text-xs text-gray-600 font-medium text-center max-w-[120px]">Suporte Presencial (Sede)</p>
        <ArrowDown className="w-5 h-5 text-gray-600 animate-bounce" />
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        aria-label="Chat support"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    </>
  )
}
