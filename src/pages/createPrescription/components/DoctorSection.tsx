import { Paper, TextField } from '@mui/material'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import { type IPrescription } from '@/features/prescription/types'
import {
  type FieldErrorGetter,
  type PrescriptionFieldUpdater,
} from '../types'
import { SectionHeader } from './SectionHeader'

type DoctorSectionProps = {
  formData: Partial<IPrescription>
  getFieldError: FieldErrorGetter
  updateField: PrescriptionFieldUpdater
}

export const DoctorSection = ({
  formData,
  getFieldError,
  updateField,
}: DoctorSectionProps) => (
  <Paper variant="outlined" sx={{ borderRadius: 2, p: 3 }}>
    <SectionHeader
      description="Identifique o profissional responsável pela prescrição."
      icon={<LocalHospitalIcon />}
      title="1. Informações do médico"
    />
    <TextField
      disabled
      error={Boolean(getFieldError('doctorName'))}
      fullWidth
      helperText={getFieldError('doctorName') || 'Preenchido automaticamente pelo login.'}
      label="Nome do médico"
      onChange={(event) => updateField('doctorName', event.target.value)}
      value={formData.doctorName}
    />
  </Paper>
)
