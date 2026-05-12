import { Grid, Paper, TextField } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { type IPrescription } from '@/features/prescription/types'
import {
  type FieldErrorGetter,
  type PrescriptionFieldUpdater,
} from '../types'
import { SectionHeader } from './SectionHeader'

type PatientSectionProps = {
  formData: Partial<IPrescription>
  getFieldError: FieldErrorGetter
  updateField: PrescriptionFieldUpdater
}

/**
 * Segundo bloco da emissão: paciente e data do atendimento.
 */
export const PatientSection = ({
  formData,
  getFieldError,
  updateField,
}: PatientSectionProps) => (
  <Paper variant="outlined" sx={{ borderRadius: 2, p: { xs: 2, sm: 3 } }}>
    <SectionHeader
      description="Informe para quem a receita será emitida e a data do atendimento."
      icon={<PersonIcon />}
      title="2. Informações do paciente"
    />
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 8 }}>
        <TextField
          error={Boolean(getFieldError('patientName'))}
          fullWidth
          helperText={getFieldError('patientName')}
          label="Nome do paciente"
          onChange={(event) => updateField('patientName', event.target.value)}
          value={formData.patientName}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          error={Boolean(getFieldError('date'))}
          fullWidth
          helperText={getFieldError('date')}
          label="Data"
          onChange={(event) => updateField('date', event.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          type="date"
          value={formData.date || ''}
        />
      </Grid>
    </Grid>
  </Paper>
)
