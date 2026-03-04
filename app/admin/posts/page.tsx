"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getAllPosts } from "@/lib/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { FileText, Plus, RefreshCw, Calendar } from "lucide-react";
import { Post } from "@/Interfaces/Interface-Post";
import { ModalNewPost } from "@/components/admin/modal-new-post";

export default function PostsAdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Estado para controlar a abertura do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllPosts();
      setPosts(data);
    } catch (err: any) {
      console.error("Erro ao carregar posts:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.type === "leitor") return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <AdminHeader
        title="Gestão de Artigos"
        description="Gerencie os conteúdos publicados na plataforma."
        backUrl="/admin"
      />

      <main className="container mx-auto px-6 mt-8 animate-fade-in-up">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-bold text-[#1a4d7a] flex items-center gap-2 text-xl">
              <FileText className="w-5 h-5" /> Publicações
            </h2>
            <div className="flex gap-3">
              <button
                onClick={loadPosts}
                className="p-2 text-slate-500 hover:text-[#1a4d7a] bg-white rounded-lg border border-slate-200 shadow-sm transition-colors"
                title="Atualizar lista"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
              </button>

              {/* 3. Substituímos o <Link> por um <button> que abre o modal */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#1a4d7a] hover:bg-[#0d2d4a] text-white text-sm font-medium rounded-lg transition-colors shadow-md"
              >
                <Plus className="w-4 h-4" /> Novo Artigo
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-white text-slate-500 border-b border-slate-200">
                  <th className="px-6 py-4 font-medium">ID</th>
                  <th className="px-6 py-4 font-medium">Título</th>
                  <th className="px-6 py-4 font-medium">Data de Publicação</th>
                  <th className="px-6 py-4 font-medium">Categoria ID</th>
                  <th className="px-6 py-4 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      Carregando publicações...
                    </td>
                  </tr>
                ) : posts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      Nenhum artigo encontrado.
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-slate-400">#{post.id}</td>
                      <td
                        className="px-6 py-4 font-medium text-slate-700 max-w-xs truncate"
                        title={post.title}
                      >
                        {post.title}
                      </td>
                      <td className="px-6 py-4 text-slate-500 flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publication_date).toLocaleDateString(
                          "pt-BR",
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        Cat: {post.categorieId}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a
                          href={`/blog/${post.id}`}
                          target="_blank"
                          className="text-sm text-[#c9a961] font-semibold hover:underline"
                        >
                          Ver
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* 4. Renderiza o Modal no final do componente */}
      <ModalNewPost
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          loadPosts();
        }}
      />
    </div>
  );
}
