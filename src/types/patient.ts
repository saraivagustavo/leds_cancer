import type { ExamStatus } from './dashboard';

export type PatientStatus = 'ativo' | 'inativo';

export interface PatientExam {
  id: string;
  date: string;
  type: string;
  status: ExamStatus;
  radiologist: string;
}

export interface Patient {
  id: string;
  name: string;
  birthDate: string;       // dd/mm/yyyy
  age: number;
  cpf: string;
  phone: string;
  email: string;
  status: PatientStatus;
  lastExam: string | null; // dd/mm/yyyy
  totalExams: number;
  exams: PatientExam[];
}
