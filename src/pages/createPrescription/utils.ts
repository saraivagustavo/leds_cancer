import { type IPrescription } from '@/features/prescription/types'

export const createInitialFormData = (doctorName = ''): Partial<IPrescription> => ({
  date: '',
  doctorName,
  medications: [],
  observations: '',
  patientName: '',
})
