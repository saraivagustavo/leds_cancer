import { useState, useEffect } from 'react';
import { authService, type Physician } from '@/services/authService';

interface UsePhysiciansReturn {
  physicians: Physician[];
  isLoading: boolean;
}

export function usePhysicians(): UsePhysiciansReturn {
  const [physicians, setPhysicians] = useState<Physician[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authService
      .listPhysicians()
      .then(setPhysicians)
      .catch(() => setPhysicians([]))
      .finally(() => setIsLoading(false));
  }, []);

  return { physicians, isLoading };
}
