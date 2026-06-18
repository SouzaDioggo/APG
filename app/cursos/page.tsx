"use client";

import { useEffect, useState } from "react";
import { getAllCourses } from "@/lib/api";
import { CourseData } from "@/Interfaces/Interface-Cursos";
import {
  GraduationCap,
  Clock,
  BookOpen,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function PublicCoursesPage() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow pt-32 pb-16">
        {/* Header da Página */}
        <div className="container mx-auto px-6 mb-16 text-center animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-[#1a4d7a]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a4d7a] mb-4 font-display">
            Nossos Cursos
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Transforme sua carreira com nossos treinamentos especializados.
            Aprenda com quem entende do assunto e alcance o próximo nível.
          </p>
        </div>

        {/* Grid de Cursos */}
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl h-[450px] shadow-sm border border-slate-100 animate-pulse flex flex-col"
                >
                  <div className="h-32 bg-slate-200 rounded-t-2xl"></div>
                  <div className="p-6 flex-1 space-y-4 mt-2">
                    <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <div className="h-4 bg-slate-200 rounded"></div>
                      <div className="h-4 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <GraduationCap className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-700">
                Nenhum curso disponível no momento
              </h3>
              <p className="text-slate-500 mt-2">
                Em breve teremos novidades por aqui!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <div
                  key={course.id || `course-${index}`}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col overflow-hidden group animate-fade-in-up"
                >
                  <div
                    className={`${course.bgClass || "bg-[#1a4d7a]"} p-6 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 text-white">
                      <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider uppercase mb-3 border border-white/20">
                        {course.level}
                      </div>
                      <h3 className="text-2xl font-bold leading-tight">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  {/* Corpo do Card */}
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                      {course.description}
                    </p>

                    {/* Informações Básicas */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#c9a961]" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#c9a961]" />
                        <span>{course.modules} Módulos</span>
                      </div>
                    </div>

                    {/* Benefícios */}
                    <div className="space-y-2 mb-8 flex-1">
                      <p className="text-sm font-bold text-slate-800 mb-3">
                        O que você vai aprender:
                      </p>
                      {course.benefits?.slice(0, 3).map((benefit, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{benefit}</span>
                        </div>
                      ))}
                      {course.benefits && course.benefits.length > 3 && (
                        <p className="text-xs text-slate-400 italic mt-2 ml-6">
                          + {course.benefits.length - 3} outros benefícios...
                        </p>
                      )}
                    </div>

                    <a
                      href={course.hotmartLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1a4d7a] hover:bg-[#c9a961] text-white rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-95 group-hover:shadow-md"
                    >
                      Garantir minha vaga
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
