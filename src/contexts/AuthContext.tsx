import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { User, LoginFormData, RegisterFormData } from '@/types/auth';
import { api } from '@/services/api';

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<Pick<User, 'fullName' | 'email' | 'crm'>>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

// ─── Helpers de token ─────────────────────────────────────────────────────────

function saveTokens(access: string, refresh: string) {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
}

function clearTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ao montar, recupera o usuário logado caso ainda haja token válido
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    api
      .get<ApiUser>('/auth/me/')
      .then(({ data }) => setUser(mapUser(data)))
      .catch(() => clearTokens())
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (data: LoginFormData) => {
    const response = await api.post<{
      access: string;
      refresh: string;
      user: ApiUser;
    }>('/auth/token/', {
      identifier: data.identifier,
      password: data.password,
    });

    saveTokens(response.data.access, response.data.refresh);
    setUser(mapUser(response.data.user));
  }, []);

  const register = useCallback(async (data: RegisterFormData) => {
    await api.post('/auth/register/', {
      full_name: data.fullName,
      email: data.email,
      crm: data.crm,
      role: data.role,
      password: data.password,
      confirm_password: data.confirmPassword,
    });
    // Cadastro realizado — aguarda aprovação do admin, não faz login automático
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
  }, []);

  const updateUser = useCallback(
    (data: Partial<Pick<User, 'fullName' | 'email' | 'crm'>>) => {
      setUser((prev) => (prev ? { ...prev, ...data } : prev));
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Mapeamento API → tipo do frontend ────────────────────────────────────────

interface ApiUser {
  id: number | string;
  full_name: string;
  email: string;
  crm: string | null;
  role: string;
}

function mapUser(apiUser: ApiUser): User {
  return {
    id: String(apiUser.id),
    fullName: apiUser.full_name,
    email: apiUser.email,
    crm: apiUser.crm ?? '',
    role: apiUser.role as User['role'],
  };
}
