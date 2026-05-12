import { type IPrescription } from '@/features/prescription/types';

/**
 * Erro de validação exibido junto ao campo da receita.
 *
 * O `field` aponta para o nome do campo no formulário; assim a UI consegue
 * mostrar a mensagem no lugar certo sem adivinhar nada.
 */
export interface ValidationError {
  field: keyof IPrescription | 'medications';
  message: string;
}

/**
 * Valida o mínimo necessário para emitir uma receita utilizável.
 *
 * Mantemos essa regra centralizada para a página não misturar fluxo de tela com
 * regra de negócio. Bem mais fácil de manter quando o formulário crescer.
 */
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
