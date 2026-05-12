import { type IPrescription } from '@/features/prescription/types';

const STORAGE_KEY = 'myhealth:prescriptions';

/**
 * Salva uma receita no armazenamento local do navegador.
 *
 * Hoje isso simula uma API com `setTimeout`, então a tela já trabalha como se
 * existisse uma chamada assíncrona de verdade. Quando entrar backend, esse é um
 * dos pontos mais tranquilos para trocar.
 */
export const savePrescription = async (prescription: IPrescription): Promise<void> => {
  console.log('Dados validados pelo contrato:', prescription);

  return new Promise((resolve) => {
    setTimeout(() => {
      const existing = getPrescriptions();
      const withId = { ...prescription, id: crypto.randomUUID() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, withId]));
      resolve();
    }, 1000);
  });
};

/**
 * Recupera todas as receitas emitidas neste navegador.
 *
 * O app ainda usa `localStorage`, então os dados são locais e servem bem para o
 * fluxo de demonstração/protótipo.
 */
export const getPrescriptions = (): IPrescription[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as IPrescription[]) : [];
};
