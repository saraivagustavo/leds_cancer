export type BreastSide = 'esquerda' | 'direita' | 'bilateral';
export type ExamTechnique = 'digital' | '3d_tomossintese' | 'contraste';
export type BiradCategory = '0' | '1' | '2' | '3' | '4a' | '4b' | '4c' | '5' | '6';

export interface NewAnalysisFormData {
  // Step 1 — Paciente
  patientId: string;

  // Step 2 — Imagem
  imageFile: File | null;
  imagePreviewUrl: string | null;

  // Step 3 — Dados do exame
  examDate: string;
  technique: ExamTechnique | '';
  breastSide: BreastSide | '';
  clinicalHistory: string;
  requestingPhysician: string;
}

export type NewAnalysisStep = 0 | 1 | 2;
