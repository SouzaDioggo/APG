"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Layout,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  Save,
  ImageIcon,
} from "lucide-react";
import {
  updatePost,
  getPostById,
  getAllCategories,
  updatePostImage,
  getPostImageUrl,
} from "@/lib/api";
import { Category } from "@/Interfaces/Interface-Categoria";
import { useToast } from "@/hooks/use-toast";
import { ContentBlock } from "@/Interfaces/Interface-Post";

export default function EditarArtigoPage() {
  const router = useRouter();
  const params = useParams();
  const postId = Number(params.id);
  const { toast } = useToast();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [blocks, setBlocks] = useState<ContentBlock[]>([
    { type: "text", content: "", order: 1 },
  ]);

  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setInitialLoading(true);
        const [cats, postData] = await Promise.all([
          getAllCategories(),
          getPostById(postId),
        ]);

        setCategories(cats);
        setTitle(postData.title);
        setCategoryId(String(postData.categorieId));

        setCurrentImage(postData.imageUrl || null);

        if (postData.content) {
          try {
            const parsedBlocks = JSON.parse(postData.content);
            if (Array.isArray(parsedBlocks) && parsedBlocks.length > 0) {
              setBlocks(parsedBlocks);
            } else {
              setBlocks([
                { type: "text", content: postData.content, order: 1 },
              ]);
            }
          } catch (e) {
            setBlocks([{ type: "text", content: postData.content, order: 1 }]);
          }
        }
      } catch (err) {
        console.error(err);
        toast({
          title: "Erro",
          description: "Não foi possível carregar o artigo.",
          variant: "destructive",
        });
        router.push("/admin/posts");
      } finally {
        setInitialLoading(false);
      }
    };

    if (postId) carregarDados();
  }, [postId, router, toast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !categoryId || blocks.some((b) => !b.content.trim())) {
      toast({
        title: "Atenção",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: title,
        categorieId: Number(categoryId),
        content: JSON.stringify(blocks),
      };
      await updatePost(postId, payload);

      if (selectedFile) {
        await updatePostImage(postId, selectedFile);
      }

      toast({
        title: "Atualizado!",
        description: "Seu artigo foi editado com sucesso.",
      });

      router.push("/admin/posts");
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Falha ao atualizar o artigo ou a imagem.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    // ... mantido igual
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4 text-slate-500">
          <RefreshCw className="w-8 h-8 animate-spin text-[#1a4d7a]" />
          <p className="font-medium animate-pulse">
            Carregando dados do artigo...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
        {/* Header - Mantido igual */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-slate-200 rounded-full transition-colors duration-300 text-slate-400 hover:text-[#1a4d7a] cursor-pointer"
              title="Voltar"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h3 className="font-bold text-[#1a4d7a] text-2xl flex items-center gap-2">
                <Layout className="w-6 h-6 text-[#c9a961]" /> Editando:{" "}
                {title || "Carregando..."}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Altere os blocos de conteúdo e informações da publicação.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="p-8 space-y-10">
          <section className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h4 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
              <ImageIcon className="w-4 h-4 text-[#1a4d7a]" /> Imagem de Capa
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Capa Atual
                </p>
                <div className="w-full h-48 bg-slate-200 rounded-xl overflow-hidden border border-slate-200 relative">
                  <img
                    src={getPostImageUrl(currentImage)}
                    alt="Capa Atual"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* NOVA IMAGEM (PREVIEW E INPUT) */}
              <div className="space-y-2 flex flex-col">
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Nova Capa (Preview)
                </p>

                <div
                  className={`w-full h-48 rounded-xl overflow-hidden border-2 border-dashed flex flex-col items-center justify-center transition-all ${previewImage ? "border-[#1a4d7a]" : "border-slate-300 bg-white"}`}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 text-sm">
                      Nenhuma nova imagem
                    </span>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 w-full py-2.5 bg-white border border-slate-300 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 hover:text-[#1a4d7a] hover:border-[#1a4d7a]/50 transition-all text-sm"
                >
                  {previewImage
                    ? "Trocar Imagem Selecionada"
                    : "Selecionar Nova Imagem"}
                </button>
              </div>
            </div>
          </section>

          {/* Dados Gerais - Mantidos iguais */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 group">
              <label className="text-xs font-bold text-slate-500 uppercase transition-colors group-hover:text-[#1a4d7a]">
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-[#1a4d7a]/30 focus:ring-2 focus:ring-[#1a4d7a]/10 focus:outline-none text-slate-800 font-medium transition-all duration-300"
                placeholder="Insira o título do artigo"
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-xs font-bold text-slate-500 uppercase transition-colors group-hover:text-[#1a4d7a]">
                Categoria
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-[#1a4d7a]/30 focus:ring-2 focus:ring-[#1a4d7a]/10 focus:outline-none text-slate-800 transition-all duration-300 cursor-pointer"
              >
                <option value="">Selecione uma categoria...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* Editor de Blocos - Mantido igual */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Conteúdo do Artigo
              </h4>
              <button
                type="button"
                onClick={addBlock}
                className="bg-[#1a4d7a]/5 hover:bg-[#1a4d7a] text-[#1a4d7a] hover:text-white px-4 py-2 rounded-lg flex items-center gap-2 text-[10px] font-bold uppercase transition-all duration-300 cursor-pointer hover:shadow-md"
              >
                <Plus className="w-3 h-3" /> Adicionar Bloco
              </button>
            </div>

            <div className="space-y-10">
              {blocks.map((block, index) => (
                <div
                  key={index}
                  className="group relative transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-[#1a4d7a] text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase shadow-sm flex items-center gap-2 transition-colors duration-300 group-hover:bg-[#0d2d4a]">
                      <Layout className="w-3 h-3 text-[#c9a961]" /> Bloco{" "}
                      {block.order}
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2.5 group-hover:translate-x-0">
                      <button
                        type="button"
                        onClick={() => moveBlock(index, "up")}
                        className="p-1.5 bg-slate-100 hover:bg-[#c9a961] text-slate-500 hover:text-white rounded-md transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-sm"
                        title="Subir bloco"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveBlock(index, "down")}
                        className="p-1.5 bg-slate-100 hover:bg-[#c9a961] text-slate-500 hover:text-white rounded-md transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-sm"
                        title="Descer bloco"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeBlock(index)}
                        className="p-1.5 bg-red-50 hover:bg-red-500 text-red-400 hover:text-white rounded-md transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-sm ml-2"
                        title="Excluir bloco"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <textarea
                    rows={6}
                    value={block.content}
                    onChange={(e) => updateBlock(index, e.target.value)}
                    placeholder="Escreva o conteúdo deste bloco aqui..."
                    className="w-full p-6 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#1a4d7a]/30 focus:ring-4 focus:ring-[#1a4d7a]/5 focus:outline-none text-slate-700 resize-none text-lg leading-relaxed transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </section>
        </form>

        {/* Footer - Mantido igual */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-4">
          <button
            onClick={() => router.back()}
            className="px-8 py-3 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-10 py-3 bg-[#1a4d7a] hover:bg-[#c9a961] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transform hover:-translate-y-0.5"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" /> Salvar Alterações
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
