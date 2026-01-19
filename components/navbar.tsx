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
    { name: "Blog", href: "/blog" },
    { name: "Cursos", href: "/cursos", hasDropdown: true },
  ];

  const coursesList = [
    "Liderança e Gestão de Equipes",
    "Estratégias de Marketing Digital",
    "Gestão de Projetos e Metodologias Ágeis",
    "Inteligência Emocional no Trabalho",
    "Técnicas Avançadas de Negociação",
    "Inovação e Transformação Digital"
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-gray-950 text-white">
      {/* AUMENTADO: Padding vertical alterado de py-4 para py-6 */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="/" className="block">
              {/* AUMENTADO: Altura da logo alterada de h-10 para h-16 */}
              <img 
                src="/APG BRANCO.png" 
                alt="APG Logo" 
                className="h-16 w-auto object-contain" 
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10"> {/* AUMENTADO: Gap entre itens de 8 para 10 */}
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <DropdownMenu key={link.name}>
                    {/* AUMENTADO: Texto alterado de text-sm para text-lg */}
                    <DropdownMenuTrigger className="flex items-center gap-2 text-lg font-medium hover:text-purple-400 transition-colors outline-none data-[state=open]:text-purple-400">
                      {link.name}
                      {/* AUMENTADO: Ícone da seta um pouco maior */}
                      <ChevronDown className="w-5 h-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-72 p-2" align="start"> {/* Aumentei a largura do dropdown */}
                      {coursesList.map((course, index) => (
                        <DropdownMenuItem key={index} asChild>
                          <a 
                            href="/cursos" 
                            // AUMENTADO: Texto interno do dropdown para text-base
                            className="w-full cursor-pointer hover:bg-gray-100 rounded-sm p-3 text-base font-medium text-gray-700"
                          >
                            {course}
                          </a>
                        </DropdownMenuItem>
                      ))}
                      <div className="border-t my-1" />
                      <DropdownMenuItem asChild>
                        <a href="/cursos" className="w-full font-bold text-purple-600 cursor-pointer p-3 text-base">
                          Ver todos os cursos
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
                  // AUMENTADO: Texto alterado de text-sm para text-lg
                  className="text-lg font-medium hover:text-purple-400 transition-colors"
                >
                  {link.name}
                </a>
              );
            })}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {/* AUMENTADO: Ícone do menu mobile de 24 para 32 */}
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-6 pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-2"> {/* Adicionei espaçamento vertical */}
              {navLinks.map((link) => 
                link.hasDropdown ? (
                  // Opção com Dropdown vira Accordion no Mobile
                  <Accordion key={link.name} type="single" collapsible className="w-full">
                    <AccordionItem value={link.name} className="border-b-0">
                      {/* AUMENTADO: Texto mobile para text-lg */}
                      <AccordionTrigger className="py-4 text-lg font-medium hover:text-purple-400 hover:no-underline [&>svg]:text-white [&>svg]:w-6 [&>svg]:h-6">
                        {link.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-4 pl-4 pb-2 border-l border-gray-800 ml-2">
                          {coursesList.map((course, i) => (
                            <a
                              key={i}
                              href="/cursos"
                              // AUMENTADO: Subitens mobile para text-base
                              className="text-base text-gray-400 hover:text-purple-400"
                              onClick={() => setIsOpen(false)}
                            >
                              {course}
                            </a>
                          ))}
                          <a 
                            href="/cursos" 
                            className="text-base font-semibold text-purple-500 pt-2"
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
                    // AUMENTADO: Texto mobile para text-lg
                    className="block py-4 text-lg font-medium hover:text-purple-400 transition-colors border-b border-transparent"
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