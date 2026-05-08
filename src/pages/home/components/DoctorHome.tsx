import { Button, Grid, Stack, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import AssignmentIcon from '@mui/icons-material/Assignment'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MedicationIcon from '@mui/icons-material/Medication'
import PersonIcon from '@mui/icons-material/Person'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Link } from 'react-router-dom'
import { MetricCard } from '@/components/MetricCard'
import { useDoctorPrescriptions } from '@/features/prescription/hooks/useDoctorPrescriptions'
import { countMedications } from '@/features/prescription/utils'
import { HomeHero } from './HomeHero'
import { PrescriptionFlowCard } from './PrescriptionFlowCard'
import { RecentPrescriptionList } from './RecentPrescriptionList'

type DoctorHomeProps = {
  name?: string
}

export const DoctorHome = ({ name }: DoctorHomeProps) => {
  const { prescriptions } = useDoctorPrescriptions()
  const patientCount = new Set(prescriptions.map((prescription) => prescription.patientName)).size

  return (
    <>
      <HomeHero
        actions={
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button
              component={Link}
              to="/prescription"
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{ alignSelf: { md: 'center' }, borderRadius: 2 }}
            >
              Nova receita
            </Button>
            <Button
              component={Link}
              to="/doctor/prescriptions"
              variant="outlined"
              startIcon={<VisibilityIcon />}
              sx={{ alignSelf: { md: 'center' }, borderRadius: 2 }}
            >
              Receitas emitidas
            </Button>
          </Stack>
        }
        icon={<LocalHospitalIcon color="primary" />}
        mode="doctor"
        title="Painel médico"
      >
        <Typography variant="h3" fontWeight={800} color="primary.dark" gutterBottom>
          Olá, {name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Prescreva novas receitas, acompanhe pacientes atendidos e revise rapidamente o que já foi emitido.
        </Typography>
      </HomeHero>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <MetricCard icon={<AssignmentIcon />} label="Receitas emitidas" value={String(prescriptions.length)} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MetricCard icon={<PersonIcon />} label="Pacientes atendidos" value={String(patientCount)} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MetricCard icon={<MedicationIcon />} label="Medicamentos prescritos" value={String(countMedications(prescriptions))} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <RecentPrescriptionList
            emptyText="As receitas que você emitir aparecerão aqui."
            mode="doctor"
            prescriptions={prescriptions}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <PrescriptionFlowCard />
        </Grid>
      </Grid>
    </>
  )
}
