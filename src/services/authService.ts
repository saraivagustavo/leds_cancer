import { api } from './api';

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface Physician {
  id: number;
  full_name: string;
  crm: string | null;
  role: string;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const authService = {
  listPhysicians: async (): Promise<Physician[]> => {
    const { data } = await api.get<Physician[]>('/auth/users/');
    return data;
  },
};
