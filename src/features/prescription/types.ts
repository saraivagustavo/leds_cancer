/**
 * Representa um medicamento dentro da receita.
 *
 * Guarda só o que o médico precisa informar para o paciente entender o uso:
 * nome, dosagem e instruções. O `id` existe para a interface conseguir editar
 * e remover itens sem depender do texto digitado.
 */
export interface IMedication {
  id: string;
  name: string;
  dosage: string;
  instructions: string;
}

/**
 * Contrato principal da receita digital.
 *
 * Esse tipo é a fonte da verdade entre criação, listagem, validação e
 * persistência local. Se a receita ganhar novos campos, normalmente é aqui que
 * a conversa começa.
 */
export interface IPrescription {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  date: string;
  medications: IMedication[];
  observations: string;
}
