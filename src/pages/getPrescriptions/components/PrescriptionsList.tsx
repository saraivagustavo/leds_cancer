import { useState } from 'react'
import { Box, Chip, Grid, Paper, Stack, Typography } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'
import InboxIcon from '@mui/icons-material/Inbox'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MedicationIcon from '@mui/icons-material/Medication'
import PersonIcon from '@mui/icons-material/Person'
import { MetricCard } from '@/components/MetricCard'
import { type IPrescription } from '@/features/prescription/types'
import {
  countMedications,
  countPeople,
} from '@/features/prescription/utils'
import { type PrescriptionMode } from '../types'
import { modeConfig } from './modeConfig'
import { PrescriptionCard } from './PrescriptionCard'
import { PrescriptionDetail } from './PrescriptionDetail'

type PrescriptionsListProps = {
  mode: PrescriptionMode
  prescriptions: IPrescription[]
}

export function PrescriptionsList({
  mode,
  prescriptions,
}: PrescriptionsListProps) {
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
