import { type IPrescription } from './types'

export const formatPrescriptionDate = (date?: string) => {
  if (!date) return 'Sem data'

  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

export const countMedications = (prescriptions: IPrescription[]) =>
  prescriptions.reduce((total, prescription) => total + prescription.medications.length, 0)

export const countPeople = (
  prescriptions: IPrescription[],
  mode: 'doctor' | 'patient'
) => {
  const names = prescriptions.map((prescription) =>
    mode === 'doctor'
      ? prescription.patientName
      : prescription.doctorName || 'Médico não informado'
  )

  return new Set(names).size
}

export const recentPrescriptions = (prescriptions: IPrescription[]) =>
  prescriptions.slice(0, 3)
