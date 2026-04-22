"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getPostById, getAllCategories, getAllUsers } from "@/lib/api";
import { Calendar, ArrowLeft, User as UserIcon } from "lucide-react";

import { CommentSection } from "@/components/blog/post/comment-section";
import { PostContent } from "@/Interfaces/Interface-Post";

export default function ArtigoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.slug as string;

  const [post, setPost] = useState<any>(null);
  const [categoryName, setCategoryName] = useState("Carregando...");
  const [authorName, setAuthorName] = useState("Carregando...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPostData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [postData, categoriesData, usersData] = await Promise.all([
          getPostById(Number(id)),
          getAllCategories(),
          getAllUsers(),
        ]);

        setPost(postData);

        const cat = categoriesData.find(
          (c: any) => String(c.id) === String(postData.categorieId),
        );
        if (cat) setCategoryName(cat.name);

        const author = usersData.find(
          (u: any) => String(u.id) === String(postData.userId),
        );
        if (author) {
          setAuthorName(author.name);
        } else {
          setAuthorName("Equipe APG");
        }
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

      <article className="flex-1 ">
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
              className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-8 transition-colors text-sm font-medium hover:cursor-pointer"
            >
              <ArrowLeft size={16} />
              Voltar aos artigos
            </Link>

            <div className="max-w-4xl">
              <span className="inline-block bg-[#c9a961] text-white px-3 py-1 rounded-md text-sm font-bold mb-4 shadow-sm hover:cursor-pointer">
                {categoryName}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-blue-100 font-medium text-sm border-t border-blue-800/50 pt-6 mt-6">
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {/* CORREÇÃO: Propriedade publicationDate correta do backend */}
                  {new Date(post.publicationDate).toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2 hover:cursor-pointer hover:text-white transition-colors">
                  <UserIcon size={16} />
                  Por {authorName}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 mb-12">
            <div className="prose prose-lg prose-slate max-w-none">
              {post.contents && post.contents.length > 0 ? (
                post.contents
                  .sort((a: PostContent, b: PostContent) => a.order - b.order)
                  .map((block: PostContent) => (
                    <p
                      key={block.id}
                      className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium mb-6"
                    >
                      {block.content}
                    </p>
                  ))
              ) : post.content ? (
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">
                  {post.content}
                </p>
              ) : (
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium text-center py-10">
                  Conteúdo não disponível.
                </p>
              )}
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <CommentSection postId={Number(id)} />
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
