import { type IPrescription } from '@/features/prescription/types'

/**
 * Estado inicial do formulário de receita.
 *
 * Recebe o nome do médico logado para já abrir a tela com esse campo preenchido
 * e evitar retrabalho para quem está prescrevendo.
 */
export const createInitialFormData = (doctorName = ''): Partial<IPrescription> => ({
  date: '',
  doctorName,
  medications: [],
  observations: '',
  patientName: '',
})
