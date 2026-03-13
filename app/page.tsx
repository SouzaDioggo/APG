import { HeroSection } from "@/components/landing-page/hero-section";
import { AboutSection } from "@/components/landing-page/about-section";
import { FeatureBanner } from "@/components/landing-page/feature-banner";
import { CoursesSection } from "@/components/landing-page/courses-section";
import { BenefitsSection } from "@/components/landing-page/benefits-section";
import { TestimonialsSection } from "@/components/landing-page/testimonials-section";
import { FounderSection } from "@/components/landing-page/founder-section";
import { ClientsSection } from "@/components/landing-page/clients-section";
import { LatestArticles } from "@/components/landing-page/latest-articles";
import { CTASection } from "@/components/landing-page/cta-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/layout/scroll-reveal";
import { FloatingElements } from "@/components/layout/floating-elements";

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
  );
}
