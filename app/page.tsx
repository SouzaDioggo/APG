import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FeatureBanner } from "@/components/feature-banner"
import { TestimonialsSection } from "@/components/testimonials-section" 
import { FloatingElements } from "@/components/floating-elements"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeatureBanner />
      
      {/* 2. Coloque o componente onde deseja que ele apareça na tela */}
      <TestimonialsSection /> 
      
      <FloatingElements />
    </main>
  )
}