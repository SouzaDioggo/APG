"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Shield, User as UserIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AdminHeaderProps {
  title: string;
  description: string;
  backUrl?: string;
}

export function AdminHeader({
  title,
  description,
  backUrl = "/",
}: AdminHeaderProps) {
  const { user } = useAuth();

  return (
    <header className="bg-slate-950 text-white py-6 border-b border-[#c9a961]/20 sticky top-0 z-40">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={backUrl}
              className="p-2 bg-slate-800 hover:bg-[#c9a961] hover:text-slate-950 rounded-full transition-colors duration-300"
              title="Voltar"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-serif text-2xl font-bold flex items-center gap-2">
                {title === "Dashboard" && (
                  <Shield className="w-6 h-6 text-[#c9a961]" />
                )}
                {title}
              </h1>
              <p className="text-sm text-slate-400 font-sans mt-1">
                {description}
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 bg-slate-900 py-2 px-4 rounded-lg border border-slate-800">
            <div className="bg-[#1a4d7a] p-1.5 rounded-full">
              <UserIcon className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm">
              <p className="text-slate-400 text-xs">Admin Logado</p>
              <p className="font-semibold">{user?.name || "Administrador"}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
