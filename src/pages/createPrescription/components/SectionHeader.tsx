import { type ReactNode } from 'react'
import { Box, Stack, Typography } from '@mui/material'

type SectionHeaderProps = {
  description: string
  icon: ReactNode
  title: string
}

export const SectionHeader = ({
  description,
  icon,
  title,
}: SectionHeaderProps) => (
  <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 2.5 }}>
    <Box
      sx={{
        alignItems: 'center',
        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(20, 184, 166, 0.12)' : '#e3f2fd',
        borderRadius: 2,
        color: 'primary.main',
        display: 'flex',
        height: 44,
        justifyContent: 'center',
        width: 44,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="h6" fontWeight={700}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  </Stack>
)
