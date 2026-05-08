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

export const PrescriptionSteps = () => (
  <Paper variant="outlined" sx={{ borderRadius: 2, mb: 3, p: 2 }}>
    <Grid container spacing={1.5}>
      {steps.map((step, index) => (
        <Grid key={step.label} size={{ xs: 6, md: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip label={index + 1} color="primary" size="small" />
            <Stack sx={{ color: 'primary.main' }}>{step.icon}</Stack>
            <Typography variant="body2" fontWeight={700}>
              {step.label}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  </Paper>
)
