import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DescriptionIcon from '@mui/icons-material/Description'
import HomeIcon from '@mui/icons-material/Home'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import PersonIcon from '@mui/icons-material/Person'
import { type AuthUser } from '@/contexts/AuthContext'

export const getNavigationItems = (isDoctor: boolean) => {
  if (isDoctor) {
    return [
      { icon: <HomeIcon fontSize="small" />, label: 'Home', to: '/dashboard' },
      { icon: <AddCircleOutlineIcon fontSize="small" />, label: 'Nova receita', to: '/prescription' },
      { icon: <DescriptionIcon fontSize="small" />, label: 'Receitas emitidas', to: '/doctor/prescriptions' },
    ]
  }

  return [
    { icon: <HomeIcon fontSize="small" />, label: 'Home', to: '/dashboard' },
    { icon: <DescriptionIcon fontSize="small" />, label: 'Minhas receitas', to: '/my-prescriptions' },
  ]
}

export const getRoleIcon = (isDoctor: boolean) =>
  isDoctor ? <LocalHospitalIcon fontSize="small" /> : <PersonIcon fontSize="small" />

export const getInitials = (user?: AuthUser | null) =>
  user?.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
