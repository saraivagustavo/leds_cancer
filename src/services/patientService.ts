import { api } from './api';
import type { Patient, PatientExam } from '@/types/patient';
import type { ExamStatus } from '@/types/dashboard';

// ─── Tipo que a API retorna ──────────────────────────────────────

interface ApiPatient {
  id: number;
  name: string;
  birth_date: string;   // dd/MM/yyyy
  age: number;
  cpf: string;
  phone: string;
  email: string;
  status: string;
  last_exam: string | null;
  total_exams: number;
  exams?: ApiPatientExam[];
}

interface ApiPatientExam {
  id: number | string;
  date: string;
  type: string;
  status: string;
  radiologist: string;
}

// ─── Mapper ───────────────────────────────────────────────────────────────────

function mapPatient(p: ApiPatient): Patient {
  return {
    id: String(p.id),
    name: p.name,
    birthDate: p.birth_date,
    age: p.age,
    cpf: p.cpf,
    phone: p.phone,
    email: p.email,
    status: p.status as Patient['status'],
    lastExam: p.last_exam,
    totalExams: p.total_exams,
    exams: (p.exams ?? []).map((e) => ({
      id: String(e.id),
      date: e.date,
      type: e.type,
      status: e.status as ExamStatus,
      radiologist: e.radiologist,
    } satisfies PatientExam)),
  };
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const patientService = {
  list: async (search?: string): Promise<Patient[]> => {
    const { data } = await api.get<ApiPatient[]>('/patients/', {
      params: search ? { search } : {},
    });
    return data.map(mapPatient);
  },

  getById: async (id: string): Promise<Patient> => {
    const { data } = await api.get<ApiPatient>(`/patients/${id}/`);
    return mapPatient(data);
  },

  create: (data: Record<string, unknown>) =>
    api.post<ApiPatient>('/patients/', data),

  update: (id: string, data: Record<string, unknown>) =>
    api.patch<ApiPatient>(`/patients/${id}/`, data),

  remove: (id: string) =>
    api.delete(`/patients/${id}/`),
};
