import { useDoctorPrescriptions } from '@/features/prescription/hooks/useDoctorPrescriptions'
import { usePatientPrescriptions } from '@/features/prescription/hooks/usePatientPrescriptions'
import { PrescriptionsList } from './components/PrescriptionsList'

export function DoctorPrescriptionsPage() {
  const { prescriptions } = useDoctorPrescriptions()

  return <PrescriptionsList mode="doctor" prescriptions={prescriptions} />
}

export function PatientPrescriptionsPage() {
  const { prescriptions } = usePatientPrescriptions()

  return <PrescriptionsList mode="patient" prescriptions={prescriptions} />
}
