"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getAllCategories, createCategory } from "@/lib/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { Tags, Plus, RefreshCw, ShieldAlert } from "lucide-react";
import { Category } from "@/Interfaces/Interface-Categoria";

export default function CategoriesAdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (user.type !== "admin") router.push("/");
    else loadCategories();
  }, [user, router]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await getAllCategories();
      setCategories(data);
    } catch (err: any) {
      setError("Erro ao carregar categorias.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      setIsCreating(true);
      await createCategory({ name: newCategoryName });
      setNewCategoryName("");
      loadCategories(); // Recarrega a lista
    } catch (err: any) {
      alert(err.message || "Erro ao criar categoria");
    } finally {
      setIsCreating(false);
    }
  };

  if (!user || user.type !== "admin") return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <AdminHeader
        title="Gestão de Categorias"
        description="Crie e gerencie as categorias dos artigos da plataforma."
        backUrl="/admin"
      />

      <main className="container mx-auto px-6 mt-8 animate-fade-in-up grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Nova Categoria */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#c9a961]" /> Nova Categoria
          </h3>
          <form onSubmit={handleCreateCategory} className="space-y-4">
            <div>
              <label className="text-sm text-slate-600 font-medium">
                Nome da Categoria
              </label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1a4d7a] focus:ring-1 focus:ring-[#1a4d7a]"
                placeholder="Ex: Liderança"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isCreating}
              className="w-full bg-[#1a4d7a] hover:bg-[#0d2d4a] text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isCreating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                "Adicionar Categoria"
              )}
            </button>
          </form>
        </div>

        {/* Lista de Categorias */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Tags className="w-5 h-5 text-[#1a4d7a]" /> Categorias Existentes
            </h3>
            <button
              onClick={loadCategories}
              className="text-slate-500 hover:text-[#1a4d7a] transition-colors p-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>

          {error ? (
            <div className="p-8 text-center text-red-500 flex flex-col items-center">
              <ShieldAlert className="w-8 h-8 mb-2" /> {error}
            </div>
          ) : loading ? (
            <div className="p-8 text-center text-slate-500">Carregando...</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <th className="px-6 py-3 font-medium">ID</th>
                  <th className="px-6 py-3 font-medium">Nome da Categoria</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50">
                    <td className="px-6 py-3 text-slate-400">#{cat.id}</td>
                    <td className="px-6 py-3 font-medium text-slate-700">
                      {cat.name}
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={2} className="p-6 text-center text-slate-500">
                      Nenhuma categoria encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
