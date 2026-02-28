"use client";

import { useState } from "react";
import { User, Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SignUpModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Estados para controlar os inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Estado para mensagem de erro
  const [error, setError] = useState("");

  // Função para atualizar os valores dos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpa o erro assim que o usuário começa a corrigir
    if (error) setError("");
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem. Por favor, tente novamente.");
      return;
    }

    if (formData.password.length < 5) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="font-semibold text-[#1a4d7a] hover:text-[#c9a961] transition-colors focus:outline-none">
          Criar conta gratuitamente
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white border-slate-200">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-serif font-bold text-[#1a4d7a] text-center">
            Criar Nova Conta
          </DialogTitle>
          <DialogDescription className="text-center text-slate-500">
            Preencha seus dados abaixo para iniciar sua jornada.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSignUpSubmit} className="space-y-4">
          {/* Nome Completo */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Nome Completo
            </label>
            <div className="relative group">
              <User className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-[#c9a961] transition-colors" />
              <input
                name="name"
                type="text"
                placeholder="Seu nome"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961] transition-all font-sans"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">E-mail</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-[#c9a961] transition-colors" />
              <input
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961] transition-all font-sans"
                required
              />
            </div>
          </div>

          {/* Senha */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Senha</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-[#c9a961] transition-colors" />
              <input
                name="password"
                type="password"
                placeholder="Crie uma senha forte"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961] transition-all font-sans"
                required
              />
            </div>
          </div>

          {/* Confirmar Senha */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Confirme sua Senha
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-[#c9a961] transition-colors" />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                // Adiciona borda vermelha se houver erro
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-1 transition-all font-sans ${
                  error
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-200 focus:border-[#c9a961] focus:ring-[#c9a961]"
                }`}
                required
              />
            </div>
          </div>

          {/* MENSAGEM DE ERRO VISUAL */}
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg animate-fade-in-up">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#c9a961] hover:bg-[#b89a52] text-[#0d2d4a] font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Cadastrar"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
