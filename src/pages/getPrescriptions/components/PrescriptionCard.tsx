import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MedicationIcon from '@mui/icons-material/Medication'
import PersonIcon from '@mui/icons-material/Person'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { type IPrescription } from '@/features/prescription/types'
import { formatPrescriptionDate } from '@/features/prescription/utils'
import { type PrescriptionMode } from '../types'
import { modeConfig } from './modeConfig'

type PrescriptionCardProps = {
  mode: PrescriptionMode
  onClick: () => void
  prescription: IPrescription
}

/**
 * Card resumido de uma receita emitida.
 *
 * Mostra os dados mais importantes para escanear a lista rapidamente e abre o
 * modal de detalhes quando selecionado.
 */
export function PrescriptionCard({
  mode,
  onClick,
  prescription,
}: PrescriptionCardProps) {
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
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'flex-start' }}
            gap={1.5}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h6" fontWeight={800} sx={{ overflowWrap: 'anywhere' }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            </Box>
            <Chip
              label={formatPrescriptionDate(prescription.date)}
              size="small"
              sx={{
                flex: '0 0 auto',
                bgcolor: (theme) => theme.palette.mode === 'dark' ? config.darkBackground : config.background,
              }}
            />
          </Stack>

          <Divider />

          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
              {mode === 'doctor' ? (
                <PersonIcon fontSize="small" color="action" />
              ) : (
                <LocalHospitalIcon fontSize="small" color="action" />
              )}
              <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>
                {mode === 'doctor'
                  ? `Paciente: ${prescription.patientName}`
                  : `Médico: ${prescription.doctorName || 'não informado'}`}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
              <MedicationIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {prescription.medications.length} medicamento(s)
              </Typography>
            </Stack>
          </Stack>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 'auto' }}>
            {prescription.medications.slice(0, 3).map((medication, index) => (
              <Chip key={medication.id} label={medication.name || `Medicamento ${index + 1}`} size="small" />
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
