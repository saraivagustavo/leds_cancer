import { useState, useMemo } from 'react';
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { usePatients } from '@/hooks/usePatients';

interface PatientSelectStepProps {
  selectedPatientId: string;
  onSelect: (patientId: string) => void;
}

export function PatientSelectStep({ selectedPatientId, onSelect }: PatientSelectStepProps) {
  const { patients, isLoading } = usePatients();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return patients;
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.cpf.includes(q) ||
        String(p.id).toLowerCase().includes(q),
    );
  }, [search, patients]);

  const selected = patients.find((p) => String(p.id) === selectedPatientId);

  return (
    <Stack spacing={2.5}>
      <Typography variant="body2" color="text.secondary">
        Busque e selecione o paciente para o qual o exame será registrado.
      </Typography>

      {selected && (
        <Alert
          severity="success"
          icon={<CheckCircleIcon fontSize="small" />}
          sx={{ borderRadius: 2 }}
        >
          <strong>{selected.name}</strong> selecionada — {selected.cpf}
        </Alert>
      )}

      <TextField
        placeholder="Buscar por nome, CPF ou ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
          },
          htmlInput: { 'aria-label': 'Buscar paciente' },
        }}
      />

      <Box
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          maxHeight: 320,
          overflowY: 'auto',
        }}
      >
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={28} />
          </Box>
        ) : (
          <List dense disablePadding>
            {filtered.length === 0 ? (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Nenhum paciente encontrado.
                </Typography>
              </Box>
            ) : (
              filtered.map((patient, idx) => {
                const isSelected = String(patient.id) === selectedPatientId;
                return (
                  <ListItemButton
                    key={patient.id}
                    selected={isSelected}
                    onClick={() => onSelect(String(patient.id))}
                    divider={idx < filtered.length - 1}
                    sx={{
                      px: 2,
                      py: 1.2,
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': { bgcolor: 'primary.dark' },
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="body2" fontWeight={600}>
                            {patient.name}
                          </Typography>
                          <Chip
                            label={`#${patient.id}`}
                            size="small"
                            sx={{
                              fontSize: '0.68rem',
                              height: 18,
                              bgcolor: isSelected ? 'rgba(255,255,255,0.2)' : undefined,
                              color: isSelected ? 'inherit' : undefined,
                            }}
                          />
                        </Stack>
                      }
                      secondary={
                      <Typography variant="caption" color={isSelected ? 'inherit' : 'text.secondary'} sx={{ opacity: isSelected ? 0.85 : 1 }}>
                        {patient.cpf} · {patient.age} anos · {patient.totalExams} exame(s)
                      </Typography>
                    }
                    />
                  </ListItemButton>
                );
              })
            )}
          </List>
        )}
      </Box>
    </Stack>
  );
}
