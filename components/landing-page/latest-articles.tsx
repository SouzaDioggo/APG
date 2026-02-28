'use client';

import Link from 'next/link';
import { ArtigosBlog, obterUltimosArtigos } from '@/lib/blog-data';
import { Calendar, Eye, Tag } from 'lucide-react';

export function LatestArticles() {
  const artigos = obterUltimosArtigos(3);

  return (
    <section className="py-16 bg-linear-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título da seção */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Últimos Artigos
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Acompanhe as notícias e conteúdos mais recentes do nosso blog
          </p>
        </div>

        {/* Grid de artigos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {artigos.map((artigo) => (
            <article
              key={artigo.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col"
            >
              {/* Imagem do artigo */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={artigo.imagem}
                  alt={artigo.titulo}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Conteúdo */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Categoria e data */}
                <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {artigo.categoria}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(artigo.data).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 grow">
                  {artigo.titulo}
                </h3>

                {/* Resumo */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {artigo.resumo}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {artigo.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Rodapé com visualizações e botão */}
                <div className="border-t pt-4 mt-auto">
                  <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {artigo.visualizacoes} visualizações
                    </span>
                    <span className="text-gray-400">Por {artigo.autor}</span>
                  </div>

                  <Link
                    href={`/blog/${artigo.slug}`}
                    className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors duration-200"
                  >
                    Ler Artigo
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Botão para ver todos */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Ver Todos os Artigos
          </Link>
        </div>
      </div>
    </section>
  );
}
