import { Divider, Grid, Paper, TextField, Typography } from '@mui/material'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import { type IPrescription } from '@/features/prescription/types'
import { type PrescriptionFieldUpdater } from '../types'
import { SectionHeader } from './SectionHeader'

type ReviewSectionProps = {
  formData: Partial<IPrescription>
  updateField: PrescriptionFieldUpdater
}

/**
 * Último bloco antes de finalizar a receita.
 *
 * Mostra um resumo rápido do que já foi preenchido e libera observações extras
 * para algum detalhe clínico que não cabe nos medicamentos.
 */
export const ReviewSection = ({
  formData,
  updateField,
}: ReviewSectionProps) => (
  <Paper variant="outlined" sx={{ borderRadius: 2, p: { xs: 2, sm: 3 } }}>
    <SectionHeader
      description="Revise os dados e registre observações complementares antes de finalizar."
      icon={<AssignmentTurnedInIcon />}
      title="4. Revisão e observações"
    />
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="caption" color="text.secondary">
          Médico
        </Typography>
        <Typography fontWeight={700} sx={{ overflowWrap: 'anywhere' }}>{formData.doctorName || 'Não informado'}</Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="caption" color="text.secondary">
          Paciente
        </Typography>
        <Typography fontWeight={700} sx={{ overflowWrap: 'anywhere' }}>{formData.patientName || 'Não informado'}</Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="caption" color="text.secondary">
          Medicamentos
        </Typography>
        <Typography fontWeight={700}>{formData.medications?.length || 0}</Typography>
      </Grid>
    </Grid>

    <Divider sx={{ mb: 3 }} />

    <TextField
      fullWidth
      label="Observações"
      multiline
      onChange={(event) => updateField('observations', event.target.value)}
      rows={3}
      value={formData.observations}
    />
  </Paper>
)
