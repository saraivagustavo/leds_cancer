import { useDoctorPrescriptions } from '@/features/prescription/hooks/useDoctorPrescriptions'
import { usePatientPrescriptions } from '@/features/prescription/hooks/usePatientPrescriptions'
import { PrescriptionsList } from './components/PrescriptionsList'

/**
 * Página de histórico para o médico.
 */
export function DoctorPrescriptionsPage() {
  const { prescriptions } = useDoctorPrescriptions()

  return <PrescriptionsList mode="doctor" prescriptions={prescriptions} />
}

/**
 * Página de consulta para o paciente.
 */
export function PatientPrescriptionsPage() {
  const { prescriptions } = usePatientPrescriptions()

  return <PrescriptionsList mode="patient" prescriptions={prescriptions} />
}
