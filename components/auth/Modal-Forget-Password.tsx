"use client";

import { useState } from "react";
import { Mail, Loader2, ArrowRight, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ForgotPasswordModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de envio de email
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    // Resetar estados ao fechar o modal para que na próxima vez esteja limpo
    if (!open) {
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="text-xs font-medium text-[#1a4d7a] hover:text-[#c9a961] transition-colors focus:outline-none">
          Esqueceu a senha?
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white border-slate-200">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-serif font-bold text-[#1a4d7a] text-center">
            Recuperar Senha
          </DialogTitle>
          <DialogDescription className="text-center text-slate-500">
            {isSubmitted
              ? "Verifique sua caixa de entrada."
              : "Digite seu e-mail para receber as instruções de redefinição."}
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          // Estado de Sucesso
          <div className="flex flex-col items-center justify-center py-4 space-y-4 animate-fade-in-up">
            <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-slate-600 px-4">
                Enviamos um link de recuperação para:
                <br />
                <span className="font-semibold text-[#1a4d7a]">{email}</span>
              </p>
              <p className="text-xs text-slate-400">
                Se não encontrar, verifique sua caixa de spam.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-lg transition-colors"
            >
              Voltar para o Login
            </button>
          </div>
        ) : (
          // Formulário de Envio
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                E-mail Cadastrado
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-[#c9a961] transition-colors" />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961] transition-all font-sans"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1a4d7a] hover:bg-[#0d2d4a] text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Enviar Instruções
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
