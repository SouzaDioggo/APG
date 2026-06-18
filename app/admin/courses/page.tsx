"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  getAllCourses,
  createCourse,
  deleteCourse,
  updateCourse,
} from "@/lib/api";
import { AdminHeader } from "@/components/admin/admin-header";
import {
  GraduationCap,
  Plus,
  RefreshCw,
  Search,
  Edit,
  Trash2,
  X,
  AlertTriangle,
  Check,
} from "lucide-react";
import { CourseData } from "@/Interfaces/Interface-Cursos";
import { useToast } from "@/hooks/use-toast";

export default function CoursesAdminPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [courses, setCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados do Modal de Edição/Criação
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Campos do Formulário
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    modules: 0,
    level: "",
    bgClass: "bg-gradient-to-r from-blue-500 to-blue-700", // Padrão
    hotmartLink: "",
    benefitsInput: "", // Trataremos isso para virar string[]
  });

  // Estados do Modal de Exclusão
  const [courseToDelete, setCourseToDelete] = useState<CourseData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const GRADIENT_PRESETS = [
    {
      name: "Azul APG",
      value: "bg-gradient-to-br from-[#1a4d7a] to-[#0d2d4a]",
    },
    { name: "Dourado", value: "bg-gradient-to-br from-[#c9a961] to-[#8a733f]" },
    { name: "Roxo", value: "bg-gradient-to-br from-purple-600 to-indigo-800" },
    {
      name: "Esmeralda",
      value: "bg-gradient-to-br from-emerald-500 to-teal-800",
    },
    { name: "Fogo", value: "bg-gradient-to-br from-orange-500 to-red-700" },
    { name: "Escuro", value: "bg-gradient-to-br from-slate-700 to-slate-900" },
  ];

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getAllCourses();
      setCourses(data);
    } catch (err: any) {
      console.error("Erro ao carregar cursos:", err);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os cursos.",
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

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // === Funções de Criação / Edição ===
  const handleOpenModal = (course?: CourseData) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        description: course.description,
        duration: course.duration,
        modules: course.modules,
        level: course.level,
        bgClass: course.bgClass,
        hotmartLink: course.hotmartLink,
        benefitsInput: course.benefits.join(", "), // Converte array para string
      });
    } else {
      setEditingCourse(null);
      setFormData({
        title: "",
        description: "",
        duration: "",
        modules: 0,
        level: "",
        bgClass: "bg-gradient-to-r from-blue-500 to-blue-700",
        hotmartLink: "",
        benefitsInput: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    // Converte a string separada por vírgulas em array
    const benefitsArray = formData.benefitsInput
      .split(",")
      .map((b) => b.trim())
      .filter((b) => b !== "");

    const payload = {
      ...formData,
      modules: Number(formData.modules),
      benefits: benefitsArray,
    };

    // Remove o benefitsInput que não vai para a API
    delete (payload as any).benefitsInput;

    try {
      setIsSaving(true);
      if (editingCourse) {
        await updateCourse(editingCourse.id, payload);
        toast({
          title: "Ação concluída com sucesso!",
          description: `O curso "${formData.title}" foi atualizado.`,
        });
      } else {
        await createCourse(payload);
        toast({
          title: "Ação concluída com sucesso!",
          description: `O curso "${formData.title}" foi criado.`,
        });
      }
      await loadData();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar curso:", error);
      toast({
        title: "Ops!",
        description: "Ocorreu um erro ao salvar o curso.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // === Funções de Exclusão ===
  const handleDeleteCourse = async () => {
    if (!courseToDelete) return;

    try {
      setIsDeleting(true);
      await deleteCourse(courseToDelete.id);
      await loadData();
      toast({
        title: "Ação concluída com sucesso!",
        description: `O curso "${courseToDelete.title}" foi removido.`,
      });
      setCourseToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir curso:", error);
      toast({
        title: "Não foi possível excluir",
        description: "Ocorreu um erro ao tentar deletar este curso.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <AdminHeader
        title="Gestão de Cursos"
        description="Gerencie os cursos oferecidos na plataforma."
        backUrl="/admin"
      />

      <main className="container mx-auto px-6 mt-8 animate-fade-in-up">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50">
            <h2 className="font-bold text-[#1a4d7a] flex items-center gap-2 text-xl">
              <GraduationCap className="w-5 h-5" /> Cursos
            </h2>

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
                <Plus className="w-4 h-4" /> Novo Curso
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-white text-slate-500 border-b border-slate-200">
                  <th className="px-6 py-4 font-medium">Título do Curso</th>
                  <th className="px-6 py-4 font-medium">Nível</th>
                  <th className="px-6 py-4 font-medium">Duração</th>
                  <th className="px-6 py-4 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">
                      Carregando cursos...
                    </td>
                  </tr>
                ) : filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">
                      Nenhum curso encontrado.
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((course, index) => (
                    <tr
                      key={course.id || `course-${index}`}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {course.title}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {course.level}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {course.duration} ({course.modules} mód.)
                      </td>
                      <td className="px-6 py-4 flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleOpenModal(course)}
                          className="text-[#1a4d7a] hover:text-[#c9a961] transition-all duration-300 hover:scale-110 hover:cursor-pointer p-1"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setCourseToDelete(course)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h3 className="font-bold text-[#1a4d7a] text-lg">
                {editingCourse ? "Editar Curso" : "Novo Curso"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-[#c9a961] transition-all duration-300 hover:scale-110 hover:cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nível
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Iniciante, Avançado"
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Descrição
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Duração
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 40 horas"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Quantidade de Módulos
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.modules}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        modules: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Benefícios (Separados por vírgula)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Certificado reconhecido, Suporte 24h, Acesso vitalício"
                  value={formData.benefitsInput}
                  onChange={(e) =>
                    setFormData({ ...formData, benefitsInput: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Link Hotmart
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://pay.hotmart.com/..."
                    value={formData.hotmartLink}
                    onChange={(e) =>
                      setFormData({ ...formData, hotmartLink: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961]"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Aparência do Card (Cor de Fundo)
                  </label>

                  {/* Grid de opções visuais */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {GRADIENT_PRESETS.map((preset) => {
                      const isSelected = formData.bgClass === preset.value;
                      return (
                        <button
                          type="button"
                          key={preset.value}
                          onClick={() =>
                            setFormData({ ...formData, bgClass: preset.value })
                          }
                          title={preset.name}
                          className={`relative h-16 w-full rounded-xl border-2 flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md ${
                            isSelected
                              ? "border-[#c9a961] shadow-md scale-105"
                              : "border-transparent"
                          }`}
                        >
                          <div
                            className={`absolute inset-0 ${preset.value} opacity-90`}
                          />

                          {/* Camada escurecida no hover para dar contraste ao texto */}
                          <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors" />

                          {/* Ícone de check se estiver selecionado */}
                          {isSelected && (
                            <div className="absolute top-1 right-1 bg-[#c9a961] text-white rounded-full p-0.5 shadow-sm z-20">
                              <Check className="w-3 h-3" />
                            </div>
                          )}

                          {/* Nome da cor amigável */}
                          <span className="relative z-10 text-xs font-bold text-white drop-shadow-md px-2 text-center leading-tight">
                            {preset.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Fallback de segurança: Se a classe atual não bater com nenhuma dos presets (ex: curso antigo) */}
                  {!GRADIENT_PRESETS.some(
                    (p) => p.value === formData.bgClass,
                  ) &&
                    formData.bgClass !== "" && (
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-xs text-amber-800 mb-2 font-medium flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Este curso possui uma cor personalizada antiga. Clique
                          em uma das opções acima para atualizar, ou mantenha a
                          classe abaixo:
                        </p>
                        <input
                          type="text"
                          value={formData.bgClass}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bgClass: e.target.value,
                            })
                          }
                          className="w-full px-3 py-1.5 text-sm border border-amber-300 rounded focus:outline-none focus:border-amber-500 bg-white text-slate-600"
                        />
                      </div>
                    )}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
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
                  className="px-4 py-2 bg-[#1a4d7a] hover:bg-[#c9a961] text-white rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                >
                  {isSaving && <RefreshCw className="w-3 h-3 animate-spin" />}
                  {editingCourse ? "Salvar Alterações" : "Criar Curso"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {courseToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h3 className="font-bold text-red-600 flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5" /> Excluir Curso
              </h3>
              <button
                onClick={() => setCourseToDelete(null)}
                className="text-slate-400 hover:text-red-600 transition-all duration-300 hover:scale-110 hover:cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5">
              <p className="text-slate-600 text-sm">
                Tem certeza que deseja excluir o curso{" "}
                <strong className="text-slate-800">
                  "{courseToDelete.title}"
                </strong>
                ? Esta ação não poderá ser desfeita.
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setCourseToDelete(null)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleDeleteCourse}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
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
