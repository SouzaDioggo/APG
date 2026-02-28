"use client"

import { Card } from "@/components/ui/card"

export function FounderSection() {
  return (
    <section className="py-28 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-serif">
            Fundador
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça quem está por trás da APG
          </p>
        </div>

        {/* Founder Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-linear-to-br from-slate-50 to-white border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Text Content */}
              <div className="flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                  Prof. Dr. Gabriel Siggelkow Guimarães
                </h3>
                
                <p className="text-[#1a4d7a] font-semibold text-lg mb-6">
                  Advogado, gestor e professor.
                </p>

                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Formação:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-[#c9a961] font-bold">•</span>
                      <span>Pós-graduado em direito, Mestre e doutor em Ciência Política.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#c9a961] font-bold">•</span>
                      <span>Especialista em Direito Digital e LGPD</span>
                    </li>                   
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Atuação:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c9a961] font-bold">•</span>
                      <span>Mais de 15 anos de atuação em gestão (pública e privada) e advocacia. Experiência acadêmica sendo professor de graduação e pós-graduação (direito, contabilidade e engenharia de software) e no mercado atuando juridicamente e em planejamento e execução de contratos.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c9a961] font-bold">•</span>
                      <span>Coordenador do grupo de pesquisa CNPQ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c9a961] font-bold">•</span>
                      <span>Especialista em contratos com Poder Público</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Image Placeholder */}
              <div className="flex items-center justify-center">
                <div className="w-full aspect-square bg-linear-to-br from-[#ecf0f1] to-[#ecf0f1] rounded-lg flex items-center justify-center border-2 border-[#c9a961]">
                  <div className="text-center">
                    <svg className="w-20 h-20 text-[#1a4d7a] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-[#1a4d7a] font-semibold">Prof. Dr. Gabriel Siggelkow Guimarães</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Juliana Card */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="bg-linear-to-br from-slate-50 to-white border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Text Content */}
              <div className="flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                  Juliana Calheiros
                </h3>
                
                <p className="text-[#1a4d7a] font-semibold text-lg mb-6">
                  Especialista em Recursos Humanos e Administração.
                </p>

                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Formação:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-[#c9a961] font-bold">•</span>
                      <span>Graduada e pós-graduada em Recursos Humanos e Administração</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Atuação:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c9a961] font-bold">•</span>
                      <span>Mais de 10 anos de experiência com recursos humanos e administração</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c9a961] font-bold">•</span>
                      <span>Experiência com Poder Público e iniciativa privada em gestão de pessoas, planejamento e organização</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c9a961] font-bold">•</span>
                      <span>Atuação em formação de custos para planejamento de compras</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Image Placeholder */}
              <div className="flex items-center justify-center">
                <div className="w-full aspect-square bg-linear-to-br from-[#ecf0f1] to-[#ecf0f1] rounded-lg flex items-center justify-center border-2 border-[#c9a961]">
                  <div className="text-center">
                    <svg className="w-20 h-20 text-[#1a4d7a] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-[#1a4d7a] font-semibold">Juliana Calheiros</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
