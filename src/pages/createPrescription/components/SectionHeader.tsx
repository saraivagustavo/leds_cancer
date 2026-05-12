import { type ReactNode } from 'react'
import { Box, Stack, Typography } from '@mui/material'

type SectionHeaderProps = {
  description: string
  icon: ReactNode
  title: string
}

/**
 * Cabeçalho padrão das seções do formulário de receita.
 *
 * Garante que ícone, título e descrição tenham a mesma cara em todos os blocos,
 * deixando o formulário mais fácil de escanear.
 */
export const SectionHeader = ({
  description,
  icon,
  title,
}: SectionHeaderProps) => (
  <Stack direction="row" spacing={{ xs: 1, sm: 1.5 }} alignItems="flex-start" sx={{ mb: 2.5 }}>
    <Box
      sx={{
        alignItems: 'center',
        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(20, 184, 166, 0.12)' : '#e3f2fd',
        borderRadius: 2,
        color: 'primary.main',
        display: 'flex',
        flex: '0 0 auto',
        height: { xs: 38, sm: 44 },
        justifyContent: 'center',
        width: { xs: 38, sm: 44 },
      }}
    >
      {icon}
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1.05rem', sm: '1.25rem' } }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  </Stack>
)
