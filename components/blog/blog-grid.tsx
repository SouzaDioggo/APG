"use client";

import Link from "next/link";
import { useState } from "react";
import { artigosBlog, buscarArtigos } from "@/lib/blog-data";
import { Calendar, Eye, Search, X } from "lucide-react";

export function BlogGrid() {
  const [filtroCategoria, setFiltroCategoria] = useState<string>("Todos");
  const [busca, setBusca] = useState("");

  // Obter categorias únicas
  const categorias = ["Todos", ...new Set(artigosBlog.map((a) => a.categoria))];

  // Filtrar artigos
  let artigosFiltrados = artigosBlog;

  if (filtroCategoria !== "Todos") {
    artigosFiltrados = artigosFiltrados.filter(
      (a) => a.categoria === filtroCategoria,
    );
  }

  if (busca) {
    artigosFiltrados = buscarArtigos(busca);
  }

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Todos os Artigos
          </h1>
          <p className="text-gray-600 text-lg">
            Explore todos os artigos, dicas e insights sobre tecnologia, design
            e negócios
          </p>
        </div>

        {/* Busca */}
        <div className="mb-8">
          <div className="relative">
            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {busca && (
              <button
                onClick={() => setBusca("")}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Filtros por categoria */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setFiltroCategoria(categoria)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${
                filtroCategoria === categoria
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Grid de artigos */}
        {artigosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artigosFiltrados.map((artigo) => (
              <article
                key={artigo.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
              >
                {/* Imagem */}
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={artigo.imagem}
                    alt={artigo.titulo}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Conteúdo */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Categoria */}
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {artigo.categoria}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar size={14} />
                      {new Date(artigo.data).toLocaleDateString("pt-BR")}
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

                  {/* Rodapé */}
                  <div className="border-t pt-4 mt-auto">
                    <Link
                      href={`/blog/${artigo.slug}`}
                      className="inline-block w-full text-center bg-linear-to-bl from-blue-600 to-blue-800 text-white font-semibold py-2 rounded hover:from-blue-700 hover:to-blue-900 hover:scale-105 transform transition-all duration-300"
                    >
                      Ler Artigo
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Nenhum artigo encontrado. Tente uma busca diferente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
