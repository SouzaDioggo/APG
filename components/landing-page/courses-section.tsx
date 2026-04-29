import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CoursesSection() {
  const courses = [
    {
      title: "Empreender certo - como fazer negócios rentáveis",
      image: "/abstract-purple-waves.png",
    },
    {
      title: "Estratégias de Marketing Digital",
      image: "/abstract-blue-lines-pattern.jpg",
    },
    {
      title: "Gestão de Projetos e Metodologias Ágeis",
      image: "/abstract-purple-gradient-waves.jpg",
    },
    {
      title: "Inteligência Emocional no Trabalho",
      image: "/abstract-flowing-purple-lines.jpg",
    },
    {
      title: "Técnicas Avançadas de Negociação",
      image: "/abstract-blue-wave-technology.jpg",
    },
    {
      title: "Inovação e Transformação Digital",
      image: "/abstract-purple-blue-gradient.png",
    },
  ]

  return (
    <section id="cursos" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Nossos cursos</h2>
          <p className="text-xl text-gray-600 font-light">Venha conhecer</p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-3/2 overflow-hidden bg-linear-to-br from-[#1a4d7a] to-[#0d2d4a]">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-lg leading-tight">{course.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center">
          <Button size="lg" className="bg-[#1a4d7a] hover:bg-[#0d2d4a] text-white px-8 py-6 text-base">
            Ver mais...
          </Button>
        </div>
      </div>
    </section>
  )
}
