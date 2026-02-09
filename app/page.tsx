import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { BenefitsSection } from "@/components/benefits-section"
import { FeatureBanner } from "@/components/feature-banner"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ClientsSection } from "@/components/clients-section"
import { CTASection } from "@/components/cta-section"
import { FloatingElements } from "@/components/floating-elements"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Navbar e Hero (Fundo) sem animação, aparecem instantaneamente */}
      <Navbar />
      <HeroSection />

      {/* As seções abaixo só animam quando você rolar até elas */}
      
      <ScrollReveal>
        <BenefitsSection />
      </ScrollReveal>

      {/* { { <ScrollReveal delay="0.2s"> } */}
        {/* { <FeatureBanner /> }  */}
      {/* { </ScrollReveal>} } */}
      
      {/* Seção: Para Quem Atendemos */}
      <ScrollReveal>
        <ClientsSection />
      </ScrollReveal>

      {/* <ScrollReveal>
        <TestimonialsSection />
      </ScrollReveal> seção de depoimentos */}

      {/* CTA Final */}
      <ScrollReveal>
        <CTASection />
      </ScrollReveal>
      
      {/* O botão flutuante também pode ter animação se desejar, ou deixe fixo */}
      <FloatingElements />

      {/* Footer */}
      <Footer />

    </main>
  )
}