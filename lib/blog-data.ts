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
      "Neste artigo, vamos explorar como implementar um sistema de autenticação robusto usando JWT (JSON Web Tokens) em Next.js. Abordaremos desde a configuração básica até práticas avançadas de segurança.\n\nJWT é um padrão aberto (RFC 7519) que define uma forma compacta e independente de transmitir informações com segurança entre partes como um objeto JSON. Estas informações podem ser verificadas e confiáveis porque são assinadas digitalmente.\n\nAs principais vantagens incluem:\n- Stateless: O JWT é auto contido, logo não requer sessão no servidor\n- Seguro: Pode ser assinado usando um segredo (HMAC) ou um par chave pública/privada (RSA)\n- Escalável: Funciona perfeitamente bem em ambientes de microserviços\n\nVamos implementar passo a passo desde a criação de um middleware até a proteção de rotas.",
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
      "Com o aumento do trabalho remoto, a gestão de projetos se tornou mais desafiadora. Vamos explorar ferramentas, metodologias e práticas que funcionam bem para equipes remotas.\n\nAs principais ferramentas incluem:\n- Asana: Planejamento e organização visual\n- Monday.com: Automação de workflows\n- Slack: Comunicação em tempo real\n- Notion: Documentação centralizada\n\nAs metodologias ágeis como Scrum e Kanban são especialmente úteis para equipes remotas, permitindo melhor controle e visibilidade do progresso.",
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
      "Growth hacking é uma metodologia que combina criatividade, análise de dados e técnicas de marketing para alcançar crescimento rápido. Neste artigo, vamos explorar as principais estratégias.\n\nTécnicas comprovadas:\n1. Viral Loop: Incentive seus usuários a compartilhar\n2. Referral Programs: Recompense quem traz novos usuários\n3. Product-Led Growth: Deixe o produto fazer o marketing\n4. Data-Driven Decisions: Teste e itere baseado em dados\n\nCasos de sucesso como Airbnb, Uber e Dropbox utilizaram growth hacking para atingir bilhões em valuation em pouquíssimo tempo.",
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
      "A inteligência artificial não é mais apenas um tópico de ficção científica. Ela está moldando o futuro dos negócios e criando oportunidades sem precedentes.\n\nAplicações práticas:\n- Chatbots e Atendimento ao Cliente\n- Análise Preditiva e Recomendações\n- Automação de Processos\n- Detecção de Fraude\n- Processamento de Linguagem Natural\n\nEmpresas que adotam IA agora terão vantagem competitiva nos próximos anos. É importante começar pequeno e aprender enquanto implementa soluções.",
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
      "O design web está em constante evolução. As preferências dos usuários mudam, e novas tecnologias emergem. Vamos explorar as tendências mais relevantes para este ano.\n\nPrincipais tendências:\n1. Dark Mode: Preferência crescente de usuários\n2. Tipografia Ousada: Fontes grandes e impactantes\n3. Minimalismo: Menos é mais\n4. Microinterações: Pequenas animações que melhoram UX\n5. Acessibilidade: Design inclusivo para todos\n6. 3D e Glassmorphism: Elementos visuais modernos\n\nImplementar estas tendências pode aumentar significativamente o engagement e a satisfação dos usuários.",
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
      "DevOps combina desenvolvimento e operações para criar um processo eficiente e contínuo. Vamos aprender como automatizar seu pipeline e melhorar a qualidade das releases.\n\nComponentes essenciais de um pipeline CI/CD:\n1. Source Control: Git/GitHub\n2. Build Automation: Docker, Maven, Gradle\n3. Testing: Unit tests, Integration tests\n4. Deployment: Staging e Produção\n5. Monitoring: Alertas e observabilidade\n\nFazer deploy múltiplas vezes por dia é possível com um pipeline bem estruturado. Cada commit passa por testes automatizados e só é liberado após passar com sucesso.",
    autor: "Gabriel Silva",
    data: "2023-12-15",
    categoria: "Desenvolvimento",
    imagem:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    visualizacoes: 1100,
    tags: ["DevOps", "Pipeline", "Deployment"],
  },
  {
    id: "7",
    titulo: "React Hooks: Guia Completo para Iniciantes",
    slug: "react-hooks-guia-completo",
    resumo:
      "Domine React Hooks e escreva componentes funcionais mais poderosos e reutilizáveis.",
    conteudo:
      "React Hooks permitem usar estado e outras features do React sem escrever classes. Introduzidos na versão 16.8, revolucionaram a forma como escrevemos componentes React.\n\nHooks principais:\n- useState: Gerenciar estado\n- useEffect: Side effects\n- useContext: Contexto sem prop drilling\n- useReducer: Estado complexo\n- useCallback: Otimizar performance\n- useMemo: Memoização de valores\n\nCom hooks, código é mais limpo, reutilizável e fácil de testar. Vamos explorar cada um em detalhes.",
    autor: "Gabriel Silva",
    data: "2023-12-10",
    categoria: "Desenvolvimento",
    imagem:
      "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=400&fit=crop",
    visualizacoes: 1620,
    tags: ["React", "JavaScript", "Hooks"],
  },
  {
    id: "8",
    titulo: "SEO para E-commerce: Otimize suas Vendas",
    slug: "seo-ecommerce-otimize",
    resumo:
      "Estratégias de SEO específicas para aumentar visibilidade e vendas em e-commerce.",
    conteudo:
      "SEO é crucial para e-commerce. Aparecer na primeira página do Google para palavras-chave relevantes pode aumentar significativamente suas vendas.\n\nEstrutura de uma boa estratégia SEO:\n1. Pesquisa de palavras-chave: Ferramentas como SEMrush, Ahrefs\n2. Otimização On-page: Titles, descriptions, headers\n3. Link Building: Backlinkss de qualidade\n4. Velocidade do Site: PageSpeed é fator de ranking\n5. Mobile First: Otimizar para dispositivos móveis\n6. User Experience: Core Web Vitals\n\nResultados de SEO levam tempo, mas o tráfego orgânico é o mais valioso e sustentável.",
    autor: "Gabriel Silva",
    data: "2023-12-05",
    categoria: "Marketing",
    imagem:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    visualizacoes: 945,
    tags: ["SEO", "E-commerce", "Marketing Digital"],
  },
  {
    id: "9",
    titulo: "Tailwind CSS: Estilizando com Utilidades",
    slug: "tailwind-css-utilidades",
    resumo:
      "Aprenda a usar Tailwind CSS para criar designs modernos com classes utilitárias.",
    conteudo:
      "Tailwind CSS é uma framework de CSS utility-first que permite escrever estilos sem sair do HTML. Diferentemente do Bootstrap, você combina classes pequenas para criar designs únicos.\n\nVantagens do Tailwind:\n- DRY: Classes reutilizáveis\n- Customizável: Fácil adaptar cores, spacing, etc\n- Otimizado: Remova CSS não usado\n- Documentação Excelente: Tudo bem documentado\n- Comunidade: Plugins e templates disponíveis\n\nTailwind nos permite criar interfaces profissionais rapidamente, mantendo código limpo e documentado.",
    autor: "Gabriel Silva",
    data: "2023-11-30",
    categoria: "Design",
    imagem:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
    visualizacoes: 1340,
    tags: ["Tailwind CSS", "CSS", "Frontend"],
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
