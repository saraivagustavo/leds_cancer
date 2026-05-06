import { useState, type ReactNode } from 'react'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import DescriptionIcon from '@mui/icons-material/Description'
import InboxIcon from '@mui/icons-material/Inbox'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MedicationIcon from '@mui/icons-material/Medication'
import PersonIcon from '@mui/icons-material/Person'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useDoctorPrescriptions } from '@/features/prescription/hooks/useDoctorPrescriptions'
import { usePatientPrescriptions } from '@/features/prescription/hooks/usePatientPrescriptions'
import { type IPrescription } from '@/features/prescription/types'

const modeConfig = {
  doctor: {
    accent: '#0f766e',
    background: '#ecfdf5',
    darkBackground: 'rgba(13, 148, 136, 0.12)',
    breadcrumb: 'Receitas emitidas',
    emptyDescription: 'As receitas prescritas por você aparecerão aqui.',
    emptyTitle: 'Nenhuma receita emitida',
    heroIcon: <LocalHospitalIcon />,
    metricOne: 'Pacientes atendidos',
    metricTwo: 'Medicamentos prescritos',
    muiColor: 'primary',
    subtitle: 'Acompanhe o histórico de prescrições, revise pacientes atendidos e abra detalhes quando precisar.',
    title: 'Receitas emitidas',
  },
  patient: {
    accent: '#be185d',
    background: '#fdf2f8',
    darkBackground: 'rgba(219, 39, 119, 0.12)',
    breadcrumb: 'Minhas receitas',
    emptyDescription: 'Quando uma receita for emitida para você, ela aparecerá nesta página.',
    emptyTitle: 'Nenhuma receita disponível',
    heroIcon: <PersonIcon />,
    metricOne: 'Médicos responsáveis',
    metricTwo: 'Medicamentos listados',
    muiColor: 'secondary',
    subtitle: 'Consulte suas receitas, veja os medicamentos indicados e confira as orientações do atendimento.',
    title: 'Minhas receitas',
  },
} as const

const formatDate = (date: string) => {
  if (!date) return 'Sem data'

  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

const countMedications = (prescriptions: IPrescription[]) =>
  prescriptions.reduce((total, prescription) => total + prescription.medications.length, 0)

const countPeople = (prescriptions: IPrescription[], mode: PrescriptionMode) => {
  const names = prescriptions.map((prescription) =>
    mode === 'doctor'
      ? prescription.patientName
      : prescription.doctorName || 'Médico não informado'
  )

  return new Set(names).size
}

type PrescriptionMode = 'doctor' | 'patient'

const MetricCard = ({
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
  <Paper variant="outlined" sx={{ borderRadius: 2, height: '100%', p: 2.5 }}>
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

function PrescriptionDetail({
  mode,
  onClose,
  prescription,
}: {
  mode: PrescriptionMode
  onClose: () => void
  prescription: IPrescription
}) {
  const config = modeConfig[mode]

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ color: config.accent, display: 'flex' }}>
            <MedicationIcon />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={800}>
              Detalhes da receita
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {mode === 'doctor'
                ? `Prescrição emitida para ${prescription.patientName}`
                : `Prescrição de ${prescription.doctorName || 'médico não informado'}`}
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                <PersonIcon fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  Paciente
                </Typography>
              </Stack>
              <Typography fontWeight={700}>{prescription.patientName}</Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                <LocalHospitalIcon fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  Médico
                </Typography>
              </Stack>
              <Typography fontWeight={700}>
                {prescription.doctorName || 'Médico não informado'}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                <CalendarTodayIcon fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  Data
                </Typography>
              </Stack>
              <Typography fontWeight={700}>{formatDate(prescription.date)}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1.5 }}>
          Medicamentos
        </Typography>
        <List disablePadding>
          {prescription.medications.map((medication) => (
            <Paper key={medication.id} variant="outlined" sx={{ borderRadius: 2, mb: 1.25 }}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                      <Typography fontWeight={800}>{medication.name}</Typography>
                      <Chip label={medication.dosage} size="small" color={config.muiColor} variant="outlined" />
                    </Stack>
                  }
                  secondary={medication.instructions}
                />
              </ListItem>
            </Paper>
          ))}
        </List>

        {prescription.observations && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" fontWeight={800} gutterBottom>
              Observações
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {prescription.observations}
            </Typography>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" sx={{ borderRadius: 2, bgcolor: config.accent }}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function PrescriptionCard({
  mode,
  onClick,
  prescription,
}: {
  mode: PrescriptionMode
  onClick: () => void
  prescription: IPrescription
}) {
  const config = modeConfig[mode]
  const title =
    mode === 'doctor'
      ? prescription.patientName
      : prescription.doctorName || 'Médico não informado'

  const subtitle =
    mode === 'doctor'
      ? `${prescription.medications.length} medicamento(s) prescritos`
      : `Receita para ${prescription.patientName}`

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        height: '100%',
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
        '&:hover': {
          borderColor: config.accent,
          boxShadow: '0 18px 36px rgba(15, 23, 42, 0.12)',
          transform: 'translateY(-3px)',
        },
      }}
    >
      <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
            <Box>
              <Typography variant="h6" fontWeight={800} noWrap>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            </Box>
            <Chip
              label={formatDate(prescription.date)}
              size="small"
              sx={{
                bgcolor: (theme) => theme.palette.mode === 'dark' ? config.darkBackground : config.background,
              }}
            />
          </Stack>

          <Divider />

          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              {mode === 'doctor' ? (
                <PersonIcon fontSize="small" color="action" />
              ) : (
                <LocalHospitalIcon fontSize="small" color="action" />
              )}
              <Typography variant="body2" color="text.secondary">
                {mode === 'doctor'
                  ? `Paciente: ${prescription.patientName}`
                  : `Médico: ${prescription.doctorName || 'não informado'}`}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <MedicationIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {prescription.medications.length} medicação(ões)
              </Typography>
            </Stack>
          </Stack>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 'auto' }}>
            {prescription.medications.slice(0, 3).map((medication) => (
              <Chip key={medication.id} label={medication.name} size="small" />
            ))}
            {prescription.medications.length > 3 && (
              <Chip label={`+${prescription.medications.length - 3}`} size="small" variant="outlined" />
            )}
          </Box>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ color: config.accent }}>
            <VisibilityIcon fontSize="small" />
            <Typography variant="body2" fontWeight={700}>
              Ver detalhes
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

