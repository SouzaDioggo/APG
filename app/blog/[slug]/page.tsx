"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getPostById, getAllCategories } from "@/lib/api"; // Removido getAllUsers
import { Calendar, ArrowLeft, User as UserIcon } from "lucide-react";

export default function ArtigoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.slug as string;

  const [post, setPost] = useState<any>(null);
  const [categoryName, setCategoryName] = useState("Carregando...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPostData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        // Busca o post e as categorias
        const [postData, categoriesData] = await Promise.all([
          getPostById(id),
          getAllCategories(),
        ]);

        setPost(postData);

        const cat = categoriesData.find(
          (c: any) => String(c.id) === String(postData.categorieId),
        );
        if (cat) setCategoryName(cat.name);
      } catch (err) {
        console.error("Erro ao carregar artigo:", err);
        router.push("/blog");
      } finally {
        setLoading(false);
      }
    };

    loadPostData();
  }, [id, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#1a4d7a] border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!post) return null;

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <article className="flex-1">
        <div className="bg-[#1a4d7a] text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
            <img
              src="/abstract-blue-lines-pattern.jpg"
              alt="bg"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-8 transition-colors text-sm font-medium"
            >
              <ArrowLeft size={16} />
              Voltar aos artigos
            </Link>

            <div className="max-w-4xl">
              <span className="inline-block bg-[#c9a961] text-white px-3 py-1 rounded-md text-sm font-bold mb-4 shadow-sm">
                {categoryName}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-blue-100 font-medium text-sm border-t border-blue-800/50 pt-6 mt-6">
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(post.publication_date).toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <UserIcon size={16} />
                  Por Equipe APG
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
            <div className="prose prose-lg prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">
                {post.content || "Conteúdo não disponível."}
              </p>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
