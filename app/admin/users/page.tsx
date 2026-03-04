"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getAllUsers, changeUserType, deleteUser } from "@/lib/api";
import { AdminHeader } from "@/components/admin/admin-header";
import {
  Users,
  ShieldAlert,
  Trash2,
  RefreshCw,
  Shield,
  User as UserIcon,
  Edit3,
} from "lucide-react";
import { User } from "@/Interfaces/Interface-User";

export default function UsersAdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsersList(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar usuários.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (
    id: number,
    newRole: "leitor" | "autor" | "admin",
  ) => {
    if (
      !confirm(
        `Tem certeza que deseja alterar a permissão deste usuário para ${newRole.toUpperCase()}?`,
      )
    )
      return;

    try {
      setActionLoading(id);
      await changeUserType(id, newRole);
      // Atualiza a lista localmente para não precisar fazer outro GET
      setUsersList((prev) =>
        prev.map((u) => (u.id === id ? { ...u, type: newRole } : u)),
      );
    } catch (err: any) {
      alert(err.message || "Erro ao alterar cargo do usuário.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (
      !confirm(
        "CUIDADO! Tem certeza que deseja excluir este usuário permanentemente?",
      )
    )
      return;

    try {
      setActionLoading(id);
      await deleteUser(id);
      setUsersList((prev) => prev.filter((u) => u.id !== id));
    } catch (err: any) {
      alert(err.message || "Erro ao excluir usuário.");
      setActionLoading(null); // Só limpa se der erro, pois se der sucesso ele some da lista
    }
  };
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#1a4d7a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <AdminHeader
        title="Gestão de Usuários"
        description="Controle os acessos e permissões dos usuários cadastrados na plataforma."
        backUrl="/admin"
      />
      <main className="container mx-auto px-6 mt-8 animate-fade-in-up">
        {/* Painel de Gestão de Usuários */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#1a4d7a] flex items-center gap-2">
                <Users className="w-5 h-5" />
                Usuários Cadastrados
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Gerencie permissões de Leitor, Autor e Administrador.
              </p>
            </div>

            <button
              onClick={loadUsers}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Atualizar Lista
            </button>
          </div>

          {error ? (
            <div className="p-8 text-center">
              <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                    <th className="px-6 py-4 font-medium">ID</th>
                    <th className="px-6 py-4 font-medium">Usuário</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Cargo Atual</th>
                    <th className="px-6 py-4 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {loading && usersList.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-slate-400"
                      >
                        Carregando usuários...
                      </td>
                    </tr>
                  ) : usersList.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-slate-400"
                      >
                        Nenhum usuário encontrado.
                      </td>
                    </tr>
                  ) : (
                    usersList.map((u) => (
                      <tr
                        key={u.id}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="px-6 py-4 text-slate-400 font-mono">
                          #{u.id}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-700">
                          {u.name}
                          {!u.isVerified && (
                            <span className="ml-2 text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold uppercase">
                              Pendente
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-slate-500">{u.email}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase
                            ${u.type === "admin" ? "bg-red-100 text-red-700" : ""}
                            ${u.type === "autor" ? "bg-[#c9a961]/20 text-[#967d45]" : ""}
                            ${u.type === "leitor" ? "bg-slate-100 text-slate-600" : ""}
                          `}
                          >
                            {u.type === "admin" && (
                              <Shield className="w-3 h-3" />
                            )}
                            {u.type === "autor" && (
                              <Edit3 className="w-3 h-3" />
                            )}
                            {u.type === "leitor" && (
                              <UserIcon className="w-3 h-3" />
                            )}
                            {u.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            {/* Controle de Nível de Acesso (Select disfarçado de botão) */}
                            <select
                              disabled={
                                actionLoading === u.id || u.id === user?.id
                              } // Não deixa o admin tirar o próprio cargo acidentalmente
                              value={u.type}
                              onChange={(e) =>
                                handleRoleChange(u.id, e.target.value as any)
                              }
                              className="text-xs bg-white border border-slate-200 text-slate-600 rounded-md px-2 py-1.5 focus:outline-none focus:border-[#1a4d7a] disabled:opacity-50 cursor-pointer"
                            >
                              <option value="leitor">Tornar Leitor</option>
                              <option value="autor">Tornar Autor</option>
                              <option value="admin">Tornar Admin</option>
                            </select>

                            {/* Botão de Excluir */}
                            <button
                              onClick={() => handleDelete(u.id)}
                              disabled={
                                actionLoading === u.id || u.id === user?.id
                              }
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Excluir Usuário"
                            >
                              {actionLoading === u.id ? (
                                <RefreshCw className="w-4 h-4 animate-spin text-slate-400" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
