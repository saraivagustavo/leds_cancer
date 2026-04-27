import { useState } from 'react';
import { type IPrescription } from '@/features/prescription/types';
import { validatePrescription, type ValidationError } from '@/features/prescription/validation';
import { savePrescription } from '@/features/prescription/services';

export const usePrescription = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleSave = async (data: IPrescription) => {
    const validationErrors = validatePrescription(data);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setLoading(true);
    setErrors([]);
    try {
      await savePrescription(data);
      return true;
    } finally {
      setLoading(false);
    }
  };

  return { handleSave, loading, errors, setErrors };
};