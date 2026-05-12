import { type UserRole } from '@/contexts/AuthContext'

/**
 * Usuários fake para testar o fluxo sem backend.
 *
 * Está explícito de propósito: facilita abrir o projeto e entrar sem procurar
 * credencial em outro canto.
 */
export const MOCK_USERS = [
  { username: 'dr.silva', password: '1234', name: 'Dr. Silva', role: 'doctor' as UserRole },
  { username: 'joao', password: '1234', name: 'Joao Paciente', role: 'patient' as UserRole },
]
