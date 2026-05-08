import { useState } from 'react'
import { Box } from '@mui/material'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ThemeModeButton } from '@/components/ThemeModeButton'
import { useAuth, type UserRole } from '@/contexts/AuthContext'
import { LoginCard } from './login/components/LoginCard'
import { MOCK_USERS } from './login/data/authMock'
import { roleConfig } from './login/data/roleConfig'

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
      (mockUser) => mockUser.username === username && mockUser.password === password && mockUser.role === role
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

      <LoginCard
        error={error}
        onBack={() => navigate('/')}
        onLogin={handleLogin}
        password={password}
        role={role}
        setError={setError}
        setPassword={setPassword}
        setUsername={setUsername}
        username={username}
      />
    </Box>
  )
}
