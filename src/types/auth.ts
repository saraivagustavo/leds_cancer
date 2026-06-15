export type UserRole = 'medico' | 'tecnico' | 'administrador';

export interface User {
  id: string;
  fullName: string;
  email: string;
  crm: string;
  role: UserRole;
}

export interface LoginFormData {
  identifier: string; // e-mail ou CRM
  password: string;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  crm: string;
  role: UserRole | '';
  password: string;
  confirmPassword: string;
}

export interface FormErrors<T> {
  [K: string]: string | undefined;
}
