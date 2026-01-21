import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FeatureBanner() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <Card className="overflow-hidden shadow-xl border border-gray-200">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-64 md:h-auto overflow-hidden">
              <img src="/person-using-smartphone-with-app-interface.jpg" alt="Digital Experience" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Content Side */}
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <div className="inline-block mb-5">
                <span className="bg-purple-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full">NOVIDADE</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                Colocando o Cliente no Centro da Experiência Digital
              </h3>

              <p className="text-gray-600 mb-8 leading-relaxed text-base font-light">
                Descubra como revolucionar o relacionamento com seus clientes através de estratégias centradas no
                usuário, tecnologia de ponta e uma abordagem orientada por dados que transforma cada interação em uma
                oportunidade de criar valor.
              </p>

              <Button className="w-fit bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg">
                Ler artigo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
