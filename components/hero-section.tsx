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

      {/* Conteúdo (Logo Centralizado) */}
      <div className="relative z-10 w-full px-6 flex justify-center items-center">
        <img
          src="/LOGO APG NEGATIVO.png"
          alt="APG - Educação Empresarial & Treinamento"
          className="w-full max-w-[280px] md:max-w-[480px] h-auto object-contain drop-shadow-2xl animate-fade-in-up"
        />
      </div>
    </section>
  );
}