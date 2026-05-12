import { createContext, useContext, useState, type ReactNode } from 'react';

/**
 * Perfis que direcionam rotas, menus e linguagem da interface.
 */
export type UserRole = 'doctor' | 'patient';

/**
 * Usuário autenticado no protótipo.
 *
 * Mantemos enxuto porque a demo só precisa do nome e do papel da pessoa para
 * montar navegação e filtrar receitas.
 */
export interface AuthUser {
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Provider simples de autenticação em memória.
 *
 * Ele segura o usuário logado enquanto o app está aberto. A ideia aqui é deixar
 * o resto da interface conversar com `useAuth`, sem espalhar estado de login.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (user: AuthUser) => setUser(user);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Acesso seguro ao contexto de autenticação.
 *
 * Se alguém usar fora do `AuthProvider`, o erro aparece cedo e bem explicado.
 */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
