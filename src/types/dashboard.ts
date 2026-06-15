export type ExamStatus = 'pendente' | 'em_analise' | 'concluido' | 'cancelado';

export interface StatCardData {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  color: 'primary' | 'secondary' | 'warning' | 'success' | 'error';
}

export interface RecentExam {
  id: string;
  patientName: string;
  datetime: string;
  examType: string;
  status: ExamStatus;
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
}
