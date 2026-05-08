import { useState } from 'react'
import { Alert, Box, Button, Stack, Typography } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import { useAuth } from '@/contexts/AuthContext'
import { usePrescription } from '@/features/prescription/hooks/usePrescription'
import { type IPrescription } from '@/features/prescription/types'
import { DoctorSection } from './components/DoctorSection'
import { MedicationsSection } from './components/MedicationsSection'
import { PatientSection } from './components/PatientSection'
import { PrescriptionSteps } from './components/PrescriptionSteps'
import { ReviewSection } from './components/ReviewSection'
import { createInitialFormData } from './utils'

export const PrescriptionPage = () => {
  const { user } = useAuth()
  const { errors, handleSave, loading, setErrors } = usePrescription()

  const [formData, setFormData] = useState<Partial<IPrescription>>(
    createInitialFormData(user?.name)
  )
  const [saved, setSaved] = useState(false)

  const getFieldError = (fieldName: string) =>
    errors.find((error) => error.field === fieldName)?.message

  const onSave = async () => {
    const success = await handleSave(formData as IPrescription)

    if (success) {
      setFormData(createInitialFormData(user?.name))
      setSaved(true)
    }
  }

  const updateField = (field: keyof IPrescription, value: IPrescription[keyof IPrescription]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setSaved(false)

    if (errors.length > 0) {
      setErrors([])
    }
  }

  return (
    <Box sx={{ maxWidth: 980, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Gerar receita virtual
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Preencha as informações na ordem do atendimento para emitir uma receita completa.
        </Typography>
      </Box>

      <PrescriptionSteps />

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Receita salva com sucesso.
        </Alert>
      )}

      <Stack spacing={3}>
        <DoctorSection
          formData={formData}
          getFieldError={getFieldError}
          updateField={updateField}
        />
        <PatientSection
          formData={formData}
          getFieldError={getFieldError}
          updateField={updateField}
        />
        <MedicationsSection
          formData={formData}
          getFieldError={getFieldError}
          updateField={updateField}
        />
        <ReviewSection formData={formData} updateField={updateField} />
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          disabled={loading}
          onClick={onSave}
          startIcon={<SaveIcon />}
          variant="contained"
          sx={{ borderRadius: 2 }}
        >
          {loading ? 'Salvando...' : 'Finalizar receita'}
        </Button>
      </Box>
    </Box>
  )
}
