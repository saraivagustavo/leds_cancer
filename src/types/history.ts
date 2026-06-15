import type { ExamStatus } from './dashboard';

export interface HistoryExam {
  id: string;
  patientId: string;
  patientName: string;
  datetime: string;
  examType: string;
  status: ExamStatus;
  radiologist: string;
  breastSide?: string;
  requestingPhysician?: string;
  clinicalHistory?: string;
}
