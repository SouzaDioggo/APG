export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {/* Imagem de Fundo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/fundo.jpg"
          alt="Business Meeting"
          className="w-full h-full object-cover"
        />
        {/* Overlay com gradiente mais refinado */}
        <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/60 to-black/50" />
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 w-full px-6 flex flex-col justify-center items-center gap-6">
        {/* Logo */}
        <img
          src="/LOGO APG NEGATIVO.png"
          alt="APG - Consultoria Empresarial"
          className="w-full max-w-[280px] md:max-w-[480px] h-auto object-contain drop-shadow-2xl animate-fade-in-up"
        />

        {/* Textos Adicionais */}
        <div className="text-center max-w-3xl animate-fade-in-up animation-delay-200 mt-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight font-serif">
            Especialistas em fazer você e seu negócio gerarem mais receita pela gestão de contratos e estruturação empresarial.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Consultoria especializada em gestão de contratos, compliance e proteção de dados que gera economia e segurança jurídica para seu negócio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <a
              href="/sobre"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Agende uma Consultoria Estratégica
            </a> */}
            {/* <a
              href="#beneficios"
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Conheça Nossos Diferenciais
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}