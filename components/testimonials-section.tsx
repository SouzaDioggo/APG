import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Carlos Silva",
      role: "CEO da TechCorp",
      company: "Tecnologia",
      content: "A consultoria estratégica da APG revolucionou nossa gestão. Em 6 meses tivemos 40% de aumento na produtividade e realinhamento completo de processos.",
      avatar: "/placeholder-user.jpg",
      rating: 5
    },
    {
      name: "Marina Oliveira",
      role: "Diretora de RH",
      company: "Goldman Industries",
      content: "O treinamento em Liderança e Gestão de Equipes foi transformador. Nossas equipes estão muito mais engajadas e os resultados falam por si.",
      avatar: "/placeholder-user.jpg",
      rating: 5
    },
    {
      name: "Roberto Santos",
      role: "Gerente de Projetos",
      company: "ConstrutoraPro",
      content: "Implementamos as metodologias ágeis com a APG e nossos projetos saem no prazo. O expertise deles é incomparável.",
      avatar: "/placeholder-user.jpg",
      rating: 5
    },
    {
      name: "Fernanda Costa",
      role: "Sócia-Diretora",
      company: "Consultoria FGV Partners",
      content: "Contratamos a APG para consultoria em transformação digital. O resultado foi um aumento de 35% na eficiência operacional em menos de 4 meses.",
      avatar: "/placeholder-user.jpg",
      rating: 5
    },
    {
      name: "Lucas Mendes",
      role: "Coordenador de Treinamentos",
      company: "Banco Múltiplo Brasil",
      content: "Os cursos de Inteligência Emocional da APG impactaram muito positivamente a cultura organizacional. Recomendo fortemente!",
      avatar: "/placeholder-user.jpg",
      rating: 5
    },
    {
      name: "Juliana Ferreira",
      role: "Head de Operações",
      company: "E-commerce Solutions",
      content: "Trabalhar com a APG em análise de dados e KPIs deu clareza total sobre nosso negócio. Decisões muito mais assertivas agora.",
      avatar: "/placeholder-user.jpg",
      rating: 5
    },
    {
      name: "Paulo Rodrigues",
      role: "Presidente",
      company: "Grupo Logístico Brasil",
      content: "A APG não é apenas consultoria, é parceria real. Estão envolvidos no sucesso da empresa. Excelente profissionalismo e comprometimento.",
      avatar: "/placeholder-user.jpg",
      rating: 5
    },
    {
      name: "Beatriz Alves",
      role: "Diretora de Marketing",
      company: "TrendStyle Fashion",
      content: "O treinamento em Estratégias de Marketing Digital foi perfeito para nossa equipe. Aplicamos imediatamente e vimos resultados em semanas.",
      avatar: "/placeholder-user.jpg",
      rating: 5
    },
    {
      name: "André Machado",
      role: "CFO",
      company: "Indústrias Machado Ltda",
      content: "Transparência, metodologia clara e resultados mensuráveis. Tudo que a APG prometeu, entregou. Já estamos planejando novos projetos.",
      avatar: "/placeholder-user.jpg",
      rating: 5
    },
  ]

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1 justify-center mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  )

  return (
    <section className="py-28 bg-linear-to-b from-white to-slate-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            O que dizem nossos <span className="bg-linear-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">parceiros</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Empresas que confiam em nossa expertise para transformar seus negócios e potencializar seus resultados
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="bg-white border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group overflow-hidden">
              <CardContent className="pt-8">
                {/* Stars */}
                <StarRating rating={t.rating} />

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 text-sm leading-relaxed italic">
                  "{t.content}"
                </p>

                {/* Avatar and Info */}
                <div className="flex items-center gap-3 pb-4 border-t border-slate-100 pt-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={t.avatar} />
                    <AvatarFallback className="text-xs font-semibold bg-purple-100 text-purple-700">{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-left flex-1">
                    <p className="font-bold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-purple-600 font-semibold">{t.role}</p>
                    <p className="text-xs text-gray-500">{t.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-black text-purple-600 mb-2">+50</p>
            <p className="text-gray-600 font-medium">Empresas Transformadas</p>
          </div>
          <div>
            <p className="text-3xl font-black text-purple-600 mb-2">98%</p>
            <p className="text-gray-600 font-medium">Satisfação de Clientes</p>
          </div>
          <div>
            <p className="text-3xl font-black text-purple-600 mb-2">500+</p>
            <p className="text-gray-600 font-medium">Profissionais Treinados</p>
          </div>
          <div>
            <p className="text-3xl font-black text-purple-600 mb-2">15+</p>
            <p className="text-gray-600 font-medium">Anos de Experiência</p>
          </div>
        </div>
      </div>
    </section>
  )
}