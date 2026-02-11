"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { ForgotPasswordModal } from "@/components/login/Modal-Forget-Password";
import Image from "next/image";
import { SignUpModal } from "@/components/login/Modal-Create-Account";
import Link from "next/link"; // Importação do Link para navegação

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Login Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de login
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-[115vh] flex w-full bg-slate-50">
      {/* Lado Esquerdo - Decorativo / Imagem */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0d2d4a] items-center justify-center overflow-hidden">
        {/* Overlay com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a4d7a]/90 to-[#0d2d4a]/90 z-10" />

        {/* Padrão de fundo */}
        <div
          className="absolute inset-0 opacity-20 z-0"
          style={{
            backgroundImage: "url('/abstract-blue-lines-pattern.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-20 text-white p-12 max-w-lg">
          <div className="mb-8">
            <Image
              src="/APG BRANCO.png"
              alt="Logo APG"
              width={180}
              height={80}
              className="object-contain mb-8"
            />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Excelência em{" "}
            <span className="text-[#c9a961]">Educação Empresarial</span>
          </h1>
          <p className="font-sans text-lg text-slate-300 leading-relaxed">
            Acesse sua área exclusiva para continuar sua jornada de
            desenvolvimento profissional e transformação organizacional.
          </p>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white relative">
        <Link
          href="/"
          className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#1a4d7a] transition-colors group"
        >
          <div className="p-1 rounded-full group-hover:bg-slate-100 transition-colors">
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span>Voltar</span>
        </Link>

        <div className="w-full max-w-md space-y-8 animate-fade-in-up">
          {/* Cabeçalho Mobile */}
          <div className="lg:hidden text-center mb-8">
            <Image
              src="/APG AZUL.png"
              alt="Logo APG"
              width={150}
              height={60}
              className="mx-auto object-contain"
            />
          </div>

          <div className="text-center lg:text-left">
            <h2 className="font-serif text-3xl font-bold text-[#1a4d7a]">
              Bem-vindo de volta
            </h2>
            <p className="font-sans text-slate-500 mt-2">
              Insira suas credenciais para acessar sua conta.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div className="space-y-4">
              {/* Campo Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  E-mail
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-[#c9a961] transition-colors" />
                  <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961] transition-all font-sans"
                    required
                  />
                </div>
              </div>

              {/* Campo Senha */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700"
                  >
                    Senha
                  </label>
                  <ForgotPasswordModal />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-[#c9a961] transition-colors" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961] transition-all font-sans"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-[#1a4d7a] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a4d7a] hover:bg-[#0d2d4a] text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Entrar na Plataforma
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">
                Ou continue com
              </span>
            </div>
          </div>

          <div className="text-center text-sm">
            <span className="text-slate-600">Ainda não tem uma conta? </span>

            {/* Componente Modal Importado */}
            <SignUpModal />
          </div>
        </div>
      </div>
    </div>
  );
}
