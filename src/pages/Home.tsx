import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'
import VerifiedIcon from '@mui/icons-material/Verified'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import PersonIcon from '@mui/icons-material/Person'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const features = [
  {
    icon: <AssignmentIcon fontSize="large" color="primary" />,
    title: 'Receitas Digitais',
    description: 'Receitas médicas virtuais de forma rápida, organizada e sem papel.',
  },
  {
    icon: <VerifiedIcon fontSize="large" color="primary" />,
    title: 'Dados Validados',
    description: 'Todas as informações são validadas antes de serem salvas.',
  },
  {
    icon: <AccessTimeIcon fontSize="large" color="primary" />,
    title: 'Agilidade no Atendimento',
    description: 'Fluxo simples e intuitivo para médicos e pacientes.',
  },
]

const doctorActions = [
  {
    icon: <AssignmentIcon sx={{ fontSize: 48 }} />,
    title: 'Nova Receita',
    description: 'Crie uma nova prescrição para um paciente de forma rápida.',
    action: 'Gerar Receita',
    to: '/prescription',
    variant: 'contained' as const,
  },
  {
    icon: <ListAltIcon sx={{ fontSize: 48 }} />,
    title: 'Receitas Emitidas',
    description: 'Consulte o histórico de receitas que você já emitiu.',
    action: 'Ver Histórico',
    to: '/doctor/prescriptions',
    variant: 'outlined' as const,
  },
]

const patientActions = [
  {
    icon: <ListAltIcon sx={{ fontSize: 48 }} />,
    title: 'Minhas Receitas',
    description: 'Visualize todas as receitas prescritas para você.',
    action: 'Ver Receitas',
    to: '/my-prescriptions',
    variant: 'contained' as const,
  },
]

export function Home() {
  const { user } = useAuth()

  const isDoctor = user?.role === 'doctor'
  const actions = isDoctor ? doctorActions : patientActions

  const heroTitle = isDoctor
    ? `Olá, ${user?.name}`
    : `Olá, ${user?.name}`

  const heroSubtitle = isDoctor
    ? 'Gerencie suas prescrições e acompanhe o histórico dos seus pacientes.'
    : 'Acompanhe suas receitas médicas de qualquer lugar, a qualquer hora.'

  const heroIcon = isDoctor
    ? <LocalHospitalIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
    : <PersonIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />

  const heroCta = isDoctor
    ? { label: 'Gerar Receita Agora', to: '/prescription' }
    : { label: 'Ver Minhas Receitas', to: '/my-prescriptions' }

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 6, md: 10 },
          px: 2,
          background: isDoctor
            ? 'linear-gradient(135deg, #e3f2fd 0%, #e8f5e9 100%)'
            : 'linear-gradient(135deg, #fce4ec 0%, #e3f2fd 100%)',
          borderRadius: 3,
          mb: 6,
        }}
      >
        {heroIcon}
        <Typography variant="h3" fontWeight={700} gutterBottom color="primary.dark">
          {heroTitle}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 520, mx: 'auto', mb: 4 }}>
          {heroSubtitle}
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to={heroCta.to}
          startIcon={isDoctor ? <AssignmentIcon /> : <ListAltIcon />}
          sx={{ borderRadius: 3, px: 4 }}
        >
          {heroCta.label}
        </Button>
      </Box>

      {/* Ações do perfil */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
          O que você quer fazer?
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
          {isDoctor ? 'Acesse as funcionalidades disponíveis para médicos.' : 'Acesse suas informações de saúde.'}
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {actions.map((item) => (
            <Grid key={item.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  borderRadius: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <Box color="primary.main">{item.icon}</Box>
                <Typography variant="h6" fontWeight={600}>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                  {item.description}
                </Typography>
                <Button
                  variant={item.variant}
                  component={Link}
                  to={item.to}
                  sx={{ borderRadius: 3, mt: 1 }}
                >
                  {item.action}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Features */}
      <Box sx={{ bgcolor: 'grey.50', borderRadius: 3, py: 6, px: 2, mb: 4 }}>
        <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
          Por que usar o MyHealth?
        </Typography>
        <Grid container spacing={3} justifyContent="center" maxWidth="md" mx="auto">
          {features.map((feature) => (
            <Grid key={feature.title} size={{ xs: 12, sm: 4 }}>
              <Box textAlign="center" px={2}>
                <Box mb={1}>{feature.icon}</Box>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
