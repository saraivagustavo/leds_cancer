import { type IPrescription } from './types'

/**
 * Formata a data ISO do input (`yyyy-mm-dd`) para o jeitinho brasileiro.
 */
export const formatPrescriptionDate = (date?: string) => {
  if (!date) return 'Sem data'

  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

/**
 * Soma todos os medicamentos prescritos em uma lista de receitas.
 */
export const countMedications = (prescriptions: IPrescription[]) =>
  prescriptions.reduce((total, prescription) => total + prescription.medications.length, 0)

/**
 * Conta pessoas únicas dependendo da visão atual.
 *
 * Na visão médica, conta pacientes atendidos. Na visão do paciente, conta
 * médicos responsáveis pelas receitas disponíveis.
 */
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

/**
 * Entrega as receitas mais recentes para resumos de dashboard.
 */
export const recentPrescriptions = (prescriptions: IPrescription[]) =>
  prescriptions.slice(0, 3)
