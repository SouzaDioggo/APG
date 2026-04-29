"use client";

import { useState, useEffect } from "react";
import {
  getCommentsByPost,
  createComment,
  getAllUsers,
  updateComment,
  deleteComment,
} from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import {
  MessageSquare,
  Send,
  User as UserIcon,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit,
  X,
  Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Comment } from "@/Interfaces/Interface-Comentario";
import { User as UserInterface } from "@/Interfaces/Interface-User";

export function CommentSection({ postId }: { postId: number }) {
  const { user } = useAuth();
  const { toast } = useToast();

  const [comments, setComments] = useState<Comment[]>([]);
  const [usersList, setUsersList] = useState<UserInterface[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const loadData = async () => {
    try {
      const [commentsData, usersData] = await Promise.all([
        getCommentsByPost(postId),
        getAllUsers(),
      ]);

      setUsersList(usersData);
      setComments(
        commentsData.sort(
          (a: Comment, b: Comment) =>
            new Date(b.commentDate).getTime() -
            new Date(a.commentDate).getTime(),
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Atenção",
        description: "Você precisa estar logado para comentar.",
        variant: "destructive",
      });
      return;
    }
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      await createComment({
        text: newComment,
        postId: postId,
        userId: user.id,
        date: new Date().toISOString(),
      });

      setNewComment("");
      await loadData();
      toast({ title: "Sucesso!", description: "Seu comentário foi enviado." });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível enviar o comentário.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // === INICIAR EDIÇÃO ===
  const handleStartEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditCommentText(comment.text || (comment as any).content || "");
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditCommentText("");
  };

  const handleSaveEdit = async (commentId: number) => {
    if (!editCommentText.trim() || !user) return;

    try {
      setIsActionLoading(true);
      await updateComment(commentId, user.id, { text: editCommentText });

      toast({
        title: "Atualizado!",
        description: "Comentário alterado com sucesso.",
      });
      setEditingCommentId(null);
      await loadData();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar seu comentário.",
        variant: "destructive",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este comentário?"))
      return;

    try {
      setIsActionLoading(true);
      await deleteComment(commentId);

      toast({
        title: "Excluído!",
        description: "Seu comentário foi removido.",
      });
      await loadData();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o comentário.",
        variant: "destructive",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const getUserName = (userId: number) => {
    const commentUser = usersList.find((u) => String(u.id) === String(userId));
    return commentUser ? commentUser.name : `Usuário #${userId}`;
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment,
  );
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-3">
        <MessageSquare className="w-6 h-6 text-[#1a4d7a]" />
        <h3 className="text-2xl font-bold text-slate-900">
          Comentários ({comments.length})
        </h3>
      </div>

      {/* Formulário de Envio */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-50 p-6 rounded-2xl space-y-4 border border-slate-100 transition-all focus-within:shadow-md"
      >
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={
            user
              ? "O que você achou deste artigo?"
              : "Faça login para comentar..."
          }
          disabled={!user || loading}
          className="w-full p-4 bg-white border-none rounded-xl focus:ring-0 text-slate-700 resize-none min-h-25 cursor-text"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!user || loading || !newComment.trim()}
            className="bg-[#1a4d7a] hover:bg-[#c9a961] text-white px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer hover:scale-105 active:scale-95"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Enviar Comentário
          </button>
        </div>
      </form>

      {/* Lista de Comentários */}
      <div className="space-y-6">
        {currentComments.length > 0 ? (
          currentComments.map((c) => {
            const isOwner = user?.id === c.userId;
            const isEditing = editingCommentId === c.id;

            return (
              <div
                key={c.id}
                className={`flex gap-4 p-4 rounded-2xl transition-all border border-transparent ${
                  isEditing
                    ? "bg-white border-slate-200 shadow-sm"
                    : "hover:bg-slate-50 group"
                }`}
              >
                <div className="w-10 h-10 bg-[#1a4d7a]/10 rounded-full flex items-center justify-center text-[#1a4d7a] shrink-0">
                  <UserIcon className="w-5 h-5" />
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">
                        {getUserName(c.userId)}
                      </h4>
                      <span className="text-[10px] text-slate-400">
                        {new Date(c.commentDate).toLocaleDateString("pt-BR")}
                      </span>
                    </div>

                    {isOwner && !isEditing && (
                      <div className="flex items-center gap-1 opacity-100 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleStartEdit(c)}
                          className="p-1.5 text-slate-400 hover:text-[#c9a961] hover:bg-[#c9a961]/10 rounded-md transition-all cursor-pointer"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          disabled={isActionLoading}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all cursor-pointer disabled:opacity-50"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Renderização Condicional: Modo Leitura vs Modo Edição */}
                  {isEditing ? (
                    <div className="space-y-3 mt-2 animate-fade-in">
                      <textarea
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961] text-sm text-slate-700 resize-none min-h-[80px]"
                        placeholder="Edite seu comentário..."
                        disabled={isActionLoading}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={handleCancelEdit}
                          disabled={isActionLoading}
                          className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <X className="w-3 h-3" /> Cancelar
                        </button>
                        <button
                          onClick={() => handleSaveEdit(c.id)}
                          disabled={isActionLoading || !editCommentText.trim()}
                          className="px-4 py-1.5 text-xs font-bold text-white bg-[#1a4d7a] hover:bg-[#c9a961] rounded-lg transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          {isActionLoading ? (
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Check className="w-3 h-3" />
                          )}
                          Salvar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {c.text || (c as any).content}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-slate-400 py-10">
            Nenhum comentário ainda. Seja o primeiro a comentar!
          </p>
        )}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 bg-slate-100 hover:bg-[#1a4d7a] hover:text-white rounded-lg transition-all disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold text-slate-500">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 bg-slate-100 hover:bg-[#1a4d7a] hover:text-white rounded-lg transition-all disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
