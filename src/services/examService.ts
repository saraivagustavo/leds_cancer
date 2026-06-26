import { api } from './api';
import type { HistoryExam } from '@/types/history';
import type { RecentExam } from '@/types/dashboard';
import type { ExamStats } from '@/contexts/ExamContext';

// ─── Tipo que a API retorna (snake_case) ──────────────────────────────────────

interface ApiExam {
  id: number;
  patient_id: number;
  patient_name: string;
  datetime: string;
  exam_type: string;
  status: string;
  radiologist: string;
  breast_side?: string;
  requesting_physician?: string;
  clinical_history?: string;
}

interface ApiRecentExam {
  id: number;
  patient_name: string;
  datetime: string;
  exam_type: string;
  status: string;
}

interface ApiDashboardStats {
  today_patients: number;
  pending_exams: number;
  monthly_diagnostics: number;
  concluded_today: number;
}

// ─── Mappers ──────────────────────────────────────────────────────────────────

function mapExam(e: ApiExam): HistoryExam {
  return {
    id: String(e.id),
    patientId: String(e.patient_id),
    patientName: e.patient_name,
    datetime: e.datetime,
    examType: e.exam_type,
    status: e.status as HistoryExam['status'],
    radiologist: e.radiologist,
    breastSide: e.breast_side,
    requestingPhysician: e.requesting_physician,
    clinicalHistory: e.clinical_history,
  };
}

function mapRecentExam(e: ApiRecentExam): RecentExam {
  return {
    id: String(e.id),
    patientName: e.patient_name,
    datetime: e.datetime,
    examType: e.exam_type,
    status: e.status as RecentExam['status'],
  };
}

// ─── Service ─────────────────────────────────────────────────────────────────

export const examService = {
  list: async (params?: { search?: string; status?: string; patient?: string | number }) => {
    const { data } = await api.get<ApiExam[]>('/exams/', { params });
    return data.map(mapExam);
  },

  recent: async (limit = 20) => {
    const { data } = await api.get<ApiRecentExam[]>('/exams/recent/', { params: { limit } });
    return data.map(mapRecentExam);
  },

  getById: async (id: string | number) => {
    const { data } = await api.get<ApiExam>(`/exams/${id}/`);
    return mapExam(data);
  },

  stats: async (): Promise<ExamStats> => {
    const { data } = await api.get<ApiDashboardStats>('/dashboard/stats/');
    return {
      todayPatients: data.today_patients,
      pendingExams: data.pending_exams,
      monthlyDiagnostics: data.monthly_diagnostics,
      concludedToday: data.concluded_today,
    };
  },

  create: async (formData: FormData) => {
    const { data } = await api.post<ApiExam>('/exams/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return mapExam(data);
  },

  updateStatus: async (id: string | number, status: string) => {
    const { data } = await api.patch<ApiExam>(`/exams/${id}/`, { status });
    return mapExam(data);
  },

  remove: (id: string | number) => api.delete(`/exams/${id}/`),
};
