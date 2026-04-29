"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
  ChangeCategory,
} from "@/lib/api";
import { AdminHeader } from "@/components/admin/admin-header";
import {
  Tag,
  Plus,
  RefreshCw,
  Search,
  Edit,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import { Category } from "@/Interfaces/Interface-Categoria";

// Importando o hook de toast
import { useToast } from "@/hooks/use-toast";

export default function CategoriesAdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados do Modal de Edição/Criação
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Estados do Modal de Exclusão
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getAllCategories();
      setCategories(data);
    } catch (err: any) {
      console.error("Erro ao carregar categorias:", err);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as categorias.",
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

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // === Funções de Criação / Edição ===
  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setCategoryName(category.name);
    } else {
      setEditingCategory(null);
      setCategoryName("");
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setCategoryName("");
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    try {
      setIsSaving(true);
      if (editingCategory) {
        await ChangeCategory(editingCategory.id, { name: categoryName });
        toast({
          title: "Ação concluída com sucesso!",
          description: `A categoria "${categoryName}" foi atualizada.`,
        });
      } else {
        await createCategory({ name: categoryName });
        toast({
          title: "Ação concluída com sucesso!",
          description: `A categoria "${categoryName}" foi criada.`,
        });
      }
      await loadData();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      toast({
        title: "Ops!",
        description: "Ocorreu um erro ao salvar a categoria.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // === Funções de Exclusão ===
  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;

    try {
      setIsDeleting(true);
      await deleteCategory(categoryToDelete.id);
      await loadData();
      toast({
        title: "Ação concluída com sucesso!",
        description: `A categoria "${categoryToDelete.name}" foi removida permanentemente do sistema.`,
      });
      setCategoryToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      toast({
        title: "Não foi possível excluir",
        description:
          "Esta categoria pode estar vinculada a um ou mais artigos.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <AdminHeader
        title="Gestão de Categorias"
        description="Gerencie as categorias do blog."
        backUrl="/admin"
      />

      <main className="container mx-auto px-6 mt-8 animate-fade-in-up">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50">
            <h2 className="font-bold text-[#1a4d7a] flex items-center gap-2 text-xl">
              <Tag className="w-5 h-5" /> Categorias
            </h2>

            <div className="flex flex-1 max-w-md w-full items-center relative">
              <Search className="w-4 h-4 absolute left-3 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nome..."
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

              <button
                onClick={() => handleOpenModal()}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1a4d7a] hover:bg-[#c9a961] text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-md hover:scale-105 hover:cursor-pointer w-full md:w-auto"
              >
                <Plus className="w-4 h-4" /> Nova Categoria
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-white text-slate-500 border-b border-slate-200">
                  <th className="px-6 py-4 font-medium w-24">ID</th>
                  <th className="px-6 py-4 font-medium">Nome da Categoria</th>
                  <th className="px-6 py-4 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-slate-500">
                      Carregando categorias...
                    </td>
                  </tr>
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-slate-500">
                      Nenhuma categoria encontrada.
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <tr
                      key={category.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-slate-400">
                        #{category.id}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleOpenModal(category)}
                          className="text-[#1a4d7a] hover:text-[#c9a961] transition-all duration-300 hover:scale-110 hover:cursor-pointer p-1"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setCategoryToDelete(category)}
                          className="text-red-500 hover:text-red-700 transition-all duration-300 hover:scale-110 hover:cursor-pointer p-1"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal de Criação/Edição */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h3 className="font-bold text-[#1a4d7a] text-lg">
                {editingCategory ? "Editar Categoria" : "Nova Categoria"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-[#c9a961] transition-all duration-300 hover:scale-110 hover:cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="p-5">
              <div className="mb-5">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961] transition-colors duration-300"
                  placeholder="Ex: Tecnologia"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-[#c9a961] rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-[#1a4d7a] hover:bg-[#c9a961] text-white rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-[#1a4d7a] flex items-center gap-2"
                >
                  {isSaving && <RefreshCw className="w-3 h-3 animate-spin" />}
                  {editingCategory ? "Salvar Alterações" : "Criar Categoria"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h3 className="font-bold text-red-600 flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5" /> Excluir Categoria
              </h3>
              <button
                onClick={() => setCategoryToDelete(null)}
                className="text-slate-400 hover:text-red-600 transition-all duration-300 hover:scale-110 hover:cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5">
              <p className="text-slate-600 text-sm">
                Tem certeza que deseja excluir a categoria{" "}
                <strong className="text-slate-800">
                  "{categoryToDelete.name}"
                </strong>
                ? Esta ação não poderá ser desfeita.
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setCategoryToDelete(null)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleDeleteCategory}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                >
                  {isDeleting && <RefreshCw className="w-3 h-3 animate-spin" />}
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
