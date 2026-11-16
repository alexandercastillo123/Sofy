'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import PageHeader from '../../sofi/components/ui/PageHeader';
import SectionCard from '../../sofi/components/ui/SectionCard';
import StatCard from '../../sofi/components/ui/StatCard';
import useSofiWorkspace from '../../sofi/contexts/useSofiWorkspace';
import { CURRENCY_OPTIONS } from '../../sofi/data/defaults';
import { formatDateTime } from '../../sofi/lib/format';
import HistoryTable from './HistoryTable';

function HistoryView() {
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();
	const { history, saveCurrentAnalysis, loadHistoryEntry, deleteHistoryEntry } = useSofiWorkspace();
	const [query, setQuery] = useState('');
	const currency = CURRENCY_OPTIONS[0];

	const filteredEntries = useMemo(() => {
		const term = query.trim().toLowerCase();

		if (!term) {
			return history;
		}

		return history.filter((entry) =>
			[entry.name, entry.strikeLabel, entry.zone, entry.caseId].some((value) =>
				value.toLowerCase().includes(term)
			)
		);
	}, [history, query]);

	const latestEntry = history[0];

	const handleSaveCurrent = () => {
		const entry = saveCurrentAnalysis();
		enqueueSnackbar(`Cálculo guardado en historial: ${entry.name}`, { variant: 'success' });
	};

	const handleReuse = (id: string) => {
		const entry = loadHistoryEntry(id);

		if (!entry) {
			enqueueSnackbar('No se encontró el cálculo seleccionado.', { variant: 'error' });
			return;
		}

		enqueueSnackbar(`Cálculo cargado: ${entry.name}`, { variant: 'success' });
		router.push('/rumbo-de-veta');
	};

	const handleDelete = (id: string) => {
		deleteHistoryEntry(id);
		enqueueSnackbar('Cálculo eliminado del historial.', { variant: 'info' });
	};

	return (
		<div className="flex flex-auto flex-col p-4 md:p-6 lg:p-8">
			<PageHeader
				eyebrow="Trazabilidad"
				title="Historial de cálculos"
				subtitle="Recupera análisis anteriores con todos sus datos de entrada para recalcular o comparar sin volver a escribirlos."
				actions={
					<>
						<Button
							variant="outlined"
							color="inherit"
							startIcon={<FuseSvgIcon size={16}>lucide:bookmark-plus</FuseSvgIcon>}
							className="rounded-lg"
							onClick={handleSaveCurrent}
						>
							Guardar actual
						</Button>
						<Button
							component={Link}
							to="/rumbo-de-veta"
							variant="contained"
							startIcon={<FuseSvgIcon size={16}>lucide:plus</FuseSvgIcon>}
							className="rounded-lg"
						>
							Nuevo análisis
						</Button>
					</>
				}
			/>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard
					label="Cálculos guardados"
					value={`${history.length}`}
					hint="Máximo 50 en este dispositivo"
					icon="lucide:history"
					accent="primary"
				/>
				<StatCard
					label="Último cálculo"
					value={latestEntry ? latestEntry.strikeLabel : '—'}
					hint={latestEntry ? formatDateTime(new Date(latestEntry.createdAt)) : 'Sin registros'}
					icon="lucide:compass"
					accent="info"
				/>
				<StatCard
					label="Buzamiento del último"
					value={latestEntry ? `${latestEntry.dip}° / ${latestEntry.dipDirection}` : '—'}
					hint="Dirección de inclinación"
					icon="lucide:trending-down"
					accent="warning"
				/>
				<StatCard
					label="Coincidencias"
					value={`${filteredEntries.length}`}
					hint={query ? `Filtro: ${query}` : 'Sin filtro de búsqueda'}
					icon="lucide:search"
					accent="success"
				/>
			</div>

			<SectionCard
				className="mt-4"
				title="Cálculos anteriores"
				subtitle="Cada registro conserva coordenadas, geometría, sección, roca y voladura."
				contentClassName="pt-0"
				action={
					<TextField
						size="small"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Buscar por veta, rumbo o zona"
						className="min-w-64"
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<FuseSvgIcon size={16}>lucide:search</FuseSvgIcon>
									</InputAdornment>
								)
							}
						}}
					/>
				}
			>
				{filteredEntries.length ? (
					<HistoryTable
						entries={filteredEntries}
						currency={currency}
						onReuse={handleReuse}
						onDelete={handleDelete}
					/>
				) : (
					<div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
						<FuseSvgIcon
							size={32}
							className="text-text-secondary"
						>
							lucide:history
						</FuseSvgIcon>
						<Typography className="font-semibold">
							{history.length ? 'No hay coincidencias' : 'Todavía no hay cálculos guardados'}
						</Typography>
						<Typography color="text.secondary">
							{history.length
								? 'Prueba con otro nombre, rumbo o zona.'
								: 'Usa “Guardar actual” o guarda desde Rumbo de Veta para empezar.'}
						</Typography>
					</div>
				)}
			</SectionCard>
		</div>
	);
}

export default HistoryView;
