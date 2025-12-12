import { Navbar } from "@/components/navbar"
import { FloatingElements } from "@/components/floating-elements"

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar reutilizada para manter a navegação */}
      <Navbar />

      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Blog
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Acompanhe nossas últimas notícias e artigos.
        </p>

        {/* Aqui você colocaria a lista de posts do blog */}
        <div className="grid gap-6">
          <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-2">Título do Artigo 1</h2>
            <p className="text-gray-600">Resumo do artigo...</p>
          </div>
          {/* Mais posts... */}
        </div>
      </div>

      <FloatingElements />
    </main>
  )
}