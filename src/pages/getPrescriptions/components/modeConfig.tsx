import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import PersonIcon from '@mui/icons-material/Person'

/**
 * Configura textos, cores e ícones da listagem de receitas por perfil.
 *
 * Esse objeto evita vários `if` espalhados pela tela e deixa a diferença entre
 * médico e paciente bem fácil de comparar.
 */
export const modeConfig = {
  doctor: {
    accent: '#0f766e',
    background: '#ecfdf5',
    darkBackground: 'rgba(13, 148, 136, 0.12)',
    emptyDescription: 'As receitas prescritas por você aparecerão aqui.',
    emptyTitle: 'Nenhuma receita emitida',
    heroIcon: <LocalHospitalIcon />,
    metricOne: 'Pacientes atendidos',
    metricTwo: 'Medicamentos prescritos',
    muiColor: 'primary',
    subtitle: 'Acompanhe o histórico de prescrições, revise pacientes atendidos e abra detalhes quando precisar.',
    title: 'Receitas emitidas',
  },
  patient: {
    accent: '#be185d',
    background: '#fdf2f8',
    darkBackground: 'rgba(219, 39, 119, 0.12)',
    emptyDescription: 'Quando uma receita for emitida para você, ela aparecerá nesta página.',
    emptyTitle: 'Nenhuma receita disponível',
    heroIcon: <PersonIcon />,
    metricOne: 'Médicos responsáveis',
    metricTwo: 'Medicamentos listados',
    muiColor: 'secondary',
    subtitle: 'Consulte suas receitas, veja os medicamentos indicados e confira as orientações do atendimento.',
    title: 'Minhas receitas',
  },
} as const
