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
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="/" className="block">
              <img 
                src="/APG BRANCO.png" 
                alt="APG Logo" 
                className="h-10 w-auto object-contain" 
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <DropdownMenu key={link.name}>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-purple-400 transition-colors outline-none data-[state=open]:text-purple-400">
                      {link.name}
                      <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 p-2" align="start">
                      {coursesList.map((course, index) => (
                        <DropdownMenuItem key={index} asChild>
                          <a 
                            href="/cursos" 
                            className="w-full cursor-pointer hover:bg-gray-100 rounded-sm p-2 text-sm font-medium text-gray-700"
                          >
                            {course}
                          </a>
                        </DropdownMenuItem>
                      ))}
                      <div className="border-t my-1" />
                      <DropdownMenuItem asChild>
                        <a href="/cursos" className="w-full font-bold text-purple-600 cursor-pointer">
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
                  className="text-sm font-medium hover:text-purple-400 transition-colors"
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
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col">
              {navLinks.map((link) => 
                link.hasDropdown ? (
                  // Opção com Dropdown vira Accordion no Mobile
                  <Accordion key={link.name} type="single" collapsible className="w-full">
                    <AccordionItem value={link.name} className="border-b-0">
                      <AccordionTrigger className="py-3 text-sm font-medium hover:text-purple-400 hover:no-underline [&>svg]:text-white">
                        {link.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-3 pl-4 pb-2 border-l border-gray-800 ml-1">
                          {coursesList.map((course, i) => (
                            <a
                              key={i}
                              href="/cursos"
                              className="text-sm text-gray-400 hover:text-purple-400"
                              onClick={() => setIsOpen(false)}
                            >
                              {course}
                            </a>
                          ))}
                          <a 
                            href="/cursos" 
                            className="text-sm font-semibold text-purple-500 pt-2"
                            onClick={() => setIsOpen(false)}
                          >
                            Ver todos os cursos →
                          </a>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  // Link Normal
                  <a
                    key={link.name}
                    href={link.href}
                    className="block py-3 text-sm font-medium hover:text-purple-400 transition-colors border-b border-transparent"
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