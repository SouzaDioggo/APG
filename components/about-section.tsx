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
        
        {/* TÓPICO 1: QUEM SOMOS */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Play className="w-6 h-6 text-black/62 fill-purple-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Quem Somos</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl">
            Na APG, somos parceiros estratégicos na jornada de crescimento sustentável. 
            Nossa identidade é formada pela combinação de expertise técnica com visão estratégica, 
            atuando com foco total em resultados mensuráveis. Acreditamos no potencial das equipes 
            e na busca constante pela excelência operacional em um mercado cada vez mais competitivo.
          </p>
        </div>

        {/* TÓPICO 2: O QUE FAZEMOS */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Play className="w-6 h-6 text-black/62 fill-purple-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">O Que Fazemos</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl">
            Na APG, somos parceiros estratégicos na jornada de crescimento sustentável. 
            Nossa identidade é formada pela combinação de expertise técnica com visão estratégica, 
            atuando com foco total em resultados mensuráveis. Acreditamos no potencial das equipes 
            e na busca constante pela excelência operacional em um mercado cada vez mais competitivo.
          </p>
        </div>

        {/* Highlights Grid (Mantido igual) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-4/3 overflow-hidden">
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