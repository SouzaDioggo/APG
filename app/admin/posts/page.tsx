"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getAllPosts, getAllCategories, deletePost } from "@/lib/api";
import { AdminHeader } from "@/components/admin/admin-header";
import {
  FileText,
  Plus,
  RefreshCw,
  Calendar,
  Search,
  Trash2,
  Edit,
  Eye,
} from "lucide-react";
import { Post } from "@/Interfaces/Interface-Post";
import { Category } from "@/Interfaces/Interface-Categoria";
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

export default function PostsAdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [postsData, categoriesData] = await Promise.all([
        getAllPosts(),
        getAllCategories(),
      ]);
      setPosts(postsData);
      setCategories(categoriesData);
    } catch (err: any) {
      console.error("Erro ao carregar dados:", err);
      toast({
        title: "Erro",
        description: "Falha ao carregar os artigos.",
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

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getCategoryName = (categoryId: string | number) => {
    const category = categories.find(
      (cat) => String(cat.id) === String(categoryId),
    );
    return category ? category.name : "Sem categoria";
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;

    try {
      setLoading(true);
      await deletePost(postToDelete);

      toast({
        title: "Artigo Excluído",
        description: "O post foi removido com sucesso.",
      });

      await loadData();
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível remover o artigo.",
        variant: "destructive",
      });
      setLoading(false);
    } finally {
      setPostToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <AdminHeader
        title="Gestão de Artigos"
        description="Gerencie os conteúdos publicados na plataforma."
        backUrl="/admin"
      />

      <main className="container mx-auto px-6 mt-8 animate-fade-in-up">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50">
            <h2 className="font-bold text-[#1a4d7a] flex items-center gap-2 text-xl">
              <FileText className="w-5 h-5" /> Publicações
            </h2>

            {/* Barra de Pesquisa */}
            <div className="flex flex-1 max-w-md w-full items-center relative">
              <Search className="w-4 h-4 absolute left-3 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1a4d7a] focus:ring-1 focus:ring-[#1a4d7a] text-sm"
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={loadData}
                className="p-2 text-slate-500 hover:text-[#1a4d7a] bg-white rounded-lg border border-slate-200 shadow-sm transition-colors cursor-pointer"
                title="Atualizar lista"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
              </button>

              {/* Botão de Novo Artigo sem usar o Modal Antigo */}
              <button
                onClick={() => router.push("/blog/novo-artigo")}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1a4d7a] hover:bg-[#c9a961] text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-md hover:scale-105 hover:cursor-pointer w-full md:w-auto"
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
                  <th className="px-6 py-4 font-medium">Categoria</th>
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
                ) : filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      Nenhum artigo encontrado.
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
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
                        {new Date(post.publicationDate).toLocaleDateString(
                          "pt-BR",
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        <span className="bg-[#1a4d7a]/10 text-[#1a4d7a] px-3 py-1 rounded-md text-xs font-semibold">
                          {getCategoryName(post.categorieId)}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() =>
                              window.open(`/blog/${post.id}`, "_blank")
                            }
                            className="p-1.5 text-slate-400 hover:text-[#1a4d7a] hover:bg-slate-100 rounded-md transition-all cursor-pointer"
                            title="Ver Artigo"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() =>
                              router.push(`/admin/posts/editar/${post.id}`)
                            }
                            className="p-1.5 text-slate-400 hover:text-[#c9a961] hover:bg-slate-100 rounded-md transition-all cursor-pointer"
                            title="Editar Artigo"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setPostToDelete(post.id)} // <--- AQUI ELE ABRE A MODAL
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all cursor-pointer"
                            title="Excluir Artigo"
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

      <AlertDialog
        open={postToDelete !== null}
        onOpenChange={(isOpen) => !isOpen && setPostToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#1a4d7a]">
              Tem certeza?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o
              artigo e o removerá de nossos servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer hover:bg-slate-100">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
            >
              Sim, Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
