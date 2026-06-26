import type { ExamStatus } from '@/types/dashboard';
import type { PatientStatus } from '@/types/patient';

// ─── Status de exame (usado em 3+ componentes) ────────────────────────────────

export const EXAM_STATUS_CONFIG: Record<
  ExamStatus,
  { label: string; color: 'default' | 'primary' | 'warning' | 'success' | 'error' }
> = {
  pendente:   { label: 'Pendente',   color: 'warning' },
  em_analise: { label: 'Em Análise', color: 'primary' },
  concluido:  { label: 'Concluído',  color: 'success' },
  cancelado:  { label: 'Cancelado',  color: 'error'   },
};

// ─── Status de paciente ───────────────────────────────────────────────────────

export const PATIENT_STATUS_CONFIG: Record<
  PatientStatus,
  { label: string; color: 'success' | 'default' }
> = {
  ativo:   { label: 'Ativo',   color: 'success' },
  inativo: { label: 'Inativo', color: 'default' },
};

// ─── Role label ───────────────────────────────────────────────────────────────

export const ROLE_LABEL: Record<string, string> = {
  medico:        'Médico(a)',
  tecnico:       'Técnico(a)',
  administrador: 'Administrador(a)',
};
