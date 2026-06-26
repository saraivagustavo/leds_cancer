// ─── Datas ────────────────────────────────────────────────────────────────────

/** "dd/MM/yyyy" → "yyyy-MM-dd" (para input type="date") */
export function brDateToIso(br: string): string {
  if (!br) return '';
  const [d, m, y] = br.split('/');
  return `${y}-${m}-${d}`;
}

/** "yyyy-MM-dd" → "dd/MM/yyyy" (para exibição e API) */
export function isoDateToBr(iso: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

/** Formata data BR para exibição amigável. Ex: "15/06/2026" → "15 de junho de 2026" */
export function formatDateLong(br: string): string {
  if (!br) return '—';
  const [d, m, y] = br.split('/').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
}

/** Parseia "dd/MM/yyyy" ou "dd/MM/yyyy HH:mm" para Date */
export function parseBrDate(str: string): Date {
  const [datePart, timePart] = str.split(' ');
  const [d, m, y] = datePart.split('/').map(Number);
  if (timePart) {
    const [h, min] = timePart.split(':').map(Number);
    return new Date(y, m - 1, d, h, min);
  }
  return new Date(y, m - 1, d);
}

// ─── CPF ──────────────────────────────────────────────────────────────────────

/** Aplica máscara de CPF. "12345678900" → "123.456.789-00" */
export function formatCpf(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

/** Remove máscara do CPF. "123.456.789-00" → "12345678900" */
export function unformatCpf(value: string): string {
  return value.replace(/\D/g, '');
}

// ─── Telefone ─────────────────────────────────────────────────────────────────

/** Aplica máscara de telefone. "11987654321" → "(11) 98765-4321" */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}
