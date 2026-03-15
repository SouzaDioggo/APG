"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingElements } from "@/components/layout/floating-elements";
import Link from "next/link";
import { ArrowLeft, Upload, X } from "lucide-react";
import Image from "next/image";

interface FormData {
  titulo: string;
  slug: string;
  resumo: string;
  conteudo: string;
  categoria: string;
  tags: string[];
  imagem: string | null;
  imagemFile: File | null;
}

export default function NovoArtigoPage() {
  const [formData, setFormData] = useState<FormData>({
    titulo: "",
    slug: "",
    resumo: "",
    conteudo: "",
    categoria: "Desenvolvimento",
    tags: [],
    imagem: null,
    imagemFile: null,
  });

  const [previewImagem, setPreviewImagem] = useState<string | null>(null);
  const [novaTag, setNovaTag] = useState("");

  const categorias = [
    "Desenvolvimento",
    "Design",
    "Marketing",
    "Gestão",
    "Tecnologia",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "titulo" && { slug: value.toLowerCase().replace(/\s+/g, "-") }),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imagemFile: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImagem(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (novaTag.trim() && !formData.tags.includes(novaTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, novaTag.trim()],
      }));
      setNovaTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      imagemFile: null,
      imagem: null,
    }));
    setPreviewImagem(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui a lógica do backend será adicionada
    console.log("Formulário enviado:", {
      ...formData,
      imagemFile: previewImagem,
    });
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero section */}
      <section className="bg-linear-to-r from-[#12395c] to-blue-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft size={20} />
            Voltar ao Blog
          </Link>
          <h1 className="text-4xl font-bold">Criar Novo Artigo</h1>
          <p className="text-blue-100 text-lg mt-2">
            Compartilhe seu conhecimento com a comunidade
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="py-12 bg-slate-50 flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-8 space-y-8"
          >
            {/* Upload Imagem */}
            <div className="space-y-4">
              <label className="block text-lg font-bold text-slate-900">
                Imagem de Capa
              </label>
              {previewImagem ? (
                <div className="relative group">
                  <div className="relative w-full h-64 rounded-lg overflow-hidden bg-slate-100">
                    <Image
                      src={previewImagem}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center w-full h-48 border-3 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-[#1a4d7a] hover:bg-slate-50 transition-colors">
                  <div className="text-center">
                    <Upload className="mx-auto mb-2 text-slate-400" size={32} />
                    <p className="text-slate-600 font-semibold">
                      Clique para fazer upload ou arraste uma imagem
                    </p>
                    <p className="text-slate-500 text-sm mt-1">
                      PNG, JPG ou GIF (máx. 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Título */}
            <div className="space-y-2">
              <label htmlFor="titulo" className="block text-lg font-bold text-slate-900">
                Título do Artigo
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                placeholder="Digite o título do seu artigo"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1a4d7a] focus:ring-2 focus:ring-[#1a4d7a]/20"
                required
              />
            </div>

            {/* Slug - Gerado automaticamente */}
            {formData.titulo && (
              <div className="space-y-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-600 font-semibold">URL do Artigo:</p>
                <p className="text-slate-900 flex items-center gap-2">
                  <span className="text-slate-500">blog/</span>
                  <span className="font-bold text-[#1a4d7a]">{formData.slug}</span>
                </p>
              </div>
            )}

            {/* Categoria */}
            <div className="space-y-2">
              <label htmlFor="categoria" className="block text-lg font-bold text-slate-900">
                Categoria
              </label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1a4d7a] focus:ring-2 focus:ring-[#1a4d7a]/20"
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Resumo */}
            <div className="space-y-2">
              <label htmlFor="resumo" className="block text-lg font-bold text-slate-900">
                Resumo
              </label>
              <p className="text-sm text-slate-500">
                Descrição breve que será exibida no grid
              </p>
              <textarea
                id="resumo"
                name="resumo"
                value={formData.resumo}
                onChange={handleInputChange}
                placeholder="Digite um resumo breve do artigo"
                rows={2}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1a4d7a] focus:ring-2 focus:ring-[#1a4d7a]/20 resize-none"
                required
              />
            </div>

            {/* Conteúdo */}
            <div className="space-y-2">
              <label htmlFor="conteudo" className="block text-lg font-bold text-slate-900">
                Conteúdo do Artigo
              </label>
              <p className="text-sm text-slate-500">
                Digite o conteúdo completo do seu artigo
              </p>
              <textarea
                id="conteudo"
                name="conteudo"
                value={formData.conteudo}
                onChange={handleInputChange}
                placeholder="Digite o conteúdo completo do seu artigo"
                rows={10}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1a4d7a] focus:ring-2 focus:ring-[#1a4d7a]/20 resize-none font-mono text-sm"
                required
              />
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <label className="block text-lg font-bold text-slate-900">
                Tags
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={novaTag}
                  onChange={(e) => setNovaTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Digite uma tag e pressione Enter"
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1a4d7a] focus:ring-2 focus:ring-[#1a4d7a]/20"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-6 py-3 bg-slate-200 text-slate-900 font-bold rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Adicionar
                </button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-[#1a4d7a] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:opacity-70 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Botões de ação */}
            <div className="flex gap-4 pt-8 border-t border-slate-200">
              <Link
                href="/blog"
                className="flex-1 px-6 py-3 border border-slate-300 text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-colors text-center"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#1a4d7a] to-blue-700 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:from-[#0f3554] hover:to-blue-800"
              >
                Publicar Artigo
              </button>
            </div>
          </form>
        </div>
      </section>

      <FloatingElements />
      <Footer />
    </main>
  );
}
