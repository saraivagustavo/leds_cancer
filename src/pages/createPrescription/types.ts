import { type IPrescription } from '@/features/prescription/types'

export type FieldErrorGetter = (fieldName: string) => string | undefined

export type PrescriptionFieldUpdater = (
  field: keyof IPrescription,
  value: IPrescription[keyof IPrescription]
) => void
