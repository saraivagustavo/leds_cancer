import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

import { type IMedication } from '@/features/prescription/types';

interface MedicationListProps {
  medications: IMedication[];
  onChange: (medications: IMedication[]) => void;
}

const createEmptyMedication = (): IMedication => ({
  dosage: '',
  id: crypto.randomUUID(),
  instructions: '',
  name: '',
});

/**
 * Lista e editor de medicamentos da receita.
 *
 * A lista fica compacta para não poluir a tela, e o preenchimento acontece em
 * um modal. No celular, esse modal vira tela cheia para o médico digitar sem
 * brigar com labels cortadas ou botões apertados.
 */
export const MedicationList = ({ medications, onChange }: MedicationListProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [draftMedication, setDraftMedication] = useState<IMedication | null>(null);

  const isEditing = Boolean(draftMedication && medications.some((medication) => medication.id === draftMedication.id));

  const openMedicationForm = (medication?: IMedication) => {
    setDraftMedication(medication ? { ...medication } : createEmptyMedication());
  };

  const closeMedicationForm = () => {
    setDraftMedication(null);
  };

  const saveMedication = () => {
    if (!draftMedication) {
      return;
    }

    const medicationExists = medications.some((medication) => medication.id === draftMedication.id);
    const nextMedications = medicationExists
      ? medications.map((medication) => (medication.id === draftMedication.id ? draftMedication : medication))
      : [...medications, draftMedication];

    onChange(nextMedications);
    closeMedicationForm();
  };

  const removeMedication = (id: string) => {
    onChange(medications.filter((medication) => medication.id !== id));

    if (draftMedication?.id === id) {
      closeMedicationForm();
    }
  };

  const updateDraftMedication = (field: keyof IMedication, value: string) => {
    if (!draftMedication) {
      return;
    }

    setDraftMedication({ ...draftMedication, [field]: value });
  };

  const getMedicationTitle = (medication: IMedication, index: number) =>
    medication.name.trim() || `Medicamento ${index + 1}`;

  const getMedicationDetails = (medication: IMedication) => {
    const details = [medication.dosage, medication.instructions].filter(Boolean).join(' - ');
    return details || 'Sem dosagem ou instruções informadas.';
  };

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        sx={{ alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'space-between', mb: 2 }}
      >
        <Typography variant="h6">Medicamentos</Typography>
        <Button
          fullWidth={isMobile}
          size={isMobile ? 'medium' : 'large'}
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={() => openMedicationForm()}
        >
          {isMobile ? 'Adicionar' : 'Adicionar remédio'}
        </Button>
      </Stack>

      {medications.length === 0 && (
        <Paper variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
          <Typography color="text.secondary" variant="body2">
            Nenhum medicamento adicionado ainda.
          </Typography>
        </Paper>
      )}

      {medications.map((medication, index) => (
        <Paper key={medication.id} variant="outlined" sx={{ borderRadius: 2, mb: 1, p: 1.5 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'space-between' }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography fontWeight={700}>{getMedicationTitle(medication, index)}</Typography>
                {medication.dosage && <Chip label={medication.dosage} size="small" variant="outlined" />}
              </Stack>
              <Typography
                color="text.secondary"
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                }}
                variant="body2"
              >
                {getMedicationDetails(medication)}
              </Typography>
            </Box>

            <Stack direction="row" spacing={0.5} sx={{ justifyContent: { xs: 'flex-end', sm: 'center' } }}>
              <IconButton aria-label="editar medicamento" onClick={() => openMedicationForm(medication)}>
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="remover medicamento"
                color="error"
                onClick={() => removeMedication(medication.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Paper>
      ))}

      <Dialog
        fullWidth
        fullScreen={isMobile}
        maxWidth="sm"
        open={Boolean(draftMedication)}
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
        onClose={closeMedicationForm}
      >
        <DialogTitle
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            gap: 1.5,
            justifyContent: 'space-between',
            pb: 1,
            px: { xs: 2, sm: 3 },
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography component="span" fontWeight={800} variant="h6">
              {isEditing ? 'Editar medicamento' : 'Adicionar medicamento'}
            </Typography>
            <Typography color="text.secondary" component="p" variant="body2">
              Preencha os detalhes do remédio para montar o resumo da lista.
            </Typography>
          </Box>
          <IconButton aria-label="fechar formulário" onClick={closeMedicationForm}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ px: { xs: 2, sm: 3 } }}>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Nome do medicamento"
              value={draftMedication?.name || ''}
              onChange={(event) => updateDraftMedication('name', event.target.value)}
            />
            <TextField
              fullWidth
              helperText="Exemplo: 500mg"
              label="Dosagem"
              value={draftMedication?.dosage || ''}
              onChange={(event) => updateDraftMedication('dosage', event.target.value)}
            />
            <TextField
              fullWidth
              label="Instruções"
              multiline
              rows={4}
              value={draftMedication?.instructions || ''}
              onChange={(event) => updateDraftMedication('instructions', event.target.value)}
            />
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            alignItems: 'stretch',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            gap: 1,
            p: { xs: 2, sm: 3 },
            pt: 1,
          }}
        >
          <Button fullWidth={isMobile} onClick={closeMedicationForm}>
            Cancelar
          </Button>
          <Button fullWidth={isMobile} startIcon={<CheckIcon />} variant="contained" onClick={saveMedication}>
            Salvar medicamento
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
