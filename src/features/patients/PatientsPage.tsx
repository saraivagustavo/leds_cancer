import { useMemo, useState } from 'react';
import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { PatientFilters } from './components/PatientFilters';
import { PatientTable } from './components/PatientTable';
import { PatientDetailDrawer } from './components/PatientDetailDrawer';
import { MOCK_PATIENTS } from './data/mockPatients';
import type { Patient, PatientStatus } from '@/types/patient';

export function PatientsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<PatientStatus | 'todos'>('todos');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Filtragem reativa
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return MOCK_PATIENTS.filter((p) => {
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.cpf.includes(q) ||
        p.email.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'todos' || p.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  // Reset de página ao filtrar
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleStatusChange = (value: PatientStatus | 'todos') => {
    setStatusFilter(value);
    setPage(0);
  };

  return (
    <>
      <Stack spacing={3}>
        {/* Cabeçalho */}
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <PeopleAltOutlinedIcon color="primary" />
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Pacientes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {MOCK_PATIENTS.length} pacientes cadastrados
            </Typography>
          </Box>
        </Stack>

        {/* Card principal */}
        <Card>
          <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
            <PatientFilters
              search={search}
              statusFilter={statusFilter}
              onSearchChange={handleSearchChange}
              onStatusChange={handleStatusChange}
            />
          </Box>

          <Divider />

          <PatientTable
            patients={filtered}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={(rows) => { setRowsPerPage(rows); setPage(0); }}
            onViewPatient={setSelectedPatient}
          />
        </Card>
      </Stack>

      {/* Drawer de detalhes */}
      <PatientDetailDrawer
        patient={selectedPatient}
        open={!!selectedPatient}
        onClose={() => setSelectedPatient(null)}
      />
    </>
  );
}
