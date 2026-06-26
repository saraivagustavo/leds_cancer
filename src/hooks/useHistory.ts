import { useState, useEffect, useCallback } from 'react';
import type { HistoryExam } from '@/types/history';
import { examService } from '@/services/examService';

interface UseHistoryReturn {
  exams: HistoryExam[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useHistory(): UseHistoryReturn {
  const [exams, setExams] = useState<HistoryExam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await examService.list();
      setExams(data);
    } catch {
      setError('Não foi possível carregar o histórico de exames.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { exams, isLoading, error, refresh };
}
