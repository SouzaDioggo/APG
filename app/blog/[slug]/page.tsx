import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { obterArtigoPorSlug, artigosBlog } from '@/lib/blog-data';
import { Calendar, Eye, ArrowLeft } from 'lucide-react';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return artigosBlog.map((artigo) => ({
    slug: artigo.slug,
  }));
}

export default function ArtigoPage({ params }: PageProps) {
  const artigo = obterArtigoPorSlug(params.slug);

  if (!artigo) {
    notFound();
  }

  // Artigos relacionados (mesma categoria)
  const artigosRelacionados = artigosBlog
    .filter((a) => a.categoria === artigo.categoria && a.id !== artigo.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Artigo */}
      <article className="flex-1">
        {/* Hero do artigo */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={18} />
              Voltar ao Blog
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{artigo.titulo}</h1>
            <div className="flex flex-wrap items-center gap-6 text-blue-100">
              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {new Date(artigo.data).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <Eye size={18} />
                {artigo.visualizacoes} visualizações
              </span>
              <span className="bg-blue-500 px-3 py-1 rounded-full text-sm font-semibold">
                {artigo.categoria}
              </span>
            </div>
          </div>
        </div>

        {/* Imagem do artigo */}
        <div className="w-full h-96 bg-gray-200 overflow-hidden">
          <img
            src={artigo.imagem}
            alt={artigo.titulo}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Conteúdo do artigo */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Resumo */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{artigo.resumo}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b">
              {artigo.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full hover:bg-blue-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Conteúdo principal */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {artigo.conteudo}
              </p>
            </div>

            {/* Autor */}
            <div className="bg-gray-100 rounded-lg p-6 mb-12">
              <p className="text-gray-600">
                <span className="font-semibold">Escrito por:</span> {artigo.autor}
              </p>
              <p className="text-gray-600 text-sm">
                Publicado em {new Date(artigo.data).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Artigos relacionados */}
        {artigosRelacionados.length > 0 && (
          <section className="bg-gray-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Artigos Relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {artigosRelacionados.map((artigoRel) => (
                  <Link
                    key={artigoRel.id}
                    href={`/blog/${artigoRel.slug}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
                  >
                    <div className="h-40 bg-gray-200 overflow-hidden">
                      <img
                        src={artigoRel.imagem}
                        alt={artigoRel.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {artigoRel.titulo}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {artigoRel.resumo}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <Footer />
    </main>
  );
}
