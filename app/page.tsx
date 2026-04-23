import { HeroSection } from "@/components/landing-page/hero-section";
import { BenefitsSection } from "@/components/landing-page/benefits-section";
import { ClientsSection } from "@/components/landing-page/clients-section";
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

      <ScrollReveal>
        <BenefitsSection />
      </ScrollReveal>

      {/* Seção: Para Quem Atendemos */}
      <ScrollReveal>
        <ClientsSection />
      </ScrollReveal>

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
