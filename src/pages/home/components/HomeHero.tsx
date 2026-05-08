import { type ReactNode } from 'react'
import { Box, Stack, Typography } from '@mui/material'

type HomeHeroProps = {
  actions: ReactNode
  children: ReactNode
  icon: ReactNode
  mode: 'doctor' | 'patient'
  title: string
}

export const HomeHero = ({
  actions,
  children,
  icon,
  mode,
  title,
}: HomeHeroProps) => {
  const isDoctor = mode === 'doctor'

  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === 'dark'
            ? isDoctor
              ? 'rgba(13, 148, 136, 0.12)'
              : 'rgba(219, 39, 119, 0.12)'
            : isDoctor
              ? '#ecfdf5'
              : '#fdf2f8',
        borderRadius: 2,
        mb: 3,
        p: { xs: 3, md: 4 },
      }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent="space-between">
        <Box sx={{ maxWidth: isDoctor ? 620 : 640 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            {icon}
            <Typography
              variant="overline"
              fontWeight={800}
              color={isDoctor ? 'primary.dark' : 'secondary.dark'}
            >
              {title}
            </Typography>
          </Stack>
          {children}
        </Box>

        {actions}
      </Stack>
    </Box>
  )
}
