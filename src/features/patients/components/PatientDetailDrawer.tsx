import {
  Box,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import type { Patient } from '@/types/patient';
import type { ExamStatus } from '@/types/dashboard';
import { useExams } from '@/contexts/ExamContext';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const EXAM_STATUS_CONFIG: Record<
  ExamStatus,
  { label: string; color: 'default' | 'primary' | 'warning' | 'success' | 'error' }
> = {
  pendente:   { label: 'Pendente',   color: 'warning' },
  em_analise: { label: 'Em Análise', color: 'primary' },
  concluido:  { label: 'Concluído',  color: 'success' },
  cancelado:  { label: 'Cancelado',  color: 'error'   },
};

// ─── Sub-componente de campo de informação ────────────────────────────────────

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Box sx={{ color: 'text.secondary', mt: 0.2, flexShrink: 0 }}>{icon}</Box>
      <Box>
        <Typography variant="caption" color="text.secondary" display="block">
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={500}>
          {value}
        </Typography>
      </Box>
    </Stack>
  );
}

// ─── Drawer principal ─────────────────────────────────────────────────────────

interface PatientDetailDrawerProps {
  patient: Patient | null;
  open: boolean;
  onClose: () => void;
}

const DRAWER_WIDTH = 420;

export function PatientDetailDrawer({ patient, open, onClose }: PatientDetailDrawerProps) {
  const { patientExams } = useExams();
  const exams = patient ? (patientExams[patient.id] ?? patient.exams) : [];
  const totalExams = exams.length;
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100vw', sm: DRAWER_WIDTH } } }}
    >
      {patient && (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider' }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                {patient.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {patient.id}
              </Typography>
            </Box>
            <Tooltip title="Fechar">
              <IconButton onClick={onClose} size="small" aria-label="Fechar painel de detalhes">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Corpo com scroll */}
          <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 3, py: 2.5 }}>
            {/* Status badge */}
            <Chip
              label={patient.status === 'ativo' ? 'Ativo' : 'Inativo'}
              color={patient.status === 'ativo' ? 'success' : 'default'}
              size="small"
              sx={{ mb: 2.5, fontWeight: 600 }}
            />

            {/* Dados pessoais */}
            <Typography variant="overline" color="text.secondary" fontWeight={700} display="block" mb={1.5}>
              Dados Pessoais
            </Typography>

            <Stack spacing={2} mb={3}>
              <InfoRow
                icon={<PersonOutlineIcon fontSize="small" />}
                label="Nome completo"
                value={patient.name}
              />
              <InfoRow
                icon={<CakeOutlinedIcon fontSize="small" />}
                label="Data de nascimento"
                value={`${patient.birthDate} (${patient.age} anos)`}
              />
              <InfoRow
                icon={<BadgeOutlinedIcon fontSize="small" />}
                label="CPF"
                value={patient.cpf}
              />
              <InfoRow
                icon={<PhoneOutlinedIcon fontSize="small" />}
                label="Telefone"
                value={patient.phone}
              />
              <InfoRow
                icon={<EmailOutlinedIcon fontSize="small" />}
                label="E-mail"
                value={patient.email}
              />
            </Stack>

            <Divider sx={{ mb: 2.5 }} />

            {/* Histórico de exames */}
            <Typography variant="overline" color="text.secondary" fontWeight={700} display="block" mb={1.5}>
              Histórico de Exames ({totalExams})
            </Typography>

            {exams.length === 0 ? (
              <Typography variant="body2" color="text.disabled">
                Nenhum exame registrado.
              </Typography>
            ) : (
              <Table size="small" aria-label={`Exames de ${patient.name}`}>
                <TableHead>
                  <TableRow sx={{ '& th': { fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase' } }}>
                    <TableCell>Data</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exams.map((exam) => {
                    const cfg = EXAM_STATUS_CONFIG[exam.status];
                    return (
                      <TableRow key={exam.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                        <TableCell>
                          <Typography variant="caption">{exam.date}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption">{exam.type}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={cfg.label}
                            color={cfg.color}
                            size="small"
                            sx={{ fontWeight: 600, fontSize: '0.68rem' }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </Box>
        </Box>
      )}
    </Drawer>
  );
}
