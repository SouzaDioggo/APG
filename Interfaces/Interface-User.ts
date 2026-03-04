export interface User {
  id: number;
  name: string;
  email: string;
  type: "leitor" | "autor" | "admin";
  isVerified: boolean;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}
