import { type IPrescription } from '@/features/prescription/types';

const STORAGE_KEY = 'myhealth:prescriptions';

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

export const getPrescriptions = (): IPrescription[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as IPrescription[]) : [];
};
