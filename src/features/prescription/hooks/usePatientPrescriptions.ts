import { useEffect, useState } from 'react';
import { type IPrescription } from '@/features/prescription/types';
import { getPrescriptions } from '@/features/prescription/services';

export const usePatientPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<IPrescription[]>([]);

  useEffect(() => {
    setPrescriptions(getPrescriptions());
  }, []);

  return { prescriptions };
};
