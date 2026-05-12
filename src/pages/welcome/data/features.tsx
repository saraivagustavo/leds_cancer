import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AssignmentIcon from '@mui/icons-material/Assignment'
import VerifiedIcon from '@mui/icons-material/Verified'

/**
 * Benefícios apresentados na tela inicial.
 */
export const features = [
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
