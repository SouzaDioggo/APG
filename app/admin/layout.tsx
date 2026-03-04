"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { parse } from "path";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname(); // Descobre em qual tela do admin o usuário está
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Função para checar a permissão diretamente no carregamento
    const checkAuthorization = () => {
      const storedUser = localStorage.getItem("user");

      // 1. Se não estiver logado, manda pro login
      if (!storedUser) {
        router.push("/login");
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      // 2. Se for LEITOR, expulsa para a Home (não tem acesso a nada no /admin)
      if (parsedUser.type === "leitor" || parsedUser.type === "autor") {
        router.push("/");
        return;
      }
      setIsAuthorized(true);
    };

    checkAuthorization();
  }, [router, pathname]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#1a4d7a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
