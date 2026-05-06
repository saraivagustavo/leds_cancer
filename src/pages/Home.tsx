import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import DescriptionIcon from '@mui/icons-material/Description'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MedicationIcon from '@mui/icons-material/Medication'
import PersonIcon from '@mui/icons-material/Person'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useDoctorPrescriptions } from '@/features/prescription/hooks/useDoctorPrescriptions'
import { usePatientPrescriptions } from '@/features/prescription/hooks/usePatientPrescriptions'
import { type IPrescription } from '@/features/prescription/types'

const formatDate = (date?: string) => {
  if (!date) return 'Sem data'
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

const countMedications = (prescriptions: IPrescription[]) =>
  prescriptions.reduce((total, prescription) => total + prescription.medications.length, 0)

const recentPrescriptions = (prescriptions: IPrescription[]) => prescriptions.slice(0, 3)

const DashboardMetric = ({
  color = 'primary.main',
  icon,
  label,
  value,
}: {
  color?: string
  icon: ReactNode
  label: string
  value: string
}) => (
  <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, height: '100%' }}>
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box sx={{ color, display: 'flex' }}>{icon}</Box>
      <Box>
        <Typography variant="h5" fontWeight={800}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Stack>
  </Paper>
)

const RecentPrescriptionList = ({
  color = 'primary',
  emptyText,
  mode,
  prescriptions,
}: {
  color?: 'primary' | 'secondary'
  emptyText: string
  mode: 'doctor' | 'patient'
  prescriptions: IPrescription[]
}) => (
  <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, height: '100%' }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
      <Typography variant="h6" fontWeight={700}>
        Atividade recente
      </Typography>
      <Chip label={`${prescriptions.length} receitas`} size="small" color={color} variant="outlined" />
    </Stack>

    {prescriptions.length === 0 ? (
      <Box sx={{ py: 5, textAlign: 'center', color: 'text.secondary' }}>
        <DescriptionIcon sx={{ fontSize: 44, opacity: 0.35, mb: 1 }} />
        <Typography variant="body2">{emptyText}</Typography>
      </Box>
    ) : (
      <Stack divider={<Divider flexItem />} spacing={2}>
        {recentPrescriptions(prescriptions).map((prescription) => (
          <Stack key={prescription.id} spacing={0.75}>
            <Stack direction="row" justifyContent="space-between" gap={2}>
              <Typography fontWeight={700}>
                {mode === 'doctor'
                  ? prescription.patientName
                  : prescription.doctorName || 'Médico não informado'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(prescription.date)}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {prescription.medications.length} medicamento(s)
            </Typography>
          </Stack>
        ))}
      </Stack>
    )}
  </Paper>
)

const DoctorHome = ({ name }: { name?: string }) => {
  const { prescriptions } = useDoctorPrescriptions()
  const patientCount = new Set(prescriptions.map((prescription) => prescription.patientName)).size

  return (
    <Box>
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(13, 148, 136, 0.12)' : '#ecfdf5',
          borderRadius: 2,
          mb: 3,
          p: { xs: 3, md: 4 },
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent="space-between">
          <Box sx={{ maxWidth: 620 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <LocalHospitalIcon color="primary" />
              <Typography variant="overline" fontWeight={800} color="primary.dark">
                Painel médico
              </Typography>
            </Stack>
            <Typography variant="h3" fontWeight={800} color="primary.dark" gutterBottom>
              Olá, {name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Prescreva novas receitas, acompanhe pacientes atendidos e revise rapidamente o que já foi emitido.
            </Typography>
          </Box>

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
        </Stack>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardMetric icon={<AssignmentIcon />} label="Receitas emitidas" value={String(prescriptions.length)} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardMetric icon={<PersonIcon />} label="Pacientes atendidos" value={String(patientCount)} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardMetric icon={<MedicationIcon />} label="Medicamentos prescritos" value={String(countMedications(prescriptions))} />
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
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Fluxo de prescrição
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              {['Dados do médico', 'Dados do paciente', 'Medicações', 'Revisão e emissão'].map((step, index) => (
                <Stack key={step} direction="row" spacing={1.5} alignItems="center">
                  <Chip label={index + 1} color="primary" size="small" />
                  <Typography>{step}</Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

const PatientHome = ({ name }: { name?: string }) => {
  const { prescriptions } = usePatientPrescriptions()
  const latest = prescriptions[0]

  return (
    <Box>
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(219, 39, 119, 0.12)' : '#fdf2f8',
          borderRadius: 2,
          mb: 3,
          p: { xs: 3, md: 4 },
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent="space-between">
          <Box sx={{ maxWidth: 640 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <PersonIcon color="secondary" />
              <Typography variant="overline" fontWeight={800} color="secondary.dark">
                Painel do paciente
              </Typography>
            </Stack>
            <Typography variant="h3" fontWeight={800} color="secondary.dark" gutterBottom>
              Olá, {name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Veja suas receitas, confira medicamentos prescritos e acompanhe as orientações médicas em um só lugar.
            </Typography>
          </Box>

          <Button
            component={Link}
            to="/my-prescriptions"
            variant="contained"
            startIcon={<VisibilityIcon />}
            sx={{ alignSelf: { md: 'center' }, borderRadius: 2, bgcolor: 'secondary.dark' }}
          >
            Ver minhas receitas
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardMetric color="secondary.main" icon={<DescriptionIcon />} label="Receitas disponíveis" value={String(prescriptions.length)} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardMetric color="secondary.main" icon={<MedicationIcon />} label="Medicamentos listados" value={String(countMedications(prescriptions))} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardMetric color="secondary.main" icon={<CalendarTodayIcon />} label="Última atualização" value={latest ? formatDate(latest.date) : 'Sem data'} />
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
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Resumo de acompanhamento
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Use a lista de receitas para abrir os detalhes, revisar dosagens e consultar observações do médico.
            </Typography>
            <LinearProgress
              variant="determinate"
              value={prescriptions.length > 0 ? 100 : 18}
              sx={{ borderRadius: 999, height: 8, mb: 1.5 }}
            />
            <Typography variant="caption" color="text.secondary">
              {prescriptions.length > 0 ? 'Receitas prontas para consulta.' : 'Aguardando novas prescrições.'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export function Home() {
  const { user } = useAuth()

  if (user?.role === 'doctor') {
    return <DoctorHome name={user.name} />
  }

  return <PatientHome name={user?.name} />
}
