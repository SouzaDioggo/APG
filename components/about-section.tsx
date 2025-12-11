"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function AboutSection() {
  const [isQuemSomosOpen, setIsQuemSomosOpen] = useState(false)
  const [isOQueFazemosOpen, setIsOQueFazemosOpen] = useState(false)

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

  const highlights = [...originalHighlights, ...originalHighlights]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        
        {/* TÓPICO 1: QUEM SOMOS */}
        <div className="mb-12">
          <button 
            onClick={() => setIsQuemSomosOpen(!isQuemSomosOpen)}
            className="flex items-center gap-3 mb-6 group cursor-pointer focus:outline-none"
          >
            {isQuemSomosOpen ? (
              <ChevronDown className="w-8 h-8 text-purple-600 transition-transform duration-300" />
            ) : (
              <ChevronRight className="w-8 h-8 text-purple-600 transition-transform duration-300" />
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
              Quem Somos
            </h2>
          </button>
          
          {/* Animação com Grid */}
          <div 
            className={`grid transition-all duration-500 ease-in-out ${
              isQuemSomosOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="text-gray-600 text-lg leading-relaxed max-w-4xl ml-11">
                Na APG, somos parceiros estratégicos na jornada de crescimento sustentável. 
                Nossa identidade é formada pela combinação de expertise técnica com visão estratégica, 
                atuando com foco total em resultados mensuráveis. Acreditamos no potencial das equipes 
                e na busca constante pela excelência operacional em um mercado cada vez mais competitivo.
              </p>
            </div>
          </div>
        </div>

        {/* TÓPICO 2: O QUE FAZEMOS */}
        <div className="mb-16">
          <button 
            onClick={() => setIsOQueFazemosOpen(!isOQueFazemosOpen)}
            className="flex items-center gap-3 mb-6 group cursor-pointer focus:outline-none"
          >
            {isOQueFazemosOpen ? (
              <ChevronDown className="w-8 h-8 text-purple-600 transition-transform duration-300" />
            ) : (
              <ChevronRight className="w-8 h-8 text-purple-600 transition-transform duration-300" />
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
              O Que Fazemos
            </h2>
          </button>

          {/* Animação com Grid */}
          <div 
            className={`grid transition-all duration-500 ease-in-out ${
              isOQueFazemosOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="text-gray-600 text-lg leading-relaxed max-w-4xl ml-11">
                Na APG, somos parceiros estratégicos na jornada de crescimento sustentável. 
                Nossa identidade é formada pela combinação de expertise técnica com visão estratégica, 
                atuando com foco total em resultados mensuráveis. Acreditamos no potencial das equipes 
                e na busca constante pela excelência operacional em um mercado cada vez mais competitivo.
              </p>
            </div>
          </div>
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
                      <div className="aspect-4/3 overflow-hidden relative">
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