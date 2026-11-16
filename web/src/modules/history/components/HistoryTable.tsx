import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { CurrencyOption, HistoryEntry } from '../../sofi/domain/types';
import { formatDateTime, formatMoney, formatNumber } from '../../sofi/lib/format';

type HistoryTableProps = {
	entries: HistoryEntry[];
	currency: CurrencyOption;
	onReuse: (id: string) => void;
	onDelete: (id: string) => void;
};

function HistoryTable({ entries, currency, onReuse, onDelete }: HistoryTableProps) {
	return (
		<TableContainer className="min-h-0 flex-auto overflow-auto">
			<Table
				size="small"
				stickyHeader
			>
				<TableHead>
					<TableRow>
						<TableCell>Cálculo</TableCell>
						<TableCell>Fecha</TableCell>
						<TableCell align="right">Rumbo</TableCell>
						<TableCell align="right">Buz.</TableCell>
						<TableCell align="right">Perp.</TableCell>
						<TableCell align="right">Diag.</TableCell>
						<TableCell align="right">Tonelaje</TableCell>
						<TableCell align="right">Inversión</TableCell>
						<TableCell align="center">Acciones</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{entries.map((entry) => (
						<TableRow
							key={entry.id}
							hover
						>
							<TableCell>
								<div className="flex flex-col">
									<Typography className="font-semibold">{entry.name}</Typography>
									<Typography
										className="text-sm"
										color="text.secondary"
									>
										{entry.caseId} · {entry.zone}
									</Typography>
								</div>
							</TableCell>
							<TableCell>
								<Typography color="text.secondary">{formatDateTime(new Date(entry.createdAt))}</Typography>
							</TableCell>
							<TableCell align="right">{entry.strikeLabel}</TableCell>
							<TableCell align="right">{formatNumber(entry.dip, 0)}°</TableCell>
							<TableCell align="right">{formatNumber(entry.perpendicularDistance, 1)} m</TableCell>
							<TableCell align="right">{formatNumber(entry.diagonalDistance, 1)} m</TableCell>
							<TableCell align="right">{formatNumber(entry.tonnage, 0)} Tn</TableCell>
							<TableCell align="right">{formatMoney(entry.cost, currency)}</TableCell>
							<TableCell align="center">
								<div className="flex items-center justify-center gap-1">
									<Button
										size="small"
										variant="text"
										startIcon={<FuseSvgIcon size={14}>lucide:rotate-ccw</FuseSvgIcon>}
										onClick={() => onReuse(entry.id)}
									>
										Reutilizar
									</Button>
									<Tooltip title="Eliminar del historial">
										<IconButton
											size="small"
											color="error"
											onClick={() => onDelete(entry.id)}
											aria-label={`Eliminar ${entry.name}`}
										>
											<FuseSvgIcon size={16}>lucide:trash-2</FuseSvgIcon>
										</IconButton>
									</Tooltip>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default HistoryTable;
