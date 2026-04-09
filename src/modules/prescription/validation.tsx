import { type IPrescription } from '../../contracts/Prescription';

export interface ValidationError {
  field: keyof IPrescription | 'medications';
  message: string;
}

export const validatePrescription = (data: Partial<IPrescription>): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.patientName?.trim()) {
    errors.push({ field: 'patientName', message: 'O nome do paciente é obrigatório.' });
  }

  if (!data.date) {
    errors.push({ field: 'date', message: 'A data é obrigatória.' });
  }

  if (!data.medications || data.medications.length === 0) {
    errors.push({ field: 'medications', message: 'Adicione pelo menos um medicamento.' });
  }

  return errors;
};