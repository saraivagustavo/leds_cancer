import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User, LoginFormData, RegisterFormData } from '@/types/auth';

// ─── Usuário mockado para testes ──────────────────────────────────────────────
const MOCK_USER: User = {
  id: '1',
  fullName: 'Dr. Carlos Mendes',
  email: 'dr.carlos@mammoai.com',
  crm: 'CRM/SP 123456',
  role: 'medico',
};

const MOCK_CREDENTIALS = {
  identifier: 'dr.carlos@mammoai.com', // ou use o CRM: CRM/SP 123456
  password: 'senha123',
};

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
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

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (data: LoginFormData) => {
    // Simula latência de rede
    await new Promise((resolve) => setTimeout(resolve, 800));

    const identifierMatch =
      data.identifier === MOCK_CREDENTIALS.identifier ||
      data.identifier === MOCK_USER.crm;
    const passwordMatch = data.password === MOCK_CREDENTIALS.password;

    if (!identifierMatch || !passwordMatch) {
      throw new Error('Credenciais inválidas.');
    }

    setUser(MOCK_USER);
    // TODO: substituir por await api.post('/auth/login', data) e salvar token
  }, []);

  const register = useCallback(async (_data: RegisterFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    // TODO: await api.post('/auth/register', _data)
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateUser = useCallback((data: Partial<Pick<User, 'fullName' | 'email' | 'crm'>>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
