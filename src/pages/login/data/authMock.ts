import { type UserRole } from '@/contexts/AuthContext'

export const MOCK_USERS = [
  { username: 'dr.silva', password: '1234', name: 'Dr. Silva', role: 'doctor' as UserRole },
  { username: 'joao', password: '1234', name: 'Joao Paciente', role: 'patient' as UserRole },
]
