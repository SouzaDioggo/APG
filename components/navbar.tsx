"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
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

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Sobre", href: "/sobre" },
    { name: "Blog", href: "/blog" },
    { name: "Cursos", href: "/cursos", hasDropdown: true },
  ];

  const coursesList = [
    { name: "Liderança e Gestão de Equipes", href: "/cursos#lideranca-gestao-equipes" },
    { name: "Estratégias de Marketing Digital", href: "/cursos#estrategias-marketing-digital" },
    { name: "Gestão de Projetos e Metodologias Ágeis", href: "/cursos#gestao-projetos-ageis" },
    { name: "Inteligência Emocional no Trabalho", href: "/cursos#inteligencia-emocional" },
    { name: "Técnicas Avançadas de Negociação", href: "/cursos#tecnicas-negociacao" },
    { name: "Inovação e Transformação Digital", href: "/cursos#inovacao-transformacao-digital" }
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-slate-950 text-white border-b border-slate-800">
      {/* Padding refinado para visual mais profissional */}
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="/" className="block hover:opacity-90 transition-opacity">
              {/* Logo refinada */}
              <img 
                src="/APG BRANCO.png" 
                alt="APG Logo" 
                className="h-14 w-auto object-contain" 
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <DropdownMenu key={link.name}>
                    {/* Links com transição mais suave */}
                    <DropdownMenuTrigger className="flex items-center gap-2 text-base font-medium hover:text-purple-300 transition-colors duration-200 outline-none data-[state=open]:text-purple-300">
                      {link.name}
                      {/* Ícone com transição */}
                      <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-72 p-3 bg-white border border-slate-200 rounded-lg shadow-lg" align="start">
                      {coursesList.map((course, index) => (
                        <DropdownMenuItem key={index} asChild>
                          <a 
                            href={course.href} 
                            className="w-full cursor-pointer hover:bg-purple-50 rounded-md p-3 text-sm font-medium text-gray-700 transition-colors duration-150"
                            onClick={() => setIsOpen(false)}
                          >
                            {course.name}
                          </a>
                        </DropdownMenuItem>
                      ))}
                      <div className="border-t border-slate-200 my-2" />
                      <DropdownMenuItem asChild>
                        <a href="/cursos" className="w-full font-semibold text-purple-600 cursor-pointer p-3 text-sm hover:bg-purple-50 rounded-md transition-colors duration-150">
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
                  className="text-sm font-medium hover:text-purple-300 transition-colors duration-200"
                >
                  {link.name}
                </a>
              );
            })}
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
          <div className="md:hidden mt-4 pb-4 border-t border-slate-800">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => 
                link.hasDropdown ? (
                  // Opção com Dropdown vira Accordion no Mobile
                  <Accordion key={link.name} type="single" collapsible className="w-full">
                    <AccordionItem value={link.name} className="border-b-0">
                      <AccordionTrigger className="py-3 text-sm font-medium hover:text-purple-300 hover:no-underline [&>svg]:text-white [&>svg]:w-5 [&>svg]:h-5">
                        {link.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-3 pl-4 pb-2 border-l border-slate-700 ml-2">
                          {coursesList.map((course, i) => (
                            <a
                              key={i}
                              href={course.href}
                              className="text-sm text-gray-300 hover:text-purple-300 transition-colors duration-150"
                              onClick={() => setIsOpen(false)}
                            >
                              {course.name}
                            </a>
                          ))}
                          <a 
                            href="/cursos" 
                            className="text-sm font-semibold text-purple-400 pt-1 hover:text-purple-300 transition-colors duration-150"
                            onClick={() => setIsOpen(false)}
                          >
                            Ver todos os cursos →
                          </a>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  // Link Normal Mobile
                  <a
                    key={link.name}
                    href={link.href}
                    className="block py-3 text-sm font-medium hover:text-purple-300 transition-colors duration-150"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}