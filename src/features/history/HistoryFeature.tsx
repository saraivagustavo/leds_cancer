import { useMemo, useState } from 'react';
import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { HistoryFilters } from './components/HistoryFilters';
import { HistoryTable } from './components/HistoryTable';
import { ExamDetailDrawer } from './components/ExamDetailDrawer';
import { useExams } from '@/contexts/ExamContext';
import { MOCK_PATIENTS } from '@/features/patients/data/mockPatients';
import type { HistoryExam } from '@/types/history';
import type { HistoryFilterValues } from './components/HistoryFilters';
import type { SortField, SortDirection } from './components/HistoryTable';

// ─── Tipo re-exportado para compatibilidade ───────────────────────────────────
export type { HistoryExam } from '@/types/history';

// ─── Constrói a lista completa a partir do contexto ───────────────────────────

function buildAllExams(patientExams: Record<string, import('@/types/patient').PatientExam[]>): HistoryExam[] {
  const patientMap = Object.fromEntries(MOCK_PATIENTS.map((p) => [p.id, p.name]));

  return Object.entries(patientExams).flatMap(([patientId, exams]) =>
    exams.map((exam) => ({
      id: exam.id,
      patientId,
      patientName: patientMap[patientId] ?? patientId,
      datetime: exam.date,
      examType: exam.type,
      status: exam.status,
      radiologist: exam.radiologist,
    }))
  );
}

// ─── Helpers de filtro ────────────────────────────────────────────────────────

function parseBrDate(str: string): Date {
  // Suporta "dd/mm/yyyy" e "dd/mm/yyyy HH:mm"
  const [datePart, timePart] = str.split(' ');
  const [d, m, y] = datePart.split('/').map(Number);
  if (timePart) {
    const [h, min] = timePart.split(':').map(Number);
    return new Date(y, m - 1, d, h, min);
  }
  return new Date(y, m - 1, d);
}

function isWithinPeriod(dateStr: string, period: HistoryFilterValues['period']): boolean {
  if (period === 'todos') return true;
  const days = { '7d': 7, '30d': 30, '90d': 90, '365d': 365 }[period];
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return parseBrDate(dateStr) >= cutoff;
}

function sortExams(exams: HistoryExam[], field: SortField, dir: SortDirection): HistoryExam[] {
  return [...exams].sort((a, b) => {
    let cmp = 0;
    if (field === 'datetime') {
      cmp = parseBrDate(a.datetime).getTime() - parseBrDate(b.datetime).getTime();
    } else {
      cmp = a[field].localeCompare(b[field], 'pt-BR');
    }
    return dir === 'asc' ? cmp : -cmp;
  });
}

// ─── Componente principal ─────────────────────────────────────────────────────

const INITIAL_FILTERS: HistoryFilterValues = {
  search: '', status: 'todos', examType: 'todos', period: 'todos',
};

export function HistoryFeature() {
  const { patientExams } = useExams();

  const [filters, setFilters] = useState<HistoryFilterValues>(INITIAL_FILTERS);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState<SortField>('datetime');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');
  const [selectedExam, setSelectedExam] = useState<HistoryExam | null>(null);

  const allExams = useMemo(() => buildAllExams(patientExams), [patientExams]);

  const examTypes = useMemo(
    () => [...new Set(allExams.map((e) => e.examType))].sort(),
    [allExams]
  );

  const filtered = useMemo(() => {
    const q = filters.search.toLowerCase().trim();
    const list = allExams.filter((exam) => {
      if (q && !exam.patientName.toLowerCase().includes(q) && !exam.id.toLowerCase().includes(q)) return false;
      if (filters.status !== 'todos' && exam.status !== filters.status) return false;
      if (filters.examType !== 'todos' && exam.examType !== filters.examType) return false;
      if (!isWithinPeriod(exam.datetime, filters.period)) return false;
      return true;
    });
    return sortExams(list, sortField, sortDir);
  }, [allExams, filters, sortField, sortDir]);

  const handleFilterChange = <K extends keyof HistoryFilterValues>(
    key: K,
    value: HistoryFilterValues[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  };

  const handleSort = (field: SortField) => {
    setSortDir((prev) => (sortField === field && prev === 'asc' ? 'desc' : 'asc'));
    setSortField(field);
    setPage(0);
  };

  return (
    <>
      <Stack spacing={3}>
        {/* Cabeçalho */}
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <HistoryOutlinedIcon color="primary" />
          <Box>
            <Typography variant="h5" fontWeight={700}>Histórico de Exames</Typography>
            <Typography variant="body2" color="text.secondary">
              {allExams.length} exame(s) registrado(s) no sistema
            </Typography>
          </Box>
        </Stack>

        {/* Card principal */}
        <Card>
          <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
            <HistoryFilters
              values={filters}
              examTypes={examTypes}
              onChange={handleFilterChange}
            />
          </Box>

          <Divider />

          <HistoryTable
            exams={filtered}
            page={page}
            rowsPerPage={rowsPerPage}
            sortField={sortField}
            sortDir={sortDir}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
            onSort={handleSort}
            onViewExam={setSelectedExam}
          />
        </Card>
      </Stack>

      <ExamDetailDrawer
        exam={selectedExam}
        open={!!selectedExam}
        onClose={() => setSelectedExam(null)}
      />
    </>
  );
}
