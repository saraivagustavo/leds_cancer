import { Box, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'
import { type IPrescription } from '@/features/prescription/types'
import {
  formatPrescriptionDate,
  recentPrescriptions,
} from '@/features/prescription/utils'

type RecentPrescriptionListProps = {
  color?: 'primary' | 'secondary'
  emptyText: string
  mode: 'doctor' | 'patient'
  prescriptions: IPrescription[]
}

/**
 * Lista curta de atividade recente do dashboard.
 *
 * Mostra só as últimas receitas para dar contexto sem transformar a home em uma
 * segunda tela de histórico.
 */
export const RecentPrescriptionList = ({
  color = 'primary',
  emptyText,
  mode,
  prescriptions,
}: RecentPrescriptionListProps) => (
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
                {formatPrescriptionDate(prescription.date)}
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
