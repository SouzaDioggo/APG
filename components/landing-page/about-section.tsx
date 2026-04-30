"use client";
import { TrendingUp, Users, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function AboutSection() {
  const originalHighlights = [
    {
      image: "/modern-office-meeting.png",
      title: "Consultoria Estratégica",
      subtitle: "Resultados mensuráveis",
      icon: TrendingUp,
    },
    {
      image: "/business-training.png",
      title: "Gestão de Contratos",
      subtitle: "Metodologias avançadas",
      icon: Users,
    },
    {
      image: "/executive-consulting.jpg",
      title: "Compliance e LGPD",
      subtitle: "Proteção empresarial",
      icon: Target,
    },
  ];

  const highlights = [...originalHighlights, ...originalHighlights];

  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-6">
        {/* TÓPICO 1: QUEM SOMOS */}
        <div className="mb-16 flex flex-col items-center text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black bg-linear-to-r from-[#1a4d7a] to-[#0d2d4a] bg-clip-text text-transparent mb-6 font-serif">
            Quem Somos
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed font-normal">
            Somos uma consultoria estratégica focada em{" "}
            <span className="font-semibold text-[#1a4d7a]">
              transformação organizacional
            </span>{" "}
            e{" "}
            <span className="font-semibold text-[#1a4d7a]">
              crescimento sustentável
            </span>
            . Combinamos{" "}
            <span className="font-semibold text-[#1a4d7a]">
              expertise técnica
            </span>{" "}
            com{" "}
            <span className="font-semibold text-[#1a4d7a]">
              visão estratégica
            </span>{" "}
            para entregar resultados mensuráveis. Acreditamos que empresas de
            excelência são construídas por equipes engajadas, processos bem
            estruturados e decisões orientadas por dados.
          </p>
        </div>

        {/* TÓPICO 2: O QUE FAZEMOS */}
        <div className="mb-20 flex flex-col items-center text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black bg-linear-to-r from-[#1a4d7a] to-[#0d2d4a] bg-clip-text text-transparent mb-6 font-serif">
            O Que Fazemos
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed font-normal">
            Oferecemos um portfólio completo de{" "}
            <span className="font-semibold text-[#1a4d7a]">
              serviços de consultoria
            </span>{" "}
            que abrange desde{" "}
            <span className="font-semibold text-[#1a4d7a]">
              diagnósticos estratégicos
            </span>{" "}
            até{" "}
            <span className="font-semibold text-[#1a4d7a]">
              implantação de soluções
            </span>
            . Utilizamos{" "}
            <span className="font-semibold text-[#1a4d7a]">
              metodologias comprovadas
            </span>
            ,{" "}
            <span className="font-semibold text-[#1a4d7a]">
              análise de dados
            </span>{" "}
            e as melhores práticas de mercado para garantir que seus objetivos
            sejam alcançados com eficiência e excelência operacional.
          </p>
        </div>

        {/* CARROSSEL DOS DESTAQUES - REDESENHADO */}
        <div className="mt-14">
          <h3 className="text-2xl font-bold text-gray-900 mb-16">
            Nossos Destaques
          </h3>
          <div className="flex justify-center px-4 md:px-8">
            <Carousel
              opts={{
                align: "center",
                loop: true,
                dragFree: true,
              }}
              className="w-full max-w-6xl"
            >
              <CarouselContent className="-ml-4">
                {highlights.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <CarouselItem
                      key={index}
                      className="pl-4 basis-full sm:basis-1/2 md:basis-1/3"
                    >
                      <div className="h-full">
                        <Card className="overflow-hidden transition-all duration-300 h-full flex flex-col border border-gray-200 hover:border-slate-400 group cursor-pointer hover:shadow-lg bg-white">
                          {/* Ícone com fundo neutro e animações */}
                          <div className="bg-linear-to-br from-slate-100 to-slate-50 flex items-center justify-center py-12 px-6 group-hover:from-slate-200 group-hover:to-slate-100 transition-all duration-400">
                            <div className="relative">
                              {/* Ícone com animação apenas no hover */}
                              <IconComponent
                                className="w-14 h-14 text-slate-700 group-hover:text-slate-900 transition-colors duration-300 relative z-10"
                                style={{
                                  animation: "var(--icon-animation)",
                                }}
                              />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex flex-col justify-between bg-white p-6 text-center">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-2 text-lg group-hover:text-slate-700 transition-colors duration-300">
                                {item.title}
                              </h3>
                              <p className="text-slate-600 text-sm group-hover:text-slate-700 transition-colors duration-300">
                                {item.subtitle}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              {/* Setas visíveis em todos os breakpoints */}
              <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="h-10 w-10 bg-slate-200 hover:bg-slate-300 text-slate-700 border-0 transition-all duration-300 relative position-static" />
                <CarouselNext className="h-10 w-10 bg-slate-200 hover:bg-slate-300 text-slate-700 border-0 transition-all duration-300 relative position-static" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
