import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import type { RecentExam } from '@/types/dashboard';
import type { PatientExam } from '@/types/patient';
import type { NewAnalysisFormData } from '@/types/analysis';
import { examService } from '@/services/examService';

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface ExamStats {
  todayPatients: number;
  pendingExams: number;
  monthlyDiagnostics: number;
  concludedToday: number;
}

interface ExamContextType {
  recentExams: RecentExam[];
  stats: ExamStats;
  isLoading: boolean;
  patientExams: Record<string, PatientExam[]>;
  submitExam: (form: NewAnalysisFormData, patientName: string) => Promise<void>;
  refreshExams: () => Promise<void>;
}

// ─── Valores iniciais ─────────────────────────────────────────────────────────

const EMPTY_STATS: ExamStats = {
  todayPatients: 0,
  pendingExams: 0,
  monthlyDiagnostics: 0,
  concludedToday: 0,
};

// ─── Context ──────────────────────────────────────────────────────────────────

const ExamContext = createContext<ExamContextType | null>(null);

export function useExams() {
  const ctx = useContext(ExamContext);
  if (!ctx) throw new Error('useExams must be used within ExamProvider');
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ExamProvider({ children }: { children: React.ReactNode }) {
  const [recentExams, setRecentExams] = useState<RecentExam[]>([]);
  const [stats, setStats] = useState<ExamStats>(EMPTY_STATS);
  const [patientExams, setPatientExams] = useState<Record<string, PatientExam[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  // ── Dashboard: exames recentes + stats ────────────────────────────────────

  const refreshExams = useCallback(async () => {
    setIsLoading(true);
    try {
      const [recent, dashStats] = await Promise.all([
        examService.recent(),
        examService.stats(),
      ]);
      setRecentExams(recent);
      setStats(dashStats);
    } catch {
      // silencia erro de rede — mantém estado anterior
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) refreshExams();
    else setIsLoading(false);
  }, [refreshExams]);

  // ── Submissão de novo exame ────────────────────────────────────────────────

  const submitExam = useCallback(
    async (form: NewAnalysisFormData, _patientName: string) => {
      const formData = new FormData();
      formData.append('patient', form.patientId);
      formData.append('exam_date', form.examDate);
      formData.append('technique', form.technique);
      formData.append('breast_side', form.breastSide);
      formData.append('clinical_history', form.clinicalHistory);
      formData.append('requesting_physician', form.requestingPhysician);
      if (form.imageFile) {
        formData.append('image_file', form.imageFile);
      }
      await examService.create(formData);
      await refreshExams();
    },
    [refreshExams],
  );

  // ── Carrega exames de um paciente (lazy, para o drawer de detalhes) ────────

  const loadPatientExams = useCallback(
    async (patientId: string) => {
      if (patientExams[patientId]) return;
      try {
        const data = await examService.list({ patient: patientId });
        setPatientExams((prev) => ({
          ...prev,
          [patientId]: data.map((e) => ({
            id: e.id,
            date: e.datetime.split(' ')[0],
            type: e.examType,
            status: e.status,
            radiologist: e.radiologist,
          })),
        }));
      } catch {
        // silencia
      }
    },
    [patientExams],
  );

  void loadPatientExams; // disponível para uso futuro via contexto

  return (
    <ExamContext.Provider
      value={{ recentExams, stats, isLoading, patientExams, submitExam, refreshExams }}
    >
      {children}
    </ExamContext.Provider>
  );
}
