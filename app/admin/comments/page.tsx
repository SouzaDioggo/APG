"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  getAllComments,
  getAllPosts,
  deleteComment,
  updateComment,
  getAllUsers,
} from "@/lib/api";
import { AdminHeader } from "@/components/admin/admin-header";
import {
  MessageSquare,
  RefreshCw,
  Search,
  Edit,
  Trash2,
  X,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Comment } from "@/Interfaces/Interface-Comentario";
import { Post } from "@/Interfaces/Interface-Post";
import { User } from "@/Interfaces/Interface-User";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ExtendedComment extends Comment {
  postTitle?: string;
}

export default function CommentsAdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [comments, setComments] = useState<ExtendedComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingComment, setEditingComment] = useState<ExtendedComment | null>(
    null,
  );
  const [commentText, setCommentText] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [commentToDelete, setCommentToDelete] =
    useState<ExtendedComment | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [usersList, setUsersList] = useState<User[]>([]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const loadData = async () => {
    try {
      setLoading(true);

      const [commentsData, postsData, usersData] = await Promise.all([
        getAllComments(),
        getAllPosts(),
        getAllUsers(),
      ]);

      setUsersList(usersData);

      const postMap = new Map();
      postsData.forEach((post: Post) => {
        postMap.set(Number(post.id), post.title);
      });

      const enrichedComments = commentsData.map((c: Comment) => ({
        ...c,
        postTitle: postMap.get(Number(c.postId)) || "Artigo Desconhecido",
      }));

      const sortedData = enrichedComments.sort(
        (a: ExtendedComment, b: ExtendedComment) =>
          new Date(b.commentDate).getTime() - new Date(a.commentDate).getTime(),
      );

      setComments(sortedData);
    } catch (err: any) {
      console.error("Erro ao carregar comentários:", err);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados. Verifique a conexão.",
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

  const filteredComments = comments.filter((c) => {
    const textMatch = (c.text || (c as any).content || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const nameMatch = (c.userName || `Usuário #${c.userId}`)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const postMatch = (c.postTitle || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return textMatch || nameMatch || postMatch;
  });

  const totalPages = Math.ceil(filteredComments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentComments = filteredComments.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleOpenEditModal = (comment: ExtendedComment) => {
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
        title: "Atualizado!",
        description: "O comentário foi salvo com sucesso.",
      });

      await loadData();
      handleCloseEditModal();
    } catch (error) {
      toast({
        title: "Ops!",
        description: "Ocorreu um erro ao salvar o comentário.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteComment = async () => {
    if (!commentToDelete) return;

    try {
      setIsDeleting(true);
      await deleteComment(commentToDelete.id);

      toast({
        title: "Excluído",
        description: "O comentário foi removido permanentemente.",
      });

      await loadData();

      if (currentComments.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    } catch (error) {
      toast({
        title: "Erro na Exclusão",
        description: "Não foi possível excluir este comentário.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setCommentToDelete(null);
    }
  };

  const getUserName = (userId: number) => {
    const commentUser = usersList.find((u) => String(u.id) === String(userId));
    return commentUser ? commentUser.name : `Usuário #${userId}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <AdminHeader
        title="Gestão de Comentários"
        description="Modere os comentários feitos nos artigos do blog."
        backUrl="/admin"
      />

      <main className="container mx-auto px-6 mt-8 animate-fade-in-up">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50">
            <h2 className="font-bold text-[#1a4d7a] flex items-center gap-2 text-xl">
              <MessageSquare className="w-5 h-5" /> Comentários
            </h2>

            <div className="flex flex-1 max-w-md w-full items-center relative group">
              <Search className="w-4 h-4 absolute left-3 text-slate-400 group-focus-within:text-[#1a4d7a] transition-colors" />
              <input
                type="text"
                placeholder="Buscar por autor, artigo ou conteúdo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1a4d7a]/50 focus:ring-2 focus:ring-[#1a4d7a]/10 text-sm transition-all duration-300"
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={loadData}
                className="p-2 text-slate-500 hover:text-[#1a4d7a] bg-white rounded-lg border border-slate-200 hover:border-[#1a4d7a]/30 shadow-sm transition-all duration-300 hover:shadow hover:scale-105 cursor-pointer"
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
                  <th className="px-6 py-4 font-medium w-2/5">Comentário</th>
                  <th className="px-6 py-4 font-medium">Artigo</th>
                  <th className="px-6 py-4 font-medium">Data</th>
                  <th className="px-6 py-4 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-500">
                      <div className="flex flex-col items-center gap-3">
                        <RefreshCw className="w-6 h-6 animate-spin text-[#1a4d7a]" />
                        <span>Carregando comentários...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentComments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-500">
                      Nenhum comentário encontrado.
                    </td>
                  </tr>
                ) : (
                  currentComments.map((comment) => (
                    <tr
                      key={comment.id}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                        #{comment.id}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {getUserName(comment.userId)}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <div
                          className="line-clamp-2"
                          title={comment.text || (comment as any).content}
                        >
                          {comment.text || (comment as any).content}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="inline-flex items-center gap-1.5 bg-[#c9a961]/10 text-[#c9a961] px-2.5 py-1 rounded-md text-xs font-semibold max-w-37.5 truncate"
                          title={comment.postTitle}
                        >
                          <FileText className="w-3 h-3 shrink-0" />
                          <span className="truncate">{comment.postTitle}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">
                        {new Date(comment.commentDate).toLocaleDateString(
                          "pt-BR",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleOpenEditModal(comment)}
                            className="p-1.5 text-slate-400 hover:text-[#c9a961] hover:bg-slate-100 rounded-md transition-all duration-300 cursor-pointer"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setCommentToDelete(comment)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all duration-300 cursor-pointer"
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

          {!loading && filteredComments.length > itemsPerPage && (
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
              <span className="text-xs font-medium text-slate-500">
                Mostrando{" "}
                <strong className="text-slate-700">{startIndex + 1}</strong> a{" "}
                <strong className="text-slate-700">
                  {Math.min(startIndex + itemsPerPage, filteredComments.length)}
                </strong>{" "}
                de{" "}
                <strong className="text-slate-700">
                  {filteredComments.length}
                </strong>{" "}
                comentários
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-white hover:text-[#1a4d7a] hover:border-[#1a4d7a]/30 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 cursor-pointer shadow-sm"
                  title="Página Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-sm font-semibold text-slate-700 bg-white px-4 py-2 border border-slate-200 rounded-lg shadow-sm">
                  {currentPage}{" "}
                  <span className="text-slate-400 font-normal mx-1">/</span>{" "}
                  {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-white hover:text-[#1a4d7a] hover:border-[#1a4d7a]/30 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 cursor-pointer shadow-sm"
                  title="Próxima Página"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden transform animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-[#1a4d7a] text-lg flex items-center gap-2">
                <Edit className="w-5 h-5 text-[#c9a961]" /> Editar Comentário
              </h3>
              <button
                onClick={handleCloseEditModal}
                className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all duration-300 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveComment} className="p-6">
              <div className="mb-6 space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Conteúdo do Comentário
                </label>
                <textarea
                  required
                  rows={5}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a4d7a]/20 focus:border-[#1a4d7a]/30 transition-all duration-300 resize-none text-slate-700 leading-relaxed"
                  placeholder="Edite o conteúdo aqui..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="px-5 py-2.5 text-slate-500 hover:text-slate-800 font-semibold text-sm transition-all duration-300 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-[#1a4d7a] hover:bg-[#0d2d4a] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-70 flex items-center gap-2"
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

      <AlertDialog
        open={commentToDelete !== null}
        onOpenChange={(isOpen) => !isOpen && setCommentToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#1a4d7a]">
              Excluir Comentário?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir o comentário do usuário{" "}
              <strong className="text-slate-700">
                {commentToDelete?.userName || `#${commentToDelete?.userId}`}
              </strong>{" "}
              no artigo{" "}
              <strong className="text-slate-700">
                {commentToDelete?.postTitle}
              </strong>
              . Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer hover:bg-slate-100">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteComment}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
            >
              {isDeleting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                "Sim, Excluir"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
