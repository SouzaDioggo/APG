import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FeatureBanner() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <Card className="overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-64 md:h-auto">
              <img src="/person-using-smartphone-with-app-interface.jpg" alt="Digital Experience" className="w-full h-full object-cover" />
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-block mb-4">
                <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">NOVO</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                Colocando o Cliente no Centro da Experiência Digital
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Descubra como revolucionar o relacionamento com seus clientes através de estratégias centradas no
                usuário, tecnologia de ponta e uma abordagem orientada por dados que transforma cada interação em uma
                oportunidade de criar valor.
              </p>

              <Button className="w-fit bg-purple-600 hover:bg-purple-700 text-white">
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
