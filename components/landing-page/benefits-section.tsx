"use client"

import { BarChart3, Zap, Users, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BenefitsSection() {
  const benefits = [
    {
      icon: BarChart3,
      title: "Resultados Mensuráveis",
      description: "Transformamos estratégias em números reais. Cada projeto é monitorado com métricas claras para garantir resultado. Acreditamos que empresas de excelência são construídas por equipes engajadas, processos bem estruturados e decisões orientadas por dados.",
      highlight: "Crescimento comprovado"
    },
    {
      icon: Zap,
      title: "Transformação Rápida",
      description: "Não perdemos tempo. Nossas metodologias são otimizadas para entregar mudanças significativas em prazos realistas. Trabalhamos com urgência estratégica para que você veja resultados o quanto antes.",
      highlight: "Eficiência operacional"
    },
    {
      icon: Users,
      title: "Equipes Engajadas",
      description: "Capacitamos seu time para que se tornem protagonistas da transformação. Mudança duradoura vem de pessoas, não apenas de processos. Nossa abordagem garante comprometimento e execução eficiente.",
      highlight: "Cultura de excelência"
    },
    {
      icon: Trophy,
      title: "Expertise Comprovada",
      description: "Mais de 15 anos de experiência em transformação organizacional e consultoria empresarial. Parceiros de empresas que crescem e prosperam com resultados mensuráveis.",
      highlight: "Confiança estabelecida"
    },
  ]

  return (
    <section className="py-28 bg-linear-to-b from-white to-slate-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-serif">
            Por Que Escolher a <span className="bg-linear-to-r from-[#1a4d7a] to-[#0d2d4a] bg-clip-text text-transparent">APG</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Resultados reais para empresas que querem crescer. Conheça os diferenciais que nos tornam parceiros ideais para sua transformação.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-lg border border-slate-200 hover:border-[#c9a961] hover:shadow-lg transition-all duration-300 group"
              >
                {/* Ícone */}
                <div className="bg-linear-to-br from-[#ecf0f1] to-[#ecf0f1] w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:from-[#ecf0f1] group-hover:to-[#ecf0f1] transition-all duration-300">
                  <Icon className="w-7 h-7 text-[#1a4d7a]" />
                </div>

                {/* Conteúdo */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#1a4d7a] transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {benefit.description}
                </p>
                
                {/* Badge */}
                <div className="inline-block">
                  <span className="text-xs font-semibold text-[#1a4d7a] bg-[#ecf0f1] px-3 py-1 rounded-full">
                    {benefit.highlight}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            onClick={() => window.location.href = '/cursos'}
            className="bg-linear-to-r from-[#1a4d7a] to-[#0d2d4a] hover:from-[#0d2d4a] hover:to-[#1a4d7a] text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Conheça Nossos Cursos
          </Button>
          <p className="text-gray-600 text-sm mt-4">
            Clique para explorar nossos treinamentos ou <a href="/sobre" className="text-[#1a4d7a] font-semibold hover:underline">saiba mais sobre nós</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
