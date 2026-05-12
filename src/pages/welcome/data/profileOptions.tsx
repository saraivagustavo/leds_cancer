import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import PersonIcon from '@mui/icons-material/Person'

/**
 * Opções de perfil exibidas na tela inicial.
 *
 * Deixamos texto, ícone e gradiente juntos para a tela só renderizar a lista.
 */
export const profileOptions = [
  {
    role: 'doctor',
    label: 'Entrar como médico',
    description: 'Prescreva novas receitas e acompanhe o histórico emitido.',
    icon: <LocalHospitalIcon sx={{ fontSize: 56 }} />,
    gradient: 'linear-gradient(135deg, #0f766e 0%, #2563eb 100%)',
  },
  {
    role: 'patient',
    label: 'Entrar como paciente',
    description: 'Consulte as receitas prescritas para você em um só lugar.',
    icon: <PersonIcon sx={{ fontSize: 56 }} />,
    gradient: 'linear-gradient(135deg, #be185d 0%, #7c3aed 100%)',
  },
] as const
