"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { FloatingElements } from "@/components/layout/floating-elements";
import { Footer } from "@/components/layout/footer";
import {
  AbstractBackgroundProps,
  CourseData,
} from "@/Interfaces/Interface-Cursos";
import { ArrowRight, CheckCircle2, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const courses: CourseData[] = [
  {
    id: "empreender-certo-negocios-rentaveis",
    title: "Empreender certo - como fazer negócios rentáveis",
    bgClass: "bg-gradient-1",
    description:
      "Aprenda a estruturar a base jurídica da sua empresa de forma estratégica. Entenda como redigir cláusulas que evitam conflitos, protegem o patrimônio dos sócios e garantem a longevidade do negócio desde o primeiro dia.",
    duration: "7 horas",
    modules: 5,
    level: "Iniciante",
    benefits: [
      "Considerações iniciais para abrir seu negócio rentável",
      "Identidade do negócio",
      "Estruturas jurídicas disponíveis",
    ],
    hotmartLink: "https://hotmart.com/pt-br/marketplace/produtos/construindo-um-contrato-social/E104548757B",
  },
  {
    id: "sociedade-limitada-gestor-precisa-saber",
    title: "Sociedade Limitada: O que Todo Gestor Precisa Saber",
    bgClass: "bg-gradient-2",
    description:
      "EM BREVE!",
    duration: "",
    modules: 0,
    level: "EM BREVE!",
    benefits: [
      "EM BREVE!",
    ],
    hotmartLink: "",
  },
  {
    id: "formacao-gestor-protecao-dados-dpo",
    title: "Formação de Gestor de Proteção de Dados (DPO)",
    bgClass: "bg-gradient-3",
    description:
      "EM BREVE!",
    duration: "",
    modules: 0,
    level: "EM BREVE!",
    benefits: [
      "EM BREVE!",
    ],
    hotmartLink: "",
  },
  {
    id: "ong-osc-gestao-que-funciona",
    title: "ONG e OSC: Gestão que Funciona",
    bgClass: "bg-gradient-4",
    description:
      "EM BREVE!",
    duration: "",
    modules: 0,
    level: "EM BREVE!",
    benefits: [
      "EM BREVE!",
    ],
    hotmartLink: "",
  },
];

const AbstractBackground: React.FC<AbstractBackgroundProps> = ({ bgClass }) => {
  let backgroundStyles = "";
  let innerElements: React.ReactNode = null;

  switch (bgClass) {
    case "bg-gradient-1":
      // Roxo/Rosa escuro com linhas brancas simuladas (Topo Esquerdo)
      backgroundStyles = `
        background: linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%);
        box-shadow: 0 15px 30px rgba(74, 0, 224, 0.4);
      `;
      innerElements = (
        <svg
          className="absolute inset-0 w-full h-full opacity-60"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            d="M0 20 Q 25 5, 50 20 T 100 20"
          />
          <path
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            d="M0 40 Q 25 25, 50 40 T 100 40"
          />
          <path
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            d="M0 60 Q 25 45, 50 60 T 100 60"
          />
          <path
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            d="M0 80 Q 25 65, 50 80 T 100 80"
          />
        </svg>
      );
      break;
    case "bg-gradient-2":
      // Azul Elétrico com padrão hexagonal/linhas (Topo Central)
      backgroundStyles = `
        background: linear-gradient(135deg, #1A2980 0%, #26D0CE 100%);
      `;
      innerElements = (
        <svg
          className="absolute inset-0 w-full h-full opacity-60"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="hexGrid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0 5 L 5 0 L 10 5 L 5 10 Z"
                stroke="white"
                strokeWidth="0.2"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexGrid)" />
        </svg>
      );
      break;
    case "bg-gradient-3":
      // Gradiente Roxo Suave com ondas (Topo Direito)
      backgroundStyles = `
        background: linear-gradient(45deg, #6A11CB 0%, #2575FC 100%);
      `;
      innerElements = (
        <div
          className="absolute inset-0 bg-white opacity-20"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)",
          }}
        ></div>
      );
      break;
    case "bg-gradient-4":
      // Roxo Profundo com linhas orgânicas e escuras (Baixo Esquerdo)
      backgroundStyles = `
        background: linear-gradient(135deg, #0f0c29 0%, #302b63 100%);
      `;
      innerElements = (
        <svg
          className="absolute inset-0 w-full h-full opacity-70"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            fill="none"
            stroke="#A772FF"
            strokeWidth="0.5"
            d="M0 10 C 25 50, 75 50, 100 90"
          />
          <path
            fill="none"
            stroke="#A772FF"
            strokeWidth="0.5"
            d="M0 5 C 25 40, 75 40, 100 70"
          />
          <path
            fill="none"
            stroke="#A772FF"
            strokeWidth="0.5"
            d="M0 15 C 25 60, 75 60, 100 100"
          />
        </svg>
      );
      break;
    case "bg-gradient-5":
      // Azul/Ciano claro com ondas horizontais (Baixo Central)
      backgroundStyles = `
        background: linear-gradient(135deg, #00B4DB 0%, #0083B0 100%);
      `;
      innerElements = (
        <div
          className="absolute inset-0 bg-white opacity-30"
          style={{
            clipPath: "polygon(0 0, 100% 30%, 100% 100%, 0 70%)",
            transform: "scaleX(1.5) rotate(5deg)",
          }}
        ></div>
      );
      break;
    case "bg-gradient-6":
      // Roxo/Azul Vibrante com cortes diagonais (Baixo Direito)
      backgroundStyles = `
        background: linear-gradient(45deg, #3A1C71 0%, #D76D77 100%);
      `;
      innerElements = (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 70% 100%, 30% 0)",
          }}
        ></div>
      );
      break;
    default:
      backgroundStyles = "background: #3B82F6;";
  }

  return (
    <div
      className="absolute inset-0 rounded-xl overflow-hidden"
      style={{
        ...Object.fromEntries(
          backgroundStyles
            .split(";")
            .filter((s) => s.trim())
            .map((s) => {
              const [key, value] = s.split(":").map((str) => str.trim());
              const camelKey = key.replace(/-([a-z])/g, (g) =>
                g[1].toUpperCase(),
              );
              return [camelKey, value];
            }),
        ),
      }}
    >
      {innerElements}
    </div>
  );
};

