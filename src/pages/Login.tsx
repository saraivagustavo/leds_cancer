import { useState, type ReactNode } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import PersonIcon from '@mui/icons-material/Person'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ThemeModeButton } from '@/components/ThemeModeButton'
import { useAuth, type UserRole } from '@/contexts/AuthContext'

const MOCK_USERS = [
  { username: 'dr.silva', password: '1234', name: 'Dr. Silva', role: 'doctor' as UserRole },
  { username: 'joao', password: '1234', name: 'Joao Paciente', role: 'patient' as UserRole },
]

const roleConfig: Record<
  UserRole,
  {
    title: string
    subtitle: string
    icon: ReactNode
    background: string
    darkBackground: string
    accent: string
    helper: string
    nextPath: string
  }
> = {
  doctor: {
    title: 'Login médico',
    subtitle: 'Acesse para prescrever receitas e visualizar o histórico emitido.',
    icon: <LocalHospitalIcon color="primary" fontSize="large" />,
    background: 'linear-gradient(135deg, #e0f2fe 0%, #ecfdf5 100%)',
    darkBackground: 'linear-gradient(135deg, #0f2f3f 0%, #0b2f29 100%)',
    accent: '#0f766e',
    helper: 'Use dr.silva / 1234 para testar.',
    nextPath: '/dashboard',
  },
  patient: {
    title: 'Login paciente',
    subtitle: 'Acesse para visualizar as receitas prescritas para você.',
    icon: <PersonIcon color="secondary" fontSize="large" />,
    background: 'linear-gradient(135deg, #fdf2f8 0%, #eef2ff 100%)',
    darkBackground: 'linear-gradient(135deg, #3b1027 0%, #1f1b45 100%)',
    accent: '#be185d',
    helper: 'Use joao / 1234 para testar.',
    nextPath: '/my-prescriptions',
  },
}

export const LoginPage = () => {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const params = useParams()

  const role = params.role as UserRole
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (role !== 'doctor' && role !== 'patient') return <Navigate to="/" replace />
  if (user) return <Navigate to="/dashboard" replace />

  const config = roleConfig[role]

  const handleLogin = () => {
    const found = MOCK_USERS.find(
      (u) => u.username === username && u.password === password && u.role === role
    )

    if (!found) {
      setError('Usuário ou senha inválidos para este perfil.')
      return
    }

    login({ name: found.name, role: found.role })
    navigate(config.nextPath)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: (theme) => theme.palette.mode === 'dark' ? config.darkBackground : config.background,
        position: 'relative',
        px: 2,
      }}
    >
      <Box sx={{ position: 'absolute', right: 24, top: 24 }}>
        <ThemeModeButton />
      </Box>

      <Card sx={{ maxWidth: 440, width: '100%', borderRadius: 2, boxShadow: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ mb: 2, px: 0 }}
          >
            Voltar
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: `${config.accent}14`,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              {config.icon}
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={800}>
                MyHealth
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {role === 'doctor' ? 'Área médica' : 'Área do paciente'}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h5" fontWeight={700} mb={1}>
            {config.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            {config.subtitle}
          </Typography>

          <TextField
            label="Usuário"
            fullWidth
            sx={{ mb: 2 }}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              setError('')
            }}
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
            {config.helper}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleLogin}
            startIcon={<MedicalServicesIcon />}
            sx={{ bgcolor: config.accent, '&:hover': { bgcolor: config.accent } }}
          >
            Entrar
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}
