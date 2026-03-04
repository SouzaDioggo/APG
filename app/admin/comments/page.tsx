"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getCommentsByPost, deleteComment } from "@/lib/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { MessageSquare, Trash2, Search, RefreshCw } from "lucide-react";
import { Comment } from "@/Interfaces/Interface-Comentario";

export default function CommentsAdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [postId, setPostId] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postId) return;

    try {
      setLoading(true);
      const data = await getCommentsByPost(Number(postId));
      setComments(Array.isArray(data) ? data : []);
      setHasSearched(true);
    } catch (err) {
      alert("Erro ao buscar comentários. Verifique se o ID do Post existe.");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!confirm("Deseja realmente excluir este comentário?")) return;
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      alert("Erro ao deletar comentário.");
    }
  };

  if (!user || user.type !== "admin") return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <AdminHeader
        title="Moderação de Comentários"
        description="Analise e modere comentários de um artigo específico."
        backUrl="/admin"
      />

      <main className="container mx-auto px-6 mt-8 animate-fade-in-up max-w-4xl">
        {/* Buscador de Comentários */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
          <form onSubmit={handleSearch} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm text-slate-600 font-medium flex items-center gap-2 mb-2">
                <Search className="w-4 h-4" /> Buscar comentários pelo ID do
                Artigo
              </label>
              <input
                type="number"
                value={postId}
                onChange={(e) => setPostId(e.target.value)}
                placeholder="Ex: 5"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1a4d7a] focus:ring-1 focus:ring-[#1a4d7a]"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !postId}
              className="px-6 py-2.5 bg-[#1a4d7a] hover:bg-[#0d2d4a] text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                "Buscar"
              )}
            </button>
          </form>
        </div>

        {/* Lista de Comentários */}
        {hasSearched && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-700 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#c9a961]" />
              Resultados para o Artigo #{postId}
            </div>

            <div className="divide-y divide-slate-100">
              {comments.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  Nenhum comentário encontrado para este post.
                </div>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-6 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-slate-800 text-sm">
                          Usuário ID: {comment.userId}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(comment.commentDate).toLocaleString(
                            "pt-BR",
                          )}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm">{comment.text}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                      title="Deletar comentário"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
