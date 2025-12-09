import { Play } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function AboutSection() {
  const originalHighlights = [
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

  // AQUI ESTÁ O TRUQUE: Duplicamos a lista para garantir que o loop funcione
  const highlights = [...originalHighlights, ...originalHighlights]


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

        {/* CARROSSEL DOS DESTAQUES */}
        <div className="flex justify-center px-4 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl"
          >
            <CarouselContent className="-ml-4">
              {highlights.map((item, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                      <div className="aspect-4/3 overflow-hidden">
                        <img 
                          src={item.image || "/placeholder.svg"} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                        />
                      </div>
                      <div className="p-6 text-center flex-1 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.subtitle}</p>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

      </div>
    </section>
  )
}