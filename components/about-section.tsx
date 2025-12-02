import { Play } from "lucide-react"
import { Card } from "@/components/ui/card"

export function AboutSection() {
  const highlights = [
    {
      image: "/modern-office-meeting.png",
      title: "Estratégias de Gestão",
      subtitle: "Metodologias avançadas",
    },
    {
      image: "/business-training.png",
      title: "Desenvolvimento Profissional",
      subtitle: "Capacitação empresarial",
    },
    {
      image: "/executive-consulting.jpg",
      title: "Consultoria Estratégica",
      subtitle: "Resultados mensuráveis",
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Title with Icon */}
        <div className="flex items-center gap-3 mb-8">
          <Play className="w-6 h-6 text-purple-600 fill-purple-600" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">O que somos/o que fazemos</h2>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed mb-16 max-w-4xl">
          Na APG, transformamos empresas através de estratégias personalizadas de gestão e desenvolvimento
          organizacional. Nossa metodologia inovadora combina expertise técnica com visão estratégica, oferecendo
          soluções integradas em treinamento corporativo, consultoria empresarial e programas de capacitação. Com foco
          em resultados mensuráveis, atuamos como parceiros estratégicos na jornada de crescimento sustentável,
          potencializando equipes e otimizando processos para alcançar excelência operacional em um mercado cada vez
          mais competitivo.
        </p>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.subtitle}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
