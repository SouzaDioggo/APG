import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FeatureBanner } from "@/components/feature-banner"
import { TestimonialsSection } from "@/components/testimonials-section" 
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
        <AboutSection />
      </ScrollReveal>

      <ScrollReveal delay="0.2s">
        <FeatureBanner />
      </ScrollReveal>
      
      <ScrollReveal>
        <TestimonialsSection />
      </ScrollReveal>
      
      {/* O botão flutuante também pode ter animação se desejar, ou deixe fixo */}
      <FloatingElements />

      {/* Footer */}
      <Footer />

    </main>
  )
}