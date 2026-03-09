// Dados de exemplo para artigos do blog
// Substitua por API real depois
import { Artigos } from "@/Interfaces/Interface-Artigos";

export const artigosBlog: Artigos[] = [
  {
    id: "1",
    titulo: "Como Implementar um Sistema de Autenticação com JWT em Next.js",
    slug: "autenticacao-jwt-nextjs",
    resumo:
      "Aprenda a implementar um sistema seguro de autenticação usando JWT em Next.js com melhorias de segurança.",
    conteudo:
      "Neste artigo, vamos explorar como implementar um sistema de autenticação robusto usando JWT (JSON Web Tokens) em Next.js. Abordaremos desde a configuração básica até práticas avançadas de segurança.",
    autor: "Gabriel Silva",
    data: "2024-01-15",
    categoria: "Desenvolvimento",
    imagem:
      "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=400&fit=crop",
    visualizacoes: 1250,
    tags: ["JWT", "Next.js", "Autenticação"],
  },
  {
    id: "2",
    titulo: "Gestão de Projetos: Melhores Práticas para Equipes Remotas",
    slug: "gestao-projetos-equipes-remotas",
    resumo:
      "Descubra as melhores práticas para gerenciar projetos com equipes distribuídas geograficamente.",
    conteudo:
      "Com o aumento do trabalho remoto, a gestão de projetos se tornou mais desafiadora. Vamos explorar ferramentas, metodologias e práticas que funcionam bem para equipes remotas.",
    autor: "Gabriel Silva",
    data: "2024-01-10",
    categoria: "Gestão",
    imagem:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    visualizacoes: 980,
    tags: ["Gestão", "Projetos", "Equipes Remotas"],
  },
  {
    id: "3",
    titulo: "Growth Hacking: Estratégias para Crescimento Exponencial",
    slug: "growth-hacking-estrategias",
    resumo:
      "Técnicas e estratégias de growth hacking para escalar sua startup ou negócio digital.",
    conteudo:
      "Growth hacking é uma metodologia que combina criatividade, análise de dados e técnicas de marketing para alcançar crescimento rápido. Neste artigo, vamos explorar as principais estratégias.",
    autor: "Gabriel Silva",
    data: "2024-01-05",
    categoria: "Marketing",
    imagem:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    visualizacoes: 1450,
    tags: ["Growth Hacking", "Marketing", "Startup"],
  },
  {
    id: "4",
    titulo: "Inteligência Artificial: Impacto nos Negócios Modernos",
    slug: "ia-impacto-negocios",
    resumo:
      "Entenda como a inteligência artificial está transformando o cenário empresarial e o que você precisa fazer para se preparar.",
    conteudo:
      "A inteligência artificial não é mais apenas um tópico de ficção científica. Ela está moldando o futuro dos negócios e criando oportunidades sem precedentes.",
    autor: "Gabriel Silva",
    data: "2023-12-28",
    categoria: "Tecnologia",
    imagem:
      "https://images.unsplash.com/photo-1677442d019cecf8e5aa1e86ac966185?w=800&h=400&fit=crop",
    visualizacoes: 2100,
    tags: ["IA", "Inteligência Artificial", "Negócios"],
  },
  {
    id: "5",
    titulo: "Tendências de Design Web para 2024",
    slug: "tendencias-design-web-2024",
    resumo:
      "Confira as principais tendências de design web que dominarão em 2024 e como implementá-las.",
    conteudo:
      "O design web está em constante evolução. As preferências dos usuários mudam, e novas tecnologias emergem. Vamos explorar as tendências mais relevantes para este ano.",
    autor: "Gabriel Silva",
    data: "2023-12-20",
    categoria: "Design",
    imagem:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
    visualizacoes: 856,
    tags: ["Design", "Web", "Tendências"],
  },
  {
    id: "6",
    titulo: "DevOps: Automatizando seu Pipeline de Deploy",
    slug: "devops-pipeline-deploy",
    resumo:
      "Guia completo sobre como configurar e otimizar seu pipeline de deploy com DevOps.",
    conteudo:
      "DevOps combina desenvolvimento e operações para criar um processo eficiente e contínuo. Vamos aprender como automatizar seu pipeline e melhorar a qualidade das releases.",
    autor: "Gabriel Silva",
    data: "2023-12-15",
    categoria: "Desenvolvimento",
    imagem:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    visualizacoes: 1100,
    tags: ["DevOps", "Pipeline", "Deployment"],
  },
];

// Função para obter os últimos N artigos
export function obterUltimosArtigos(limite: number = 3): Artigos[] {
  return artigosBlog.slice(0, limite);
}

// Função para obter um artigo por slug
export function obterArtigoPorSlug(slug: string): Artigos | undefined {
  return artigosBlog.find((artigo) => artigo.slug === slug);
}

// Função para obter artigos por categoria
export function obterArtigosPorCategoria(categoria: string): Artigos[] {
  return artigosBlog.filter((artigo) => artigo.categoria === categoria);
}

// Função para buscar artigos por palavra-chave
export function buscarArtigos(termo: string): Artigos[] {
  const termoLower = termo.toLowerCase();
  return artigosBlog.filter(
    (artigo) =>
      artigo.titulo.toLowerCase().includes(termoLower) ||
      artigo.resumo.toLowerCase().includes(termoLower),
  );
}
