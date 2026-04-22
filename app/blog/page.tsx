import { Navbar } from "@/components/layout/navbar";
import { BlogGrid } from "@/components/blog/blog-grid";
import { Footer } from "@/components/layout/footer";
import { FloatingElements } from "@/components/layout/floating-elements";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <section className="relative bg-gradient-to-r from-[#1a4d7a] to-[#0d2d4a] text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center text-blue-200 hover:text-white transition-all duration-300 text-sm font-medium mb-8 bg-white/5 hover:bg-white/15 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/30 w-fit hover:-translate-x-1"
          >
            <ArrowLeft className="mr-2" size={16} />
            Voltar para o Início
          </Link>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Portal de <span className="text-[#c9a961]">Insights</span>
          </h1>
          <p className="text-blue-100/80 text-lg md:text-xl max-w-2xl font-light">
            Aprofunde seus conhecimentos com nossos conteúdos exclusivos sobre
            gestão, tecnologia e inovação.
          </p>
        </div>
      </section>

      <div className="flex-1">
        <BlogGrid />
      </div>

      <FloatingElements />
      <Footer />
    </main>
  );
}
