"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getAllComments, deleteComment, updateComment } from "@/lib/api";
import { AdminHeader } from "@/components/admin/admin-header";
import {
  MessageSquare,
  RefreshCw,
  Search,
  Edit,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import { Comment } from "@/Interfaces/Interface-Comentario";
import { useToast } from "@/hooks/use-toast";

export default function CommentsAdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados do Modal de Edição
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [commentText, setCommentText] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Estados do Modal de Exclusão
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getAllComments();
      // Ordenando do mais recente para o mais antigo
      const sortedData = data.sort(
        (a: Comment, b: Comment) =>
          new Date(b.commentDate).getTime() - new Date(a.commentDate).getTime(),
      );
      setComments(sortedData);
    } catch (err: any) {
      console.error("Erro ao carregar comentários:", err);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os comentários.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.type !== "leitor") {
      loadData();
    }
  }, [user]);

  if (!user || user.type === "leitor") return null;

  // Filtro de busca (por texto do comentário ou nome do autor)
  const filteredComments = comments.filter((c) => {
    const textMatch = (c.text || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const nameMatch = (c.userName || `Usuário #${c.userId}`)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return textMatch || nameMatch;
  });

  // === Funções de Edição ===
  const handleOpenEditModal = (comment: Comment) => {
    setEditingComment(comment);
    setCommentText(comment.text || (comment as any).content || "");
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingComment(null);
    setCommentText("");
  };

  const handleSaveComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !editingComment) return;

    try {
      setIsSaving(true);
      await updateComment(editingComment.id, editingComment.userId, {
        text: commentText,
      });

      toast({
        title: "Ação concluída com sucesso!",
        description: "O comentário foi atualizado.",
      });

      await loadData();
      handleCloseEditModal();
    } catch (error) {
      console.error("Erro ao atualizar comentário:", error);
      toast({
        title: "Ops!",
        description: "Ocorreu um erro ao salvar o comentário.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // === Funções de Exclusão ===
  const handleDeleteComment = async () => {
    if (!commentToDelete) return;

    try {
      setIsDeleting(true);
      await deleteComment(commentToDelete.id);
      await loadData();
      toast({
        title: "Ação concluída com sucesso!",
        description: "O comentário foi removido permanentemente do sistema.",
      });
      setCommentToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir comentário:", error);
      toast({
        title: "Erro na Exclusão",
        description: "Não foi possível excluir este comentário.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <AdminHeader
        title="Gestão de Comentários"
        description="Modere os comentários feitos nos artigos do blog."
        backUrl="/admin"
      />

      <main className="container mx-auto px-6 mt-8 animate-fade-in-up">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50">
            <h2 className="font-bold text-[#1a4d7a] flex items-center gap-2 text-xl">
              <MessageSquare className="w-5 h-5" /> Comentários
            </h2>

            <div className="flex flex-1 max-w-md w-full items-center relative">
              <Search className="w-4 h-4 absolute left-3 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por autor ou conteúdo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1a4d7a] focus:ring-1 focus:ring-[#1a4d7a] text-sm"
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={loadData}
                className="p-2 text-slate-500 hover:text-[#c9a961] bg-white rounded-lg border border-slate-200 hover:border-[#c9a961] shadow-sm transition-all duration-300 hover:scale-105 hover:cursor-pointer"
                title="Atualizar lista"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-white text-slate-500 border-b border-slate-200">
                  <th className="px-6 py-4 font-medium w-16">ID</th>
                  <th className="px-6 py-4 font-medium">Autor</th>
                  <th className="px-6 py-4 font-medium w-1/2">Comentário</th>
                  <th className="px-6 py-4 font-medium">Data</th>
                  <th className="px-6 py-4 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      Carregando comentários...
                    </td>
                  </tr>
                ) : filteredComments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      Nenhum comentário encontrado.
                    </td>
                  </tr>
                ) : (
                  filteredComments.map((comment) => (
                    <tr
                      key={comment.id}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="px-6 py-4 text-slate-400">
                        #{comment.id}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {comment.userName || `Usuário #${comment.userId}`}
                      </td>
                      <td className="px-6 py-4 text-slate-600 truncate max-w-xs">
                        {comment.text || (comment as any).content}
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs">
                        {new Date(comment.commentDate).toLocaleDateString(
                          "pt-BR",
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => handleOpenEditModal(comment)}
                            className="text-[#1a4d7a] hover:text-[#c9a961] transition-all duration-300 hover:scale-110 hover:cursor-pointer p-1"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setCommentToDelete(comment)}
                            className="text-red-400 hover:text-red-600 transition-all duration-300 hover:scale-110 hover:cursor-pointer p-1"
                            title="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal de Edição */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h3 className="font-bold text-[#1a4d7a] text-lg flex items-center gap-2">
                <Edit className="w-5 h-5" /> Editar Comentário
              </h3>
              <button
                onClick={handleCloseEditModal}
                className="text-slate-400 hover:text-[#c9a961] transition-all duration-300 hover:scale-110 hover:cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveComment} className="p-5">
              <div className="mb-5">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Conteúdo do Comentário
                </label>
                <textarea
                  required
                  rows={4}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-0 focus:border-[#c9a961] transition-colors duration-300 resize-none text-slate-700"
                  placeholder="Edite o conteúdo aqui..."
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-[#c9a961] rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 hover:cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-[#1a4d7a] hover:bg-[#c9a961] text-white rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 hover:cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    "Salvar Alterações"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {commentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h3 className="font-bold text-red-600 flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5" /> Excluir Comentário
              </h3>
              <button
                onClick={() => setCommentToDelete(null)}
                className="text-slate-400 hover:text-red-600 transition-all duration-300 hover:scale-110 hover:cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5">
              <p className="text-slate-600 text-sm mb-4">
                Tem certeza que deseja excluir o comentário do usuário{" "}
                <strong className="text-slate-800">
                  {commentToDelete.userName || `#${commentToDelete.userId}`}
                </strong>
                ?
              </p>

              <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-red-800 text-sm italic truncate">
                "{commentToDelete.text}"
              </div>

              <p className="text-slate-500 text-xs mt-4">
                Esta ação não poderá ser desfeita.
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setCommentToDelete(null)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 hover:cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleDeleteComment}
                  disabled={isDeleting}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 hover:cursor-pointer disabled:opacity-70 flex items-center gap-2"
                >
                  {isDeleting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    "Sim, Excluir"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
