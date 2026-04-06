import { type IPrescription } from '@/contracts/Prescription';

// Simula o salvamento de uma receita no banco de dados
export const savePrescription = async (prescription: IPrescription): Promise<void> => {
  console.log('Dados validados pelo contrato:', prescription);
  
  // Aqui no futuro você usaria fetch ou axios para enviar ao backend
  return new Promise((resolve) => {
    setTimeout(() => {
      alert(`Receita para ${prescription.patientName} gerada com sucesso!`);
      resolve();
    }, 1000);
  });
};