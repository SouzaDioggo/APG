"use client";

import { useState, useRef, useEffect } from "react"; // Adicionado useRef e useEffect
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  // Referência para saber onde o menu do usuário está na tela
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Efeito para fechar o menu ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    // Adiciona o listener quando o menu está aberto
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Sobre", href: "/sobre" },
    { name: "Cursos", href: "/cursos", hasDropdown: true },
  ];

  const coursesList = [
    {
      name: "Liderança e Gestão de Equipes",
      href: "/cursos#lideranca-gestao-equipes",
    },
    {
      name: "Estratégias de Marketing Digital",
      href: "/cursos#estrategias-marketing-digital",
    },
    {
      name: "Gestão de Projetos e Metodologias Ágeis",
      href: "/cursos#gestao-projetos-ageis",
    },
    {
      name: "Inteligência Emocional no Trabalho",
      href: "/cursos#inteligencia-emocional",
    },
    {
      name: "Técnicas Avançadas de Negociação",
      href: "/cursos#tecnicas-negociacao",
    },
    {
      name: "Inovação e Transformação Digital",
      href: "/cursos#inovacao-transformacao-digital",
    },
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-slate-950 text-white border-b border-slate-800">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="/" className="block hover:opacity-90 transition-opacity">
              <img
                src="/APG BRANCO.png"
                alt="APG Logo"
                className="h-14 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12 relative">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <DropdownMenu key={link.name}>
                    <DropdownMenuTrigger className="group flex items-center gap-2 text-sm font-medium hover:text-[#c9a961] transition-colors duration-200 outline-none data-[state=open]:text-[#c9a961] cursor-pointer">
                      {link.name}
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-72 p-3 bg-white border border-slate-200 rounded-xl shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
                      align="start"
                      sideOffset={12}
                    >
                      {coursesList.map((course, index) => (
                        <DropdownMenuItem
                          key={index}
                          asChild
                          className="cursor-pointer hover:bg-[#ecf0f1] rounded-md transition-colors duration-150"
                        >
                          <a
                            href={course.href}
                            className="w-full p-3 text-sm font-medium text-gray-700"
                            onClick={() => setIsOpen(false)}
                          >
                            {course.name}
                          </a>
                        </DropdownMenuItem>
                      ))}
                      <div className="border-t border-slate-200 my-2" />
                      <DropdownMenuItem
                        asChild
                        className="cursor-pointer hover:bg-[#ecf0f1] rounded-md transition-colors duration-150"
                      >
                        <a
                          href="/cursos"
                          className="w-full font-semibold text-[#1a4d7a] p-3 text-sm"
                        >
                          Ver todos os cursos →
                        </a>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium hover:text-[#c9a961] transition-colors duration-200"
                >
                  {link.name}
                </a>
              );
            })}

            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="group flex items-center gap-2 text-sm font-medium text-[#c9a961] transition-all duration-300 outline-none cursor-pointer bg-slate-900/40 hover:bg-slate-800/80 px-3 py-2 rounded-full border border-transparent hover:border-slate-800 active:scale-95"
                >
                  <div className="bg-slate-800 text-slate-300 group-hover:bg-[#c9a961] group-hover:text-slate-900 transition-colors duration-300 p-1.5 rounded-full">
                    <User className="w-4 h-4" />
                  </div>
                  <span>
                    Olá, {user.name ? user.name.split(" ")[0] : "Usuário"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isUserMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* CAIXA DE MENU ABSOLUTA */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-3 w-48 p-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 slide-in-from-top-2">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer font-medium p-3 rounded-lg outline-none transition-colors w-full group"
                    >
                      <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      Sair da conta
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="text-sm font-medium hover:text-[#c9a961] transition-colors duration-200"
              >
                Login
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:opacity-80 transition-opacity"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-800 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <Accordion
                    key={link.name}
                    type="single"
                    collapsible
                    className="w-full"
                  >
                    <AccordionItem value={link.name} className="border-b-0">
                      <AccordionTrigger className="py-3 text-sm font-medium hover:text-[#c9a961] hover:no-underline [&>svg]:text-white [&>svg]:w-5 [&>svg]:h-5">
                        {link.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-3 pl-4 pb-2 border-l border-slate-700 ml-2">
                          {coursesList.map((course, i) => (
                            <a
                              key={i}
                              href={course.href}
                              className="text-sm text-gray-300 hover:text-[#c9a961] transition-colors duration-150"
                              onClick={() => setIsOpen(false)}
                            >
                              {course.name}
                            </a>
                          ))}
                          <a
                            href="/cursos"
                            className="text-sm font-semibold text-[#c9a961] pt-1 hover:text-[#d4b876] transition-colors duration-150"
                            onClick={() => setIsOpen(false)}
                          >
                            Ver todos os cursos →
                          </a>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block py-3 text-sm font-medium hover:text-[#c9a961] transition-colors duration-150"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ),
              )}

              {/* Lógica de Autenticação no Mobile */}
              {user ? (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <div className="flex items-center gap-3 py-2 text-sm font-medium text-[#c9a961]">
                    <div className="bg-slate-800 p-2 rounded-full">
                      <User className="w-4 h-4 text-slate-300" />
                    </div>
                    <span>
                      Olá, {user.name ? user.name.split(" ")[0] : "Usuário"}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 mt-2 w-full text-left py-3 px-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-150"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair da conta
                  </button>
                </div>
              ) : (
                <div className="mt-2 pt-2 border-t border-slate-700">
                  <a
                    href="/login"
                    className="block py-3 text-sm font-medium hover:text-[#c9a961] transition-colors duration-150"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
