"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Plus,
  Trash2,
  Layout,
  Type,
  Image as ImageIcon,
  RefreshCw,
  Upload,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { createPost, getAllCategories } from "@/lib/api";
import { Category } from "@/Interfaces/Interface-Categoria";
import { useToast } from "@/hooks/use-toast";
import { ModalNewPostProps, ContentBlock } from "@/Interfaces/Interface-Post";

export function ModalNewPost({
  isOpen,
  onClose,
  onSuccess,
}: ModalNewPostProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<ContentBlock[]>([
    { type: "text", content: "", order: 1 },
  ]);

  useEffect(() => {
    if (isOpen) loadCategories();
  }, [isOpen]);

  const loadCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addBlock = () => {
    setBlocks([
      ...blocks,
      { type: "text", content: "", order: blocks.length + 1 },
    ]);
  };

  const removeBlock = (index: number) => {
    if (blocks.length === 1) return;
    const newBlocks = blocks
      .filter((_, i) => i !== index)
      .map((b, i) => ({ ...b, order: i + 1 }));
    setBlocks(newBlocks);
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const newBlocks = [...blocks];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    [newBlocks[index], newBlocks[targetIndex]] = [
      newBlocks[targetIndex],
      newBlocks[index],
    ];
    setBlocks(newBlocks.map((b, i) => ({ ...b, order: i + 1 })));
  };

  const updateBlock = (index: number, value: string) => {
    const newBlocks = [...blocks];
    newBlocks[index].content = value;
    setBlocks(newBlocks);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !title ||
      !categoryId ||
      !selectedFile ||
      blocks.some((b) => !b.content.trim())
    ) {
      toast({
        title: "Atenção",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", title);
      formData.append("categorieId", categoryId);
      formData.append("publicationDate", new Date().toISOString());
      formData.append("contents", JSON.stringify(blocks));

      await createPost(formData); //

      toast({
        title: "Ação concluída com sucesso!",
        description: "Artigo publicado no blog.",
      });
      onSuccess();
      handleClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao publicar.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setCategoryId("");
    setSelectedFile(null);
    setPreviewUrl(null);
    setBlocks([{ type: "text", content: "", order: 1 }]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-[#1a4d7a] text-2xl flex items-center gap-2">
            <Layout className="w-6 h-6" /> Novo Post
          </h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-all cursor-pointer"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-8"
        >
          {/* Seletor de Imagem */}
          <section className="space-y-4">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b pb-1">
              Capa do Artigo
            </h4>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative h-56 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-all overflow-hidden group"
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              {previewUrl ? (
                <div className="relative w-full h-full">
                  <img
                    src={previewUrl}
                    className="w-full h-full object-cover"
                    alt="Preview"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-bold flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" /> Trocar Capa
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-400">
                  <div className="bg-slate-100 p-4 rounded-full inline-block mb-2 group-hover:bg-[#1a4d7a]/10 transition-colors">
                    <ImageIcon className="w-8 h-8 text-slate-300 group-hover:text-[#1a4d7a]" />
                  </div>
                  <p className="text-xs font-semibold">
                    Clique para subir a imagem de capa
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Dados Gerais */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label
                className="text-xs font-bold text-slate-500 uppercase cursor-pointer"
                onClick={() => document.getElementById("post-title")?.focus()}
              >
                Título
              </label>
              <input
                id="post-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-0 focus:outline-none text-slate-800 font-medium placeholder:text-slate-300 cursor-text"
                placeholder="Ex: Minha nova jornada..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase cursor-pointer">
                Categoria
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-0 focus:outline-none text-slate-800 cursor-pointer appearance-none"
              >
                <option value="">Selecione uma categoria...</option>
                {categories.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.id}
                    className="cursor-pointer"
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* Editor de Blocos */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Conteúdo do Artigo
              </h4>
              <button
                type="button"
                onClick={addBlock}
                className="bg-[#1a4d7a]/5 hover:bg-[#1a4d7a] text-[#1a4d7a] hover:text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-[10px] font-bold uppercase transition-all cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Novo Bloco
              </button>
            </div>

            <div className="space-y-10">
              {blocks.map((block, index) => (
                <div key={index} className="group relative">
                  {/* Caixinha Azul Bonita */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[#1a4d7a] text-white px-4 py-1 rounded-lg text-[10px] uppercase tracking-tighter shadow-sm flex items-center gap-2">
                      <Layout className="w-3 h-3" /> Bloco {block.order}
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => moveBlock(index, "up")}
                        title="Subir"
                        className="p-1.5 bg-slate-100 hover:bg-[#c9a961] hover:text-white rounded-md transition-all cursor-pointer"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveBlock(index, "down")}
                        title="Descer"
                        className="p-1.5 bg-slate-100 hover:bg-[#c9a961] hover:text-white rounded-md transition-all cursor-pointer"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeBlock(index)}
                        title="Excluir"
                        className="p-1.5 bg-red-50 hover:bg-red-500 hover:text-white text-red-400 rounded-md transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <textarea
                    rows={5}
                    value={block.content}
                    onChange={(e) => updateBlock(index, e.target.value)}
                    className="w-full p-6 bg-slate-50 border-none rounded-2xl focus:ring-0 focus:outline-none text-slate-700 resize-none placeholder:text-slate-200 text-lg leading-relaxed cursor-text"
                    placeholder="Escreva o conteúdo deste bloco aqui..."
                  />
                </div>
              ))}
            </div>
          </section>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-6 py-2 text-slate-400 hover:text-red-500 font-bold text-sm transition-all cursor-pointer"
          >
            Descartar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-10 py-3 bg-[#1a4d7a] hover:bg-[#c9a961] text-white rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              "Publicar Artigo"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
