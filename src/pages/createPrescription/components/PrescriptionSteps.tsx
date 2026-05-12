import { Chip, Grid, Paper, Stack, Typography } from '@mui/material'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MedicationIcon from '@mui/icons-material/Medication'
import PersonIcon from '@mui/icons-material/Person'

const steps = [
  { icon: <LocalHospitalIcon fontSize="small" />, label: 'Médico' },
  { icon: <PersonIcon fontSize="small" />, label: 'Paciente' },
  { icon: <MedicationIcon fontSize="small" />, label: 'Medicamentos' },
  { icon: <AssignmentTurnedInIcon fontSize="small" />, label: 'Revisão' },
]

/**
 * Trilha visual das etapas da emissão.
 *
 * Não controla navegação; é só um guia rápido para situar o médico dentro do
 * formulário.
 */
export const PrescriptionSteps = () => (
  <Paper variant="outlined" sx={{ borderRadius: 2, mb: 3, p: { xs: 1.5, sm: 2 } }}>
    <Grid container spacing={{ xs: 1, sm: 1.5 }}>
      {steps.map((step, index) => (
        <Grid key={step.label} size={{ xs: 6, md: 3 }}>
          <Stack direction="row" spacing={0.75} alignItems="center" sx={{ minWidth: 0 }}>
            <Chip label={index + 1} color="primary" size="small" />
            <Stack sx={{ color: 'primary.main', flex: '0 0 auto' }}>{step.icon}</Stack>
            <Typography variant="body2" fontWeight={700} noWrap>
              {step.label}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  </Paper>
)
