import { useAuth } from '@/contexts/AuthContext'
import { DoctorHome } from './home/components/DoctorHome'
import { PatientHome } from './home/components/PatientHome'

/**
 * Dashboard inicial depois do login.
 *
 * Ele escolhe a experiência certa para o perfil atual: médico vê criação e
 * histórico; paciente vê acompanhamento das próprias receitas.
 */
export function Home() {
  const { user } = useAuth()

  if (user?.role === 'doctor') {
    return <DoctorHome name={user.name} />
  }

  return <PatientHome name={user?.name} />
}
