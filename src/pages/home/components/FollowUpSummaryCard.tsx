import { LinearProgress, Paper, Typography } from '@mui/material'

type FollowUpSummaryCardProps = {
  prescriptionCount: number
}

/**
 * Card de acompanhamento do paciente.
 *
 * Usa uma indicação visual simples para mostrar se já existe receita disponível
 * para consulta.
 */
export const FollowUpSummaryCard = ({ prescriptionCount }: FollowUpSummaryCardProps) => (
  <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, height: '100%' }}>
    <Typography variant="h6" fontWeight={700} gutterBottom>
      Resumo de acompanhamento
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      Use a lista de receitas para abrir os detalhes, revisar dosagens e consultar observações do médico.
    </Typography>
    <LinearProgress
      variant="determinate"
      value={prescriptionCount > 0 ? 100 : 18}
      sx={{ borderRadius: 999, height: 8, mb: 1.5 }}
    />
    <Typography variant="caption" color="text.secondary">
      {prescriptionCount > 0 ? 'Receitas prontas para consulta.' : 'Aguardando novas prescrições.'}
    </Typography>
  </Paper>
)
