"use client";

import { Instagram, Mail, Phone } from "lucide-react";

const coursesList = [
  { name: "Liderança e Gestão de Equipes", href: "/cursos#lideranca-gestao-equipes" },
  { name: "Estratégias de Marketing Digital", href: "/cursos#estrategias-marketing-digital" },
  { name: "Gestão de Projetos e Metodologias Ágeis", href: "/cursos#gestao-projetos-ageis" },
  { name: "Inteligência Emocional no Trabalho", href: "/cursos#inteligencia-emocional" },
  { name: "Técnicas Avançadas de Negociação", href: "/cursos#tecnicas-negociacao" },
  { name: "Inovação e Transformação Digital", href: "/cursos#inovacao-transformacao-digital" }
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <img 
              src="/APG BRANCO.png" 
              alt="APG Logo" 
              className="h-12 w-auto object-contain mb-4"
            />
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Transformando empresas através de estratégias personalizadas de gestão e desenvolvimento organizacional.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm font-light">
                  Home
                </a>
              </li>
              <li>
                <a href="/cursos" className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm font-light">
                  Cursos
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm font-light">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Serviços</h3>
            <ul className="space-y-2">
              {coursesList.map((course, index) => (
                <li key={index}>
                  <a 
                    href={course.href} 
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm font-light line-clamp-1"
                  >
                    {course.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Conecte-se</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <a 
                  href="https://www.instagram.com/apg_educacao_empresarial/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm font-light"
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </a>
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href="mailto:contato@apg.com.br"
                  className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm font-light"
                >
                  <Mail className="w-5 h-5" />
                  contato@apg.com.br
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-xs font-light mb-4 md:mb-0">
            © 2026 APG - Educação Empresarial & Treinamento. Todos os direitos reservados.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a 
              href="https://www.instagram.com/apg_educacao_empresarial/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors duration-200 hover:scale-110 transform"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