function PrescriptionsList({
  mode,
  prescriptions,
}: {
  mode: PrescriptionMode
  prescriptions: IPrescription[]
}) {
  const [selected, setSelected] = useState<IPrescription | null>(null)
  const config = modeConfig[mode]

  return (
    <Box>
      <Paper
        sx={{
          bgcolor: (theme) => theme.palette.mode === 'dark' ? config.darkBackground : config.background,
          borderRadius: 2,
          mb: 3,
          p: { xs: 3, md: 4 },
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent="space-between">
          <Box sx={{ maxWidth: 680 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: config.accent, mb: 1 }}>
              {config.heroIcon}
              <Typography variant="overline" fontWeight={800}>
                {mode === 'doctor' ? 'Histórico médico' : 'Consulta do paciente'}
              </Typography>
            </Stack>
            <Typography variant="h3" fontWeight={800} gutterBottom>
              {config.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {config.subtitle}
            </Typography>
          </Box>

          <Chip
            label={`${prescriptions.length} receita(s)`}
            sx={{
              alignSelf: { md: 'center' },
              bgcolor: 'background.paper',
              color: config.accent,
              fontWeight: 800,
            }}
          />
        </Stack>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <MetricCard color={`${config.muiColor}.main`} icon={<DescriptionIcon />} label="Receitas" value={String(prescriptions.length)} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MetricCard color={`${config.muiColor}.main`} icon={mode === 'doctor' ? <PersonIcon /> : <LocalHospitalIcon />} label={config.metricOne} value={String(countPeople(prescriptions, mode))} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MetricCard color={`${config.muiColor}.main`} icon={<MedicationIcon />} label={config.metricTwo} value={String(countMedications(prescriptions))} />
        </Grid>
      </Grid>

      {prescriptions.length === 0 ? (
        <Paper variant="outlined" sx={{ borderRadius: 2, py: 10, textAlign: 'center' }}>
          <InboxIcon sx={{ fontSize: 64, opacity: 0.28, mb: 1 }} />
          <Typography variant="h6" fontWeight={800}>
            {config.emptyTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {config.emptyDescription}
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {prescriptions.map((prescription) => (
            <Grid key={prescription.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <PrescriptionCard
                mode={mode}
                onClick={() => setSelected(prescription)}
                prescription={prescription}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {selected && (
        <PrescriptionDetail
          mode={mode}
          onClose={() => setSelected(null)}
          prescription={selected}
        />
      )}
    </Box>
  )
}

export function DoctorPrescriptionsPage() {
  const { prescriptions } = useDoctorPrescriptions()

  return <PrescriptionsList mode="doctor" prescriptions={prescriptions} />
}

export function PatientPrescriptionsPage() {
  const { prescriptions } = usePatientPrescriptions()

  return <PrescriptionsList mode="patient" prescriptions={prescriptions} />
}
