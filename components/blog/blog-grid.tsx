"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getAllPosts, getAllCategories } from "@/lib/api";
import { Calendar, Search, X, Plus } from "lucide-react";
import { Post } from "@/Interfaces/Interface-Post";
import { Category } from "@/Interfaces/Interface-Categoria";
import { useAuth } from "@/contexts/AuthContext";

export function BlogGrid() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [filtroCategoria, setFiltroCategoria] = useState<string>("Todos");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [postsData, categoriesData] = await Promise.all([
          getAllPosts(),
          getAllCategories(),
        ]);
        setPosts(postsData || []);
        setCategories(categoriesData || []);
      } catch (err) {
        console.error("Erro ao carregar dados do blog:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getCategoryName = (id: number) => {
    const cat = categories.find((c) => String(c.id) === String(id));
    return cat ? cat.name : "Sem categoria";
  };

  const categoriasNomes = [
    "Todos",
    ...categories.map((categoria) => categoria.name),
  ];

  const artigosFiltrados = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(busca.toLowerCase());
    const matchesCategory =
      filtroCategoria === "Todos" ||
      getCategoryName(post.categorieId) === filtroCategoria;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* === CABEÇALHO ATUALIZADO RESPONSIVO === */}
        <div className="mb-10 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1 w-full">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 md:mb-4">
              Todos os Artigos
            </h1>
            <p className="text-slate-600 text-base md:text-lg">
              Explore nossos artigos, dicas e insights profissionais
            </p>
          </div>

          {(user?.type === "admin" || user?.type === "autor") && (
            <Link
              href="/blog/novo-artigo"
              className="w-full md:w-auto px-6 py-3 bg-linear-to-r from-[#1a4d7a] to-blue-700 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap hover:from-[#0f3554] hover:to-blue-800"
            >
              <Plus size={20} />
              Adicionar Artigo
            </Link>
          )}
        </div>
        {/* ======================================= */}

        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search
              className="absolute left-4 top-3.5 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar artigos por título..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1a4d7a] focus:ring-1 focus:ring-[#1a4d7a]"
            />
            {busca && (
              <button
                onClick={() => setBusca("")}
                className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categoriasNomes.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setFiltroCategoria(categoria)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 text-sm ${
                filtroCategoria === categoria
                  ? "bg-[#1a4d7a] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 flex justify-center">
            <div className="w-10 h-10 border-4 border-[#1a4d7a] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : artigosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artigosFiltrados.map((artigo) => (
              <article
                key={artigo.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col"
              >
                <div className="h-48 bg-slate-100 overflow-hidden relative">
                  <img
                    src={
                      artigo.image
                        ? `http://localhost:3001/uploads/${artigo.image}`
                        : "/abstract-blue-wave-technology.jpg"
                    }
                    alt={artigo.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-block bg-[#1a4d7a]/10 text-[#1a4d7a] text-xs font-bold px-3 py-1 rounded-md">
                      {getCategoryName(artigo.categorieId)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Calendar size={14} />
                      {new Date(artigo.publicationDate).toLocaleDateString(
                        "pt-BR",
                      )}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">
                    {artigo.title}
                  </h3>

                  <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                    {artigo.contents && artigo.contents.length > 0
                      ? artigo.contents[0].content.substring(0, 150) + "..."
                      : "Clique para ler o artigo completo..."}
                  </p>

                  <div className="mt-auto">
                    <Link
                      href={`/blog/${artigo.id}`}
                      className="inline-flex w-full items-center justify-center bg-slate-50 border border-slate-200 text-[#1a4d7a] font-semibold py-2.5 rounded-lg hover:bg-[#1a4d7a] hover:text-white transition-colors duration-300"
                    >
                      Ler Artigo
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-slate-500 text-lg">
              Nenhum artigo encontrado. Tente uma busca ou categoria diferente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
