import { type IPrescription } from '@/features/prescription/types'

/**
 * Busca a mensagem de erro de um campo do formulário.
 *
 * Os blocos da receita recebem essa função para não precisarem conhecer o array
 * completo de erros.
 */
export type FieldErrorGetter = (fieldName: string) => string | undefined

/**
 * Atualiza um campo da receita em construção.
 *
 * Esse tipo mantém os subcomponentes alinhados com o contrato principal da
 * prescrição, sem cada seção criar seu próprio jeito de atualizar estado.
 */
export type PrescriptionFieldUpdater = (
  field: keyof IPrescription,
  value: IPrescription[keyof IPrescription]
) => void
