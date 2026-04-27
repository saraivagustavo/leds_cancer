import { useEffect, useState } from 'react';
import { type IPrescription } from '@/features/prescription/types';
import { getPrescriptions } from '@/features/prescription/services';
import { useAuth } from '@/contexts/AuthContext';

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
