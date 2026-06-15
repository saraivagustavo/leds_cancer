import { useState, useCallback, type ChangeEvent } from 'react';
import type { LoginFormData, RegisterFormData } from '@/types/auth';

// ─── Validadores individuais ──────────────────────────────────────────────────

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return 'E-mail é obrigatório.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'E-mail inválido.';
}

export function validateRequired(value: string, label: string): string | undefined {
  if (!value.trim()) return `${label} é obrigatório.`;
}

export function validatePassword(value: string): string | undefined {
  if (!value) return 'Senha é obrigatória.';
  if (value.length < 8) return 'A senha deve ter no mínimo 8 caracteres.';
}

export function validateConfirmPassword(
  password: string,
  confirm: string
): string | undefined {
  if (!confirm) return 'Confirmação de senha é obrigatória.';
  if (password !== confirm) return 'As senhas não coincidem.';
}

// ─── Hook de formulário de Login ──────────────────────────────────────────────

export function useLoginForm() {
  const [values, setValues] = useState<LoginFormData>({
    identifier: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (field: keyof LoginFormData) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setValues((prev: LoginFormData) => ({ ...prev, [field]: value }));
      setErrors((prev: Partial<Record<keyof LoginFormData, string>>) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof LoginFormData, string>> = {};
    newErrors.identifier =
      validateRequired(values.identifier, 'E-mail ou CRM') ??
      (!values.identifier.includes('@') ? undefined : validateEmail(values.identifier));
    newErrors.password = validatePassword(values.password);

    const filtered = Object.fromEntries(
      Object.entries(newErrors).filter(([, v]) => v !== undefined)
    ) as Partial<Record<keyof LoginFormData, string>>;

    setErrors(filtered);
    return Object.keys(filtered).length === 0;
  }, [values]);

  return { values, errors, isSubmitting, setIsSubmitting, handleChange, validate };
}

// ─── Hook de formulário de Registro ──────────────────────────────────────────

export function useRegisterForm() {
  const [values, setValues] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    crm: '',
    role: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (field: keyof RegisterFormData) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setValues((prev: RegisterFormData) => ({ ...prev, [field]: value }));
        setErrors((prev: Partial<Record<keyof RegisterFormData, string>>) => ({ ...prev, [field]: undefined }));
      },
    []
  );

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};
    newErrors.fullName = validateRequired(values.fullName, 'Nome completo');
    newErrors.email = validateEmail(values.email);
    newErrors.crm = validateRequired(values.crm, 'CRM / Identificação profissional');
    newErrors.role = validateRequired(values.role, 'Cargo / Função');
    newErrors.password = validatePassword(values.password);
    newErrors.confirmPassword = validateConfirmPassword(values.password, values.confirmPassword);

    const filtered = Object.fromEntries(
      Object.entries(newErrors).filter(([, v]) => v !== undefined)
    ) as Partial<Record<keyof RegisterFormData, string>>;

    setErrors(filtered);
    return Object.keys(filtered).length === 0;
  }, [values]);

  return { values, errors, isSubmitting, setIsSubmitting, handleChange, validate };
}
