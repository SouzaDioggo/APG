"use client";

import { useState } from "react";
import { Loader2, MailCheck, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VerifyEmailModalProps {
  email: string;
  isOpen: boolean;
  onVerify: (code: string) => Promise<void>;
}

export function VerifyEmailModal({
  email,
  isOpen,
  onVerify,
}: VerifyEmailModalProps) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) return;

    setIsLoading(true);
    try {
      await onVerify(code);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      {/* onOpenChange vazio impede o fechamento pelo overlay ou Esc */}
      <DialogContent
        className="sm:max-w-md bg-white border-slate-200"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center">
          <div className="w-16 h-16 bg-[#c9a961]/10 rounded-full flex items-center justify-center mb-4">
            <MailCheck className="h-8 w-8 text-[#c9a961]" />
          </div>
          <DialogTitle className="text-2xl font-serif font-bold text-[#1a4d7a] text-center">
            Verifique seu E-mail
          </DialogTitle>
          <DialogDescription className="text-center text-slate-500">
            Enviamos um código de 6 dígitos para <br />
            <span className="font-semibold text-slate-700">{email}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="flex justify-center">
            <input
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) =>
                setCode(
                  e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase(),
                )
              }
              placeholder="000000"
              className="w-48 text-center text-3-xl tracking-[0.5em] font-bold py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961] outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || code.length < 6}
            className="w-full bg-[#1a4d7a] hover:bg-[#0d2d4a] text-white font-bold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Confirmar Código
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-slate-400">
            Não recebeu o código? Verifique a pasta de spam ou <br />
            <button
              type="button"
              className="text-[#c9a961] hover:underline mt-1"
            >
              Reenviar código
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
