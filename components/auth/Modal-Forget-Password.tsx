"use client";

import { useState } from "react";
import {
  Mail,
  Loader2,
  ArrowRight,
  CheckCircle,
  KeyRound,
  Lock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { resendCode, resetPassword } from "@/lib/api";

export function ForgotPasswordModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    setErrorMsg("");

    try {
      await resendCode({ email });
      setStep(2);
    } catch (error: any) {
      setErrorMsg(
        error.message ||
          "Não foi possível enviar o código. Verifique o e-mail.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    setErrorMsg("");

    try {
      await resetPassword({ email, code, password });
      setStep(3);
    } catch (error: any) {
      setErrorMsg(error.message || "Código inválido ou expirado.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setTimeout(() => {
        setStep(1);
        setEmail("");
        setCode("");
        setPassword("");
        setErrorMsg("");
      }, 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-xs font-medium text-[#1a4d7a] hover:text-[#c9a961] transition-colors focus:outline-none hover:cursor-pointer"
        >
          Esqueceu a senha?
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white border-slate-200">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-serif font-bold text-[#1a4d7a] text-center">
            Recuperar Senha
          </DialogTitle>
          <DialogDescription className="text-center text-slate-500">
            {step === 1 &&
              "Digite seu e-mail para receber o código de redefinição de senha."}
            {step === 2 && "Verifique seu e-mail e crie uma nova senha."}
            {step === 3 && "Operação concluída!"}
          </DialogDescription>
        </DialogHeader>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-4 border border-red-100">
            {errorMsg}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleRequestCode} className="space-y-4">
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
              className="w-full bg-[#1a4d7a] hover:bg-[#0d2d4a] text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed hover:cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Enviar código para o email
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="text-sm text-slate-600 text-center bg-slate-50 p-3 rounded-lg mb-2">
              Enviamos um código de 6 dígitos para <br />
              <strong className="text-[#1a4d7a]">{email}</strong>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Código de Verificação
              </label>
              <div className="relative group">
                <KeyRound className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-[#c9a961] transition-colors" />
                <input
                  type="text"
                  placeholder="Ex: A1B2C3"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961] transition-all font-sans uppercase"
                  maxLength={6}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Nova Senha
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-[#c9a961] transition-colors" />
                <input
                  type="password"
                  placeholder="Mínimo de 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961] transition-all font-sans"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1a4d7a] hover:bg-[#0d2d4a] text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed hover:cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Redefinir Senha
                  <CheckCircle className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center py-4 space-y-4 animate-fade-in-up">
            <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-slate-600 px-4">
                Sua senha foi redefinida com sucesso!
                <br />
                Você já pode acessar sua conta.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-lg transition-colors hover:cursor-pointer"
            >
              Voltar para o Login
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
