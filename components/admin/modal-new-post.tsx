"use client";

import { useState, useEffect } from "react";
import { X, RefreshCw, AlertCircle } from "lucide-react";
import { createPost, getAllCategories } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Category } from "@/Interfaces/Interface-Categoria";

interface ModalNewPostProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ModalNewPost({
  isOpen,
  onClose,
  onSuccess,
}: ModalNewPostProps) {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Busca as categorias sempre que o modal for aberto
  useEffect(() => {
    if (isOpen) {
      loadCategories();
      // Reseta o formulário
      setTitle("");
      setContent("");
      setCategoryId("");
      setError("");
    }
  }, [isOpen]);

  const loadCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Erro ao carregar categorias no modal", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!categoryId) {
      setError("Por favor, selecione uma categoria.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // O payload exato que a sua API (Prisma) espera
      await createPost({
        title,
        content,
        categorieId: Number(categoryId),
        authorId: user.id, // Puxa o ID do autor logado automaticamente
      });

      onSuccess(); // Atualiza a tabela na página por trás do modal
      onClose(); // Fecha o modal
    } catch (err: any) {
      setError(err.message || "Erro ao criar a publicação.");
    } finally {
      setLoading(false);
    }
  };

  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header do Modal */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-[#1a4d7a]">
              Criar Novo Artigo
            </h2>
            <p className="text-sm text-slate-500">
              Preencha as informações da nova publicação.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do Modal (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form
            id="new-post-form"
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Título do Artigo
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961] transition-all"
                placeholder="Insira um título chamativo..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Categoria
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961] transition-all bg-white"
                required
              >
                <option value="" disabled>
                  Selecione uma categoria...
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Conteúdo
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961] transition-all resize-none"
                placeholder="Escreva o conteúdo do seu artigo aqui..."
                required
              />
            </div>
          </form>
        </div>

        {/* Footer do Modal */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="new-post-form"
            disabled={loading}
            className="px-5 py-2.5 bg-[#1a4d7a] hover:bg-[#0d2d4a] text-white text-sm font-medium rounded-lg shadow-md transition-all flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Publicando...
              </>
            ) : (
              "Publicar Artigo"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
