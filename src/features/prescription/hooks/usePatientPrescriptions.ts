import { useEffect, useState } from 'react';
import { type IPrescription } from '@/features/prescription/types';
import { getPrescriptions } from '@/features/prescription/services';

/**
 * Carrega as receitas disponíveis para a área do paciente.
 *
 * Por enquanto o protótipo mostra as receitas salvas localmente. Quando houver
 * autenticação real, esse hook é o ponto certo para filtrar por paciente.
 */
export const usePatientPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<IPrescription[]>([]);

  useEffect(() => {
    setPrescriptions(getPrescriptions());
  }, []);

  return { prescriptions };
};
