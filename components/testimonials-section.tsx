import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Carlos Silva",
      role: "CEO da TechCorp",
      content: "A consultoria da APG transformou completamente nossa gestão de processos.",
      avatar: "/placeholder-user.jpg"
    },
    // Adicione mais...
  ]

  return (
    <section className="py-28 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-3 text-gray-900">O que dizem nossos parceiros</h2>
        <p className="text-gray-600 text-base mb-16 max-w-2xl mx-auto font-light">Empresas que confiam em nossa expertise para transformar seus negócios</p>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-8">
                <p className="text-gray-600 mb-6 text-base font-light italic">"{t.content}"</p>
                <div className="flex items-center justify-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={t.avatar} />
                    <AvatarFallback className="text-xs">{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}