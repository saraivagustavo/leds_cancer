import { type ReactNode } from 'react'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import PersonIcon from '@mui/icons-material/Person'
import { type UserRole } from '@/contexts/AuthContext'

type LoginRoleConfig = {
  accent: string
  background: string
  darkBackground: string
  helper: string
  icon: ReactNode
  nextPath: string
  subtitle: string
  title: string
}

/**
 * Configuração do login por perfil.
 *
 * Troca textos, cores, ícones e rota de destino sem duplicar a tela de login.
 */
export const roleConfig: Record<UserRole, LoginRoleConfig> = {
  doctor: {
    title: 'Login médico',
    subtitle: 'Acesse para prescrever receitas e visualizar o histórico emitido.',
    icon: <LocalHospitalIcon color="primary" fontSize="large" />,
    background: 'linear-gradient(135deg, #e0f2fe 0%, #ecfdf5 100%)',
    darkBackground: 'linear-gradient(135deg, #0f2f3f 0%, #0b2f29 100%)',
    accent: '#0f766e',
    helper: 'Use dr.silva / 1234 para testar.',
    nextPath: '/dashboard',
  },
  patient: {
    title: 'Login paciente',
    subtitle: 'Acesse para visualizar as receitas prescritas para você.',
    icon: <PersonIcon color="secondary" fontSize="large" />,
    background: 'linear-gradient(135deg, #fdf2f8 0%, #eef2ff 100%)',
    darkBackground: 'linear-gradient(135deg, #3b1027 0%, #1f1b45 100%)',
    accent: '#be185d',
    helper: 'Use joao / 1234 para testar.',
    nextPath: '/my-prescriptions',
  },
}
