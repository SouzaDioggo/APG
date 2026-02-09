import { Navbar } from "@/components/navbar"
import { AboutSection } from "@/components/about-section"
import { ClientsSection } from "@/components/clients-section"
import { FounderSection } from "@/components/founder-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Hero Section para Sobre */}
      <section className="relative py-20 bg-linear-to-br from-[#1a4d7a] to-[#0d2d4a]">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 font-serif">
            Sobre a <span className="bg-linear-to-r from-[#c9a961] to-[#d4b876] bg-clip-text text-transparent">APG</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Conheça nossa história, missão e os serviços que transformam organizações em empresas de excelência.
          </p>
        </div>
      </section>

      {/* Seção Completa About */}
      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>

      {/* Seção de Valores */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
            Nossos Valores
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Valor 1 */}
            <div className="bg-linear-to-br from-slate-50 to-slate-100 p-8 rounded-lg border border-slate-200 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-[#1a4d7a] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Inovação</h3>
              <p className="text-gray-600 leading-relaxed">
                Buscamos constantemente novas metodologias e tecnologias para potencializar os resultados dos nossos clientes.
              </p>
            </div>

            {/* Valor 2 */}
            <div className="bg-linear-to-br from-slate-50 to-slate-100 p-8 rounded-lg border border-slate-200 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-[#1a4d7a] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excelência</h3>
              <p className="text-gray-600 leading-relaxed">
                Não aceitamos mediocridade. Cada projeto é executado com precisão e atenção aos detalhes.
              </p>
            </div>

            {/* Valor 3 */}
            <div className="bg-linear-to-br from-slate-50 to-slate-100 p-8 rounded-lg border border-slate-200 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-[#1a4d7a] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transparência</h3>
              <p className="text-gray-600 leading-relaxed">
                Comunicação clara e honesta em todos os processos. Você sempre sabe o que esperar de nós.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção: Para Quem Atendemos */}
      <ScrollReveal>
        <ClientsSection />
      </ScrollReveal>

      {/* Seção: Fundador */}
      <ScrollReveal>
        <FounderSection />
      </ScrollReveal>

      {/* CTA Final */}
      <ScrollReveal>
        <CTASection />
      </ScrollReveal>

      {/* Footer */}
      <Footer />
    </main>
  )
}
