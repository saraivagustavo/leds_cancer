import { useEffect, useState } from 'react';
import { type IPrescription } from '@/features/prescription/types';
import { getPrescriptions } from '@/features/prescription/services';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Busca as receitas emitidas pelo médico logado.
 *
 * Se não houver usuário no contexto, devolve tudo. Isso ajuda o app a continuar
 * funcionando em cenários de demo ou reload estranho durante desenvolvimento.
 */
export const useDoctorPrescriptions = () => {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState<IPrescription[]>([]);

  useEffect(() => {
    const all = getPrescriptions();
    const filtered = user?.name
      ? all.filter((p) => p.doctorName === user.name)
      : all;
    setPrescriptions(filtered);
  }, [user]);

  return { prescriptions };
};
