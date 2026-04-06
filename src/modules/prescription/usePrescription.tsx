import { useState } from 'react';
import { type IPrescription } from '@/contracts/Prescription';
import { savePrescription } from '@/modules/prescription/services';

export const usePrescription = () => {
  const [loading, setLoading] = useState(false);

  const handleSave = async (data: IPrescription) => {
    setLoading(true);
    try {
      await savePrescription(data);
    } finally {
      setLoading(false);
    }
  };

  return { handleSave, loading };
};