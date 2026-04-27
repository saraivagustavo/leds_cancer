export interface IMedication {
  id: string;
  name: string;
  dosage: string;
  instructions: string;
}

export interface IPrescription {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  date: string;
  medications: IMedication[];
  observations: string;
}