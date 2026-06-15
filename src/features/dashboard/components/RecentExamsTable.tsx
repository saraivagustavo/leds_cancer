import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import type { ExamStatus } from '@/types/dashboard';
import { useExams } from '@/contexts/ExamContext';

// ─── Helpers de status ────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<ExamStatus, { label: string; color: 'default' | 'primary' | 'warning' | 'success' | 'error' }> = {
  pendente:   { label: 'Pendente',    color: 'warning' },
  em_analise: { label: 'Em Análise',  color: 'primary' },
  concluido:  { label: 'Concluído',   color: 'success' },
  cancelado:  { label: 'Cancelado',   color: 'error'   },
};

// ─── Componente ───────────────────────────────────────────────────────────────

export function RecentExamsTable() {
  const { recentExams } = useExams();
  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="subtitle1" fontWeight={700}>
            Atendimentos Recentes
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            Exames realizados hoje — {new Date().toLocaleDateString('pt-BR', { dateStyle: 'long' })}
          </Typography>
        }
        sx={{ pb: 0 }}
      />
      <Divider sx={{ mt: 1.5 }} />
      <CardContent sx={{ p: 0 }}>
        <TableContainer>
          <Table size="small" aria-label="Tabela de atendimentos recentes">
            <TableHead>
              <TableRow sx={{ '& th': { fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: 0.4 } }}>
                <TableCell>ID</TableCell>
                <TableCell>Paciente</TableCell>
                <TableCell>Data / Hora</TableCell>
                <TableCell>Tipo de Exame</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentExams.map((exam) => {
                const status = STATUS_CONFIG[exam.status];
                return (
                  <TableRow
                    key={exam.id}
                    hover
                    sx={{ '&:last-child td': { borderBottom: 0 } }}
                  >
                    <TableCell>
                      <Typography variant="caption" fontFamily="monospace" color="text.secondary">
                        {exam.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {exam.patientName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {exam.datetime}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{exam.examType}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={status.label}
                        color={status.color}
                        size="small"
                        sx={{ fontWeight: 600, fontSize: '0.72rem', minWidth: 90 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                        <Tooltip title="Visualizar exame">
                          <IconButton size="small" aria-label={`Visualizar exame ${exam.id}`}>
                            <VisibilityOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Baixar laudo">
                          <IconButton size="small" aria-label={`Baixar laudo ${exam.id}`}>
                            <FileDownloadOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
