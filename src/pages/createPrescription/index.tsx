import { useState } from 'react'
import { Alert, Box, Button, Snackbar, Stack, Typography } from '@mui/material'
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

/**
 * Tela de emissão de receita.
 *
 * Junta as seções do formulário, envia os dados para o hook de salvamento e
 * limpa tudo depois do sucesso. O scroll para o topo deixa a confirmação bem
 * visível, principalmente no celular.
 */
export const PrescriptionPage = () => {
  const { user } = useAuth()
  const { errors, handleSave, loading, setErrors } = usePrescription()

  const [formData, setFormData] = useState<Partial<IPrescription>>(
    createInitialFormData(user?.name)
  )
  const [notification, setNotification] = useState('')

  const getFieldError = (fieldName: string) =>
    errors.find((error) => error.field === fieldName)?.message

  const onSave = async () => {
    const success = await handleSave(formData as IPrescription)

    if (success) {
      setNotification(`Receita para ${formData.patientName} gerada com sucesso.`)
      setFormData(createInitialFormData(user?.name))
      window.scrollTo({ behavior: 'smooth', top: 0 })
    }
  }

  const updateField = (field: keyof IPrescription, value: IPrescription[keyof IPrescription]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (errors.length > 0) {
      setErrors([])
    }
  }

  return (
    <Box sx={{ maxWidth: 980, mx: 'auto' }}>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography variant="h4" fontWeight={800} gutterBottom sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
          Gerar receita virtual
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Preencha as informações na ordem do atendimento para emitir uma receita completa.
        </Typography>
      </Box>

      <PrescriptionSteps />

      <Stack spacing={{ xs: 2, md: 3 }}>
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
          fullWidth
          onClick={onSave}
          startIcon={<SaveIcon />}
          variant="contained"
          sx={{ borderRadius: 2, maxWidth: { sm: 220 } }}
        >
          {loading ? 'Salvando...' : 'Finalizar receita'}
        </Button>
      </Box>

      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        autoHideDuration={4000}
        onClose={() => setNotification('')}
        open={Boolean(notification)}
      >
        <Alert
          onClose={() => setNotification('')}
          severity="success"
          sx={{ width: '100%' }}
          variant="filled"
        >
          {notification}
        </Alert>
      </Snackbar>
    </Box>
  )
}
