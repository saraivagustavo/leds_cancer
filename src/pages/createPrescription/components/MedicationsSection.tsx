import { Paper, Typography } from '@mui/material'
import MedicationIcon from '@mui/icons-material/Medication'
import { MedicationList } from '@/features/prescription/components/MedicationsList'
import { type IPrescription } from '@/features/prescription/types'
import {
  type FieldErrorGetter,
  type PrescriptionFieldUpdater,
} from '../types'
import { SectionHeader } from './SectionHeader'

type MedicationsSectionProps = {
  formData: Partial<IPrescription>
  getFieldError: FieldErrorGetter
  updateField: PrescriptionFieldUpdater
}

/**
 * Terceiro bloco da emissão: medicamentos prescritos.
 *
 * Delega a parte mais interativa para `MedicationList`, mas mantém a mensagem
 * de validação perto da seção para o médico entender o que falta.
 */
export const MedicationsSection = ({
  formData,
  getFieldError,
  updateField,
}: MedicationsSectionProps) => (
  <Paper variant="outlined" sx={{ borderRadius: 2, p: { xs: 2, sm: 3 } }}>
    <SectionHeader
      description="Adicione um ou mais medicamentos com dosagem e instruções de uso."
      icon={<MedicationIcon />}
      title="3. Medicamentos"
    />
    <MedicationList
      medications={formData.medications || []}
      onChange={(newMeds) => updateField('medications', newMeds)}
    />

    {getFieldError('medications') && (
      <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1 }}>
        {getFieldError('medications')}
      </Typography>
    )}
  </Paper>
)
