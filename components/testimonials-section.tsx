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
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">O que dizem nossos parceiros</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i} className="bg-white">
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-6">"{t.content}"</p>
                <div className="flex items-center justify-center gap-4">
                  <Avatar>
                    <AvatarImage src={t.avatar} />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-bold text-sm">{t.name}</p>
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