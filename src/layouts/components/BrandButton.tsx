import { Box, Stack, Typography } from '@mui/material'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'

type BrandButtonProps = {
  color: 'primary' | 'secondary'
  onClick: () => void
}

export const BrandButton = ({ color, onClick }: BrandButtonProps) => (
  <Stack
    direction="row"
    spacing={1.25}
    alignItems="center"
    onClick={onClick}
    sx={{ cursor: 'pointer', minWidth: { xs: 'auto', md: 210 } }}
  >
    <Box
      sx={{
        alignItems: 'center',
        bgcolor: `${color}.main`,
        borderRadius: 2,
        color: '#fff',
        display: 'flex',
        height: 42,
        justifyContent: 'center',
        width: 42,
      }}
    >
      <MedicalServicesIcon />
    </Box>
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Typography variant="h6" fontWeight={900} lineHeight={1}>
        MyHealth
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Receitas digitais
      </Typography>
    </Box>
  </Stack>
)
