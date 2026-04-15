import { useEffect, useState } from 'react';
import { type IPrescription } from '@/contracts/Prescription';
import { getPrescriptions } from './services';

export const usePatientPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<IPrescription[]>([]);

  useEffect(() => {
    setPrescriptions(getPrescriptions());
  }, []);

  return { prescriptions };
};
