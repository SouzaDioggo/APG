export function HeroSection() {
  return (
    <section
      id="home"
      // ALTERAÇÃO: 'min-h-screen' faz a seção ocupar toda a altura da tela
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {/* Imagem de Fundo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/fundo.jpg"
          alt="Business Meeting"
          className="w-full h-full object-cover"
        />
        {/* Overlay escuro para destacar o logo */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Conteúdo (Logo Centralizado) */}
      <div className="relative z-10 w-full px-6 flex justify-center items-center">
        <img
          src="/LOGO APG COLORIDO.png"
          alt="APG - Educação Empresarial & Treinamento"
          className="w-full max-w-[500px] md:max-w-[700px] h-auto object-contain drop-shadow-2xl animate-fade-in-up"
        />
      </div>
    </section>
  );
}