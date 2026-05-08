import { type ReactNode } from 'react'
import { Box, Paper, Stack, Typography } from '@mui/material'

type MetricCardProps = {
  color?: string
  icon: ReactNode
  label: string
  value: string
}

export const MetricCard = ({
  color = 'primary.main',
  icon,
  label,
  value,
}: MetricCardProps) => (
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
