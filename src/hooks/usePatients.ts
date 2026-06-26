import { useState, useEffect, useCallback } from 'react';
import type { Patient } from '@/types/patient';
import { patientService } from '@/services/patientService';

interface UsePatientsReturn {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function usePatients(): UsePatientsReturn {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await patientService.list();
      setPatients(data);
    } catch {
      setError('Não foi possível carregar os pacientes.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { patients, isLoading, error, refresh };
}
