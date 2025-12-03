"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { FloatingElements } from "@/components/floating-elements";
import {
  ICourse,
  AbstractBackgroundProps,
} from "@/Interfaces/Interface-Cursos";

// Dados dos cursos para popular a grade, agora tipados
const courses: ICourse[] = [
  { title: "Liderança e Gestão de Equipes", bgClass: "bg-gradient-1" },
  { title: "Estratégias de Marketing Digital", bgClass: "bg-gradient-2" },
  {
    title: "Gestão de Projetos e Metodologias Ágeis",
    bgClass: "bg-gradient-3",
  },
  { title: "Inteligência Emocional no Trabalho", bgClass: "bg-gradient-4" },
  { title: "Técnicas Avançadas de Negociação", bgClass: "bg-gradient-5" },
  { title: "Inovação e Transformação Digital", bgClass: "bg-gradient-6" },
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
                g[1].toUpperCase()
              );
              return [camelKey, value];
            })
        ),
      }}
    >
      {innerElements}
    </div>
  );
};

// Componente Card de Curso
const CourseCard: React.FC<ICourse> = ({ title, bgClass }) => {
  return (
    <div className="relative w-full h-[200px] sm:h-[280px] lg:h-[300px] rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1">
      <AbstractBackground bgClass={bgClass} />

      <div className="absolute inset-0 p-4 flex items-end">
        <h3 className="text-white text-lg sm:text-xl font-bold leading-snug drop-shadow-lg">
          {title}
        </h3>
      </div>
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    </div>
  );
};

// Componente Principal
const App: React.FC = () => {
  return (
    <div className="font-sans min-h-screen bg-gray-50 relative pb-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
      <Navbar />
      <header className="py-12 md:py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
          Nossos cursos
        </h1>
        <p className="text-lg text-gray-500 mt-2">Venha conhecer</p>
      </header>
      {/* Grid de Crusos */}
      <main className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              bgClass={course.bgClass}
            />
          ))}
        </div>
      </main>
      <FloatingElements />;
    </div>
  );
};

export default App;