// Componente Card de Curso com Design Profissional
const CourseCard: React.FC<CourseData & { isSelected?: boolean }> = ({
  id,
  title,
  bgClass,
  description,
  duration,
  modules,
  level,
  benefits,
  hotmartLink,
  isSelected = false,
}) => {
  return (
    <div
      id={id}
      className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group h-full flex flex-col scroll-mt-32 ${isSelected ? "border-4 border-[#1a4d7a] shadow-2xl animate-course-bounce" : "border border-gray-200"}`}
    >
      {/* Header com Gradiente */}
      <div className="relative h-32 overflow-hidden">
        <AbstractBackground bgClass={bgClass} />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full">
          <span className="text-xs font-semibold text-gray-800">{level}</span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Título */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Descrição */}
        <p className="text-gray-600 text-sm mb-4 font-light leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Informações */}
        <div className="grid grid-cols-2 gap-3 mb-6 py-4 border-y border-gray-200">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#1a4d7a]" />
            <span className="text-xs text-gray-600 font-medium">
              {duration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#1a4d7a]" />
            <span className="text-xs text-gray-600 font-medium">
              {modules} módulos
            </span>
          </div>
        </div>

        {/* Benefícios */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
            O que você vai aprender:
          </h4>
          <ul className="space-y-2">
            {benefits.slice(0, 3).map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1a4d7a] shrink-0 mt-0.5" />
                <span className="text-xs text-gray-600 font-light">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Botão */}
        <a
          href={hotmartLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto"
        >
          <Button className="w-full bg-[#1a4d7a] hover:bg-[#0d2d4a] text-white font-semibold py-2 rounded-lg transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2">
            Acessar na Hotmart
            <ArrowRight className="w-4 h-4" />
          </Button>
        </a>
      </div>
    </div>
  );
};

// Componente Principal
const App: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  useEffect(() => {
    // Detecta o hash da URL e define qual curso está selecionado
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setSelectedCourseId(hash);

        // Aguarda um pouco para o elemento estar renderizado, depois faz scroll suave
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            // Scroll suave e centralizado
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      } else {
        setSelectedCourseId(null);
      }
    };

    // Checa no carregamento inicial
    handleHashChange();

    // Checa quando o hash muda
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  return (
    <div className="font-sans min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
      <Navbar />

      {/* Header */}
      <header className="py-16 md:py-24 bg-linear-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nossos Cursos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Desenvolvidos para profissionais que buscam aprimorar suas
            habilidades e alcançar novos patamares em suas carreiras. Todos os
            cursos estão disponíveis na plataforma Hotmart.
          </p>
        </div>
      </header>

      {/* Grid de Cursos */}
      <main className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              id={course.id}
              title={course.title}
              bgClass={course.bgClass}
              description={course.description}
              duration={course.duration}
              modules={course.modules}
              level={course.level}
              benefits={course.benefits}
              hotmartLink={course.hotmartLink}
              isSelected={selectedCourseId === course.id}
            />
          ))}
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pronto para transformar sua empresa?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-light">
            Todos os nossos cursos foram desenvolvidos por especialistas da
            indústria e estão disponíveis na Hotmart com acesso imediato após a
            compra.
          </p>
          <a href="mailto:Apgeducacaoempresarial@gmail.com">
            <Button className="bg-[#1a4d7a] hover:bg-[#0d2d4a] text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-lg">
              Entre em Contato
            </Button>
          </a>
        </div>
      </section>

      <FloatingElements />
      <Footer />
    </div>
  );
};

export default App;
