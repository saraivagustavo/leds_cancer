import { useState, useMemo } from 'react';
import {
  Alert,
  Box,
  Chip,
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
import { MOCK_PATIENTS } from '@/features/patients/data/mockPatients';

interface PatientSelectStepProps {
  selectedPatientId: string;
  onSelect: (patientId: string) => void;
}

export function PatientSelectStep({ selectedPatientId, onSelect }: PatientSelectStepProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return MOCK_PATIENTS;
    return MOCK_PATIENTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.cpf.includes(q) ||
        p.id.toLowerCase().includes(q)
    );
  }, [search]);

  const selected = MOCK_PATIENTS.find((p) => p.id === selectedPatientId);

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
        <List dense disablePadding>
          {filtered.length === 0 ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Nenhum paciente encontrado.
              </Typography>
            </Box>
          ) : (
            filtered.map((patient, idx) => {
              const isSelected = patient.id === selectedPatientId;
              return (
                <ListItemButton
                  key={patient.id}
                  selected={isSelected}
                  onClick={() => onSelect(patient.id)}
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
                          label={patient.id}
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
                      !isSelected ? (
                        <Typography variant="caption" color="text.secondary">
                          {patient.cpf} · {patient.age} anos · {patient.totalExams} exame(s)
                        </Typography>
                      ) : null
                    }
                  />
                </ListItemButton>
              );
            })
          )}
        </List>
      </Box>
    </Stack>
  );
}
