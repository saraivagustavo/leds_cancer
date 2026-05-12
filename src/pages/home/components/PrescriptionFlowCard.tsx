import { Chip, Paper, Stack, Typography } from '@mui/material'

const prescriptionSteps = [
  'Dados do médico',
  'Dados do paciente',
  'Medicações',
  'Revisão e emissão',
]

/**
 * Card explicando o fluxo básico de emissão.
 *
 * Serve como lembrete rápido para o médico, principalmente quando ele acabou de
 * entrar no sistema.
 */
export const PrescriptionFlowCard = () => (
  <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, height: '100%' }}>
    <Typography variant="h6" fontWeight={700} gutterBottom>
      Fluxo de prescrição
    </Typography>
    <Stack spacing={2} sx={{ mt: 2 }}>
      {prescriptionSteps.map((step, index) => (
        <Stack key={step} direction="row" spacing={1.5} alignItems="center">
          <Chip label={index + 1} color="primary" size="small" />
          <Typography>{step}</Typography>
        </Stack>
      ))}
    </Stack>
  </Paper>
)
