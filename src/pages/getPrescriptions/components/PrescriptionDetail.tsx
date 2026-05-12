import {
  Box,
  Button,
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
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { type ReactNode } from 'react'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MedicationIcon from '@mui/icons-material/Medication'
import PersonIcon from '@mui/icons-material/Person'
import { type IPrescription } from '@/features/prescription/types'
import { formatPrescriptionDate } from '@/features/prescription/utils'
import { type PrescriptionMode } from '../types'
import { modeConfig } from './modeConfig'

type PrescriptionDetailProps = {
  mode: PrescriptionMode
  onClose: () => void
  prescription: IPrescription
}

/**
 * Modal com a receita completa.
 *
 * No celular vira tela cheia para leitura confortável, principalmente quando a
 * lista de medicamentos ou instruções fica grande.
 */
export function PrescriptionDetail({
  mode,
  onClose,
  prescription,
}: PrescriptionDetailProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const config = modeConfig[mode]

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth fullScreen={isMobile}>
      <DialogTitle>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
          <Box sx={{ color: config.accent, display: 'flex', flex: '0 0 auto' }}>
            <MedicationIcon />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" fontWeight={800}>
              Detalhes da receita
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>
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
            <InfoPanel icon={<PersonIcon fontSize="small" color="action" />} label="Paciente" value={prescription.patientName} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <InfoPanel icon={<LocalHospitalIcon fontSize="small" color="action" />} label="Médico" value={prescription.doctorName || 'Médico não informado'} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <InfoPanel icon={<CalendarTodayIcon fontSize="small" color="action" />} label="Data" value={formatPrescriptionDate(prescription.date)} />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1.5 }}>
          Medicamentos
        </Typography>
        <List disablePadding>
          {prescription.medications.map((medication) => (
            <Paper key={medication.id} variant="outlined" sx={{ borderRadius: 2, mb: 1.25 }}>
              <ListItem alignItems="flex-start" sx={{ px: { xs: 1.5, sm: 2 } }}>
                <ListItemText
                  primary={
                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                      <Typography fontWeight={800} sx={{ overflowWrap: 'anywhere' }}>{medication.name}</Typography>
                      {medication.dosage && (
                        <Chip label={medication.dosage} size="small" color={config.muiColor} variant="outlined" />
                      )}
                    </Stack>
                  }
                  secondaryTypographyProps={{ sx: { overflowWrap: 'anywhere' } }}
                  secondary={medication.instructions || 'Sem instruções informadas.'}
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

      <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: 1 }}>
        <Button fullWidth onClick={onClose} variant="contained" sx={{ borderRadius: 2, bgcolor: config.accent, maxWidth: { sm: 160 } }}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

type InfoPanelProps = {
  icon: ReactNode
  label: string
  value: string
}

/**
 * Bloco pequeno de informação dentro do detalhe da receita.
 */
const InfoPanel = ({ icon, label, value }: InfoPanelProps) => (
  <Paper variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
      {icon}
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Stack>
    <Typography fontWeight={700} sx={{ overflowWrap: 'anywhere' }}>{value}</Typography>
  </Paper>
)
