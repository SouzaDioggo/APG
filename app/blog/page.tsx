import { Navbar } from "@/components/layout/navbar";
import { BlogGrid } from "@/components/blog/blog-grid";
import { Footer } from "@/components/layout/footer";
import { FloatingElements } from "@/components/layout/floating-elements";
import { ArrowLeft } from "lucide-react";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero section para o blog */}
      <section className="bg-linear-to-r from-[#12395c] to-blue-800 text-white py-12">
        <a href="/" className="ml-48">
          {" "}
          <ArrowLeft className="inline mr-2" size={16} />
          Voltar
        </a>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-blue-100 text-lg">
            Artigos, dicas e insights para seu desenvolvimento profissional
          </p>
        </div>
      </section>

      <BlogGrid />

      <FloatingElements />
      <Footer />
    </main>
  );
}
