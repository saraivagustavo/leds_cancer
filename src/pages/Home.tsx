import { useAuth } from '@/contexts/AuthContext'
import { DoctorHome } from './home/components/DoctorHome'
import { PatientHome } from './home/components/PatientHome'

export function Home() {
  const { user } = useAuth()

  if (user?.role === 'doctor') {
    return <DoctorHome name={user.name} />
  }

  return <PatientHome name={user?.name} />
}
