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
  X,
  AlertTriangle,
  Info,
} from "lucide-react";
import { User } from "@/Interfaces/Interface-User";
import { useToast } from "@/hooks/use-toast";

export default function UsersAdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Estados dos Modais de Confirmação
  const [roleConfirmation, setRoleConfirmation] = useState<{
    id: number;
    newRole: "leitor" | "autor" | "admin";
    name: string;
  } | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    id: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    if (user === undefined) return;

    if (!user || user.type !== "admin") {
      router.push("/");
    } else {
      setIsAuthorized(true);
      loadUsers();
    }
  }, [user, router]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsersList(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar usuários.");
      toast({
        title: "Erro de Carregamento",
        description: "Não foi possível carregar a lista de usuários.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // --- Lógica de Mudança de Cargo ---
  const handleRoleChangeRequest = (
    id: number,
    name: string,
    newRole: "leitor" | "autor" | "admin",
  ) => {
    setRoleConfirmation({ id, name, newRole });
  };

  const confirmRoleChange = async () => {
    if (!roleConfirmation) return;

    try {
      setActionLoading(roleConfirmation.id);
      await changeUserType(roleConfirmation.id, roleConfirmation.newRole);
      setUsersList((prev) =>
        prev.map((u) =>
          u.id === roleConfirmation.id
            ? { ...u, type: roleConfirmation.newRole }
            : u,
        ),
      );
      // Toast ajustado com a mensagem de sucesso padrão
      toast({
        title: "Ação concluída com sucesso!",
        description: `O cargo de ${roleConfirmation.name} foi atualizado para ${roleConfirmation.newRole.toUpperCase()}.`,
      });
    } catch (err: any) {
      toast({
        title: "Erro na Atualização",
        description: err.message || "Erro ao alterar cargo do usuário.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
      setRoleConfirmation(null);
    }
  };

  // --- Lógica de Exclusão ---
  const handleDeleteRequest = (id: number, name: string) => {
    setDeleteConfirmation({ id, name });
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation) return;

    try {
      setActionLoading(deleteConfirmation.id);
      await deleteUser(deleteConfirmation.id);
      setUsersList((prev) =>
        prev.filter((u) => u.id !== deleteConfirmation.id),
      );
      // Toast ajustado com a mensagem de sucesso padrão
      toast({
        title: "Ação concluída com sucesso!",
        description: `O usuário ${deleteConfirmation.name} foi removido permanentemente do sistema.`,
      });
    } catch (err: any) {
      toast({
        title: "Erro na Exclusão",
        description: err.message || "Erro ao excluir usuário.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
      setDeleteConfirmation(null);
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
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50">
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
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 shadow-sm hover:border-[#c9a961] hover:text-[#c9a961] text-slate-600 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:cursor-pointer disabled:opacity-50 disabled:hover:scale-100 disabled:hover:cursor-not-allowed"
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
                  <tr className="bg-white text-slate-500 text-sm tracking-wider border-b border-slate-200">
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
                            <select
                              disabled={
                                actionLoading === u.id || u.id === user?.id
                              }
                              value={u.type}
                              onChange={(e) =>
                                handleRoleChangeRequest(
                                  u.id,
                                  u.name,
                                  e.target.value as any,
                                )
                              }
                              className="text-xs bg-white border border-slate-200 text-slate-600 rounded-md px-2 py-1.5 focus:outline-none focus:border-[#c9a961] disabled:opacity-50 cursor-pointer transition-colors"
                            >
                              <option value="leitor">Tornar Leitor</option>
                              <option value="autor">Tornar Autor</option>
                              <option value="admin">Tornar Admin</option>
                            </select>

                            <button
                              onClick={() => handleDeleteRequest(u.id, u.name)}
                              disabled={
                                actionLoading === u.id || u.id === user?.id
                              }
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-300 hover:scale-110 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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

      {/* Modal de Confirmação de Mudança de Cargo */}
      {roleConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h3 className="font-bold text-[#1a4d7a] flex items-center gap-2 text-lg">
                <Info className="w-5 h-5" /> Alterar Permissão
              </h3>
              <button
                onClick={() => setRoleConfirmation(null)}
                className="text-slate-400 hover:text-[#c9a961] transition-all duration-300 hover:scale-110 hover:cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <p className="text-slate-600 text-sm">
                Tem certeza que deseja alterar a permissão de{" "}
                <strong className="text-slate-800">
                  "{roleConfirmation.name}"
                </strong>{" "}
                para{" "}
                <strong className="text-[#1a4d7a] uppercase">
                  {roleConfirmation.newRole}
                </strong>
                ?
              </p>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setRoleConfirmation(null)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-[#c9a961] rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmRoleChange}
                  className="px-4 py-2 bg-[#1a4d7a] hover:bg-[#c9a961] text-white rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:cursor-pointer flex items-center gap-2"
                >
                  Confirmar Alteração
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h3 className="font-bold text-red-600 flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5" /> Excluir Usuário
              </h3>
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="text-slate-400 hover:text-red-600 transition-all duration-300 hover:scale-110 hover:cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <p className="text-slate-600 text-sm">
                Tem certeza que deseja excluir o usuário{" "}
                <strong className="text-slate-800">
                  "{deleteConfirmation.name}"
                </strong>
                ? Esta ação é irreversível e removerá todos os dados vinculados
                a esta conta.
              </p>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmation(null)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:cursor-pointer flex items-center gap-2"
                >
                  Sim, Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
