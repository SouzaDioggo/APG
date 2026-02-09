"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-28 bg-linear-to-r from-[#1a4d7a] to-[#0d2d4a] text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1a4d7a] rounded-full opacity-20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#0d2d4a] rounded-full opacity-20 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight font-serif">
            Pronto para Transformar sua Empresa?
          </h2>
          
          <p className="text-xl md:text-2xl text-[#ecf0f1] mb-8 leading-relaxed">
            Agende uma consultoria estratégica e descubra como podemos gerar economia real e segurança jurídica para seu negócio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.href = '/sobre'}
              className="bg-white text-[#1a4d7a] hover:bg-[#ecf0f1] text-lg px-8 py-6 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              Conheça a APG
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            <Button
              onClick={() => window.location.href = 'mailto:contato@apg.com.br'}
              className="bg-[#c9a961] hover:bg-[#d4b876] text-white text-lg px-8 py-6 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer border-2 border-white"
            >
              Entre em Contato
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-[#ecf0f1] text-sm mt-8">
            Transformação organizacional com resultados mensuráveis
          </p>
        </div>
      </div>
    </section>
  )
}
