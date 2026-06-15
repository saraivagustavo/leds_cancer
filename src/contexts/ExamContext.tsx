import React, { createContext, useContext, useState, useCallback } from 'react';
import type { RecentExam } from '@/types/dashboard';
import type { PatientExam } from '@/types/patient';
import type { NewAnalysisFormData } from '@/types/analysis';
import { MOCK_PATIENTS } from '@/features/patients/data/mockPatients';

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
  // patientId → exams list (para o drawer de detalhes)
  patientExams: Record<string, PatientExam[]>;
  submitExam: (form: NewAnalysisFormData, patientName: string) => void;
}

// ─── Dados iniciais (os mocks existentes) ─────────────────────────────────────

const INITIAL_EXAMS: RecentExam[] = [
  { id: 'EX-001', patientName: 'Maria Silva Santos',  datetime: '15/06/2026 08:14', examType: 'Mamografia Digital', status: 'concluido'  },
  { id: 'EX-002', patientName: 'Ana Paula Ferreira',  datetime: '15/06/2026 09:02', examType: 'Mamografia 3D',      status: 'em_analise' },
  { id: 'EX-003', patientName: 'Carla Mendes Rocha',  datetime: '15/06/2026 09:45', examType: 'Mamografia Digital', status: 'pendente'   },
  { id: 'EX-004', patientName: 'Fernanda Costa Lima', datetime: '15/06/2026 10:30', examType: 'Mamografia 3D',      status: 'concluido'  },
  { id: 'EX-005', patientName: 'Juliana Alves Nunes', datetime: '15/06/2026 11:00', examType: 'Mamografia Digital', status: 'pendente'   },
  { id: 'EX-006', patientName: 'Patricia Gomes Dias', datetime: '15/06/2026 11:30', examType: 'Mamografia 3D',      status: 'cancelado'  },
];

const INITIAL_STATS: ExamStats = {
  todayPatients: 14,
  pendingExams: 5,
  monthlyDiagnostics: 187,
  concludedToday: 9,
};

// Inicializa o mapa de exames por paciente a partir dos dados mock
const buildInitialPatientExams = (): Record<string, PatientExam[]> =>
  Object.fromEntries(MOCK_PATIENTS.map((p) => [p.id, [...p.exams]]));

const TECHNIQUE_LABEL: Record<string, string> = {
  digital:         'Mamografia Digital',
  '3d_tomossintese': 'Mamografia 3D',
  contraste:       'Mamografia com Contraste',
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
  const [recentExams, setRecentExams] = useState<RecentExam[]>(INITIAL_EXAMS);
  const [stats, setStats] = useState<ExamStats>(INITIAL_STATS);
  const [patientExams, setPatientExams] = useState<Record<string, PatientExam[]>>(
    buildInitialPatientExams
  );

  const submitExam = useCallback((form: NewAnalysisFormData, patientName: string) => {
    const now = new Date();
    const datetime = now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const examId = `EX-${String(Date.now()).slice(-4)}`;
    const examType = TECHNIQUE_LABEL[form.technique] ?? 'Mamografia Digital';

    // 1. Adiciona na lista de exames recentes (mais recente primeiro)
    const newRecentExam: RecentExam = {
      id: examId,
      patientName,
      datetime,
      examType,
      status: 'pendente',
    };
    setRecentExams((prev) => [newRecentExam, ...prev]);

    // 2. Adiciona no histórico do paciente
    const newPatientExam: PatientExam = {
      id: examId,
      date: now.toLocaleDateString('pt-BR'),
      type: examType,
      status: 'pendente',
      radiologist: 'Aguardando atribuição',
    };
    setPatientExams((prev) => ({
      ...prev,
      [form.patientId]: [newPatientExam, ...(prev[form.patientId] ?? [])],
    }));

    // 3. Atualiza os contadores do dashboard
    setStats((prev) => ({
      ...prev,
      todayPatients: prev.todayPatients + 1,
      pendingExams:  prev.pendingExams + 1,
      monthlyDiagnostics: prev.monthlyDiagnostics + 1,
    }));
  }, []);

  return (
    <ExamContext.Provider value={{ recentExams, stats, patientExams, submitExam }}>
      {children}
    </ExamContext.Provider>
  );
}
