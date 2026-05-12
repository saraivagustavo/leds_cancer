import { type ReactNode } from 'react'
import { Box, Paper, Stack, Typography } from '@mui/material'

type MetricCardProps = {
  color?: string
  icon: ReactNode
  label: string
  value: string
}

/**
 * Card pequeno de indicador.
 *
 * Usado em dashboards e listas para mostrar contagens importantes sem roubar
 * atenção do fluxo principal.
 */
export const MetricCard = ({
  color = 'primary.main',
  icon,
  label,
  value,
}: MetricCardProps) => (
  <Paper variant="outlined" sx={{ borderRadius: 2, height: '100%', p: { xs: 2, sm: 2.5 } }}>
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box sx={{ color, display: 'flex', flex: '0 0 auto' }}>{icon}</Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="h5" fontWeight={800}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>
          {label}
        </Typography>
      </Box>
    </Stack>
  </Paper>
)
