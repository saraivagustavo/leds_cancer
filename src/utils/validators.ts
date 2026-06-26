import { unformatCpf } from './formatters';

// ─── Primitivos ───────────────────────────────────────────────────────────────

export function validateRequired(value: string, label: string): string | undefined {
  if (!value.trim()) return `${label} é obrigatório.`;
}

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return 'E-mail é obrigatório.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'E-mail inválido.';
}

export function validatePassword(value: string): string | undefined {
  if (!value) return 'Senha é obrigatória.';
  if (value.length < 8) return 'A senha deve ter no mínimo 8 caracteres.';
}

export function validateConfirmPassword(password: string, confirm: string): string | undefined {
  if (!confirm) return 'Confirmação de senha é obrigatória.';
  if (password !== confirm) return 'As senhas não coincidem.';
}

// ─── CPF ──────────────────────────────────────────────────────────────────────

/** Valida CPF com dígitos verificadores. */
export function validateCpf(value: string): string | undefined {
  const digits = unformatCpf(value);
  if (!digits) return 'CPF é obrigatório.';
  if (digits.length !== 11) return 'CPF deve ter 11 dígitos.';
  // Rejeita sequências iguais (111.111.111-11, etc.)
  if (/^(\d)\1+$/.test(digits)) return 'CPF inválido.';

  const calc = (len: number) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(digits[i]) * (len + 1 - i);
    const rem = (sum * 10) % 11;
    return rem === 10 || rem === 11 ? 0 : rem;
  };
  if (calc(9) !== Number(digits[9]) || calc(10) !== Number(digits[10])) return 'CPF inválido.';
}

// ─── Telefone ─────────────────────────────────────────────────────────────────

export function validatePhone(value: string): string | undefined {
  if (!value) return; // opcional
  const digits = value.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 11) return 'Telefone inválido.';
}
