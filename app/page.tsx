import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FeatureBanner } from "@/components/feature-banner"
import { CoursesSection } from "@/components/courses-section"
import { FloatingElements } from "@/components/floating-elements"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeatureBanner />
      <FloatingElements />
    </main>
  )
}
