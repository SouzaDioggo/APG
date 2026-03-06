"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { AdminHeader } from "@/components/admin/admin-header";
import { Users, FileText, Tags, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (user.type !== "admin") {
      router.push("/");
    } else {
      setIsAuthorized(true);
    }
  }, [user, router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#1a4d7a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Configuração dos Cards de Navegação
  const adminModules = [
    {
      title: "Gestão de Usuários",
      description:
        "Controle de acessos, exclusão e atribuição de cargos (Leitor, Autor, Admin).",
      icon: Users,
      href: "/admin/users",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Gestão de Artigos",
      description:
        "Administre as publicações do blog, edite ou remova conteúdos.",
      icon: FileText,
      href: "/admin/posts",
      color: "text-[#c9a961]",
      bgColor: "bg-[#c9a961]/10",
    },
    {
      title: "Categorias",
      description:
        "Crie e organize as categorias usadas nos artigos da plataforma.",
      icon: Tags,
      href: "/admin/categories",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Moderação de Comentários",
      description: "Aprove, edite ou exclua comentários feitos pelos leitores.",
      icon: MessageSquare,
      href: "/admin/comments",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader
        title="Dashboard"
        description="Visão geral e painel de controle da plataforma APG."
        backUrl="/"
      />

      <main className="container mx-auto px-6 py-12 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {adminModules.map((module) => (
            <Link
              key={module.href}
              href={module.href}
              className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-[#1a4d7a]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-4 rounded-xl ${module.bgColor}`}>
                  <module.icon className={`w-8 h-8 ${module.color}`} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800 group-hover:text-[#1a4d7a] transition-colors">
                    {module.title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {module.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-sm font-semibold text-[#1a4d7a] group-hover:text-[#c9a961] transition-colors">
                Acessar módulo
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
