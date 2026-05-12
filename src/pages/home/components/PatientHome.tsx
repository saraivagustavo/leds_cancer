import { Button, Grid, Typography } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import DescriptionIcon from '@mui/icons-material/Description'
import MedicationIcon from '@mui/icons-material/Medication'
import PersonIcon from '@mui/icons-material/Person'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Link } from 'react-router-dom'
import { MetricCard } from '@/components/MetricCard'
import { usePatientPrescriptions } from '@/features/prescription/hooks/usePatientPrescriptions'
import {
  countMedications,
  formatPrescriptionDate,
} from '@/features/prescription/utils'
import { FollowUpSummaryCard } from './FollowUpSummaryCard'
import { HomeHero } from './HomeHero'
import { RecentPrescriptionList } from './RecentPrescriptionList'

type PatientHomeProps = {
  name?: string
}

/**
 * Dashboard do paciente.
 *
 * Prioriza consulta rápida das receitas disponíveis e um resumo simples do
 * acompanhamento.
 */
export const PatientHome = ({ name }: PatientHomeProps) => {
  const { prescriptions } = usePatientPrescriptions()
  const latest = prescriptions[0]

  return (
    <>
      <HomeHero
        actions={
          <Button
            component={Link}
            to="/my-prescriptions"
            variant="contained"
            startIcon={<VisibilityIcon />}
            sx={{ alignSelf: { md: 'center' }, borderRadius: 2, bgcolor: 'secondary.dark' }}
          >
            Ver minhas receitas
          </Button>
        }
        icon={<PersonIcon color="secondary" />}
        mode="patient"
        title="Painel do paciente"
      >
        <Typography variant="h3" fontWeight={800} color="secondary.dark" gutterBottom>
          Olá, {name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Veja suas receitas, confira medicamentos prescritos e acompanhe as orientações médicas em um só lugar.
        </Typography>
      </HomeHero>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <MetricCard color="secondary.main" icon={<DescriptionIcon />} label="Receitas disponíveis" value={String(prescriptions.length)} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MetricCard color="secondary.main" icon={<MedicationIcon />} label="Medicamentos listados" value={String(countMedications(prescriptions))} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MetricCard color="secondary.main" icon={<CalendarTodayIcon />} label="Última atualização" value={latest ? formatPrescriptionDate(latest.date) : 'Sem data'} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <RecentPrescriptionList
            color="secondary"
            emptyText="Suas receitas aparecerão aqui quando forem emitidas."
            mode="patient"
            prescriptions={prescriptions}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <FollowUpSummaryCard prescriptionCount={prescriptions.length} />
        </Grid>
      </Grid>
    </>
  )
}
