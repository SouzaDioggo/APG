import { Navbar } from "@/components/navbar"
import { BlogGrid } from "@/components/blog-grid"
import { Footer } from "@/components/footer"
import { FloatingElements } from "@/components/floating-elements"

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Hero section para o blog */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-blue-100 text-lg">Artigos, dicas e insights para seu desenvolvimento profissional</p>
        </div>
      </section>

      <BlogGrid />

      <FloatingElements />
      <Footer />
    </main>
  )
}