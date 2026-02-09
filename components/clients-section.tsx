"use client"

import { Card } from "@/components/ui/card"
import { Briefcase, TrendingUp, Scale } from "lucide-react"

export function ClientsSection() {
  const clientTypes = [
    {
      icon: Briefcase,
      title: "Empresários",
      description: "Você que precisa estruturar seu negócio corretamente desde o início ou otimizar a gestão de contratos e obrigações. Oferecemos consultoria completa do plano de negócios à gestão diária, garantindo eficiência operacional e economia real.",
      services: [
        "Escolha da melhor estrutura societária (MEI, Ltda, S.A.)",
        "Elaboração e gestão de contratos comerciais",
        "Compliance com obrigações regulatórias",
        "Contratos com Poder Público",
        "Planejamento tributário estratégico"
      ]
    },
    {
      icon: TrendingUp,
      title: "Assessores de Empresários",
      description: "Para contadores, advogados jovens e economistas que querem dominar estruturação de negócios, planejamento tributário e gestão de contratos. Oferecemos capacitação técnica aplicável que eleva o nível do seu trabalho.",
      services: [
        "Elaboração de planos de negócio completos",
        "Estruturação societária (Ltda, S.A., escolhas tributárias)",
        "Redação e análise de contratos empresariais",
        "Compliance e boa governança",
        "Gestão estratégica de obrigações"
      ]
    },
    {
      icon: Scale,
      title: "Advogados",
      description: "Profissionais que buscam especialização nas áreas mais valorizadas do mercado jurídico: gestão de contratos, compliance, LGPD e direito empresarial estratégico. Oferecemos formação técnica de alto nível.",
      services: [
        "Contratos empresariais complexos",
        "Compliance corporativo",
        "LGPD aplicada (Data Protection Officer)",
        "Gestão contratual estratégica",
        "Estruturação de negócios"
      ]
    }
  ]

  return (
    <section className="py-28 bg-linear-to-b from-white to-slate-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-serif">
            Para Quem <span className="bg-linear-to-r from-[#1a4d7a] to-[#0d2d4a] bg-clip-text text-transparent">Atendemos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Especializados em atender empresários, assessores de empresários e advogados que buscam excelência na gestão, compliance e estruturação empresarial.
          </p>
        </div>

        {/* Client Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {clientTypes.map((client, index) => {
            const Icon = client.icon
            return (
              <Card
                key={index}
                className="bg-white border border-slate-200 hover:border-[#c9a961] hover:shadow-xl transition-all duration-300 group p-8"
              >
                {/* Icon */}
                <div className="bg-linear-to-br from-[#ecf0f1] to-[#ecf0f1] w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:from-[#ecf0f1] group-hover:to-[#ecf0f1] transition-all duration-300">
                  <Icon className="w-8 h-8 text-[#1a4d7a]" />
                </div>

                {/* Title and Description */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#1a4d7a] transition-colors duration-300">
                  {client.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {client.description}
                </p>

                {/* Services List */}
                <div className="border-t border-slate-200 pt-6">
                  <p className="text-xs font-semibold text-[#1a4d7a] uppercase tracking-wide mb-4">O que você aprende:</p>
                  <ul className="space-y-2">
                    {client.services.map((service, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-[#c9a961] font-bold mt-0.5">•</span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
