import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import SectionCard from '../../sofi/components/ui/SectionCard';
import StatusChip from '../../sofi/components/ui/StatusChip';
import { CurrencyOption, SofiProject } from '../../sofi/domain/types';
import { formatDate, formatMoney, formatNumber } from '../../sofi/lib/format';

type RecentProjectsTableProps = {
	projects: SofiProject[];
	currency: CurrencyOption;
};

function RecentProjectsTable({ projects, currency }: RecentProjectsTableProps) {
	return (
		<SectionCard
			className="lg:col-span-2"
			title="Proyectos recientes"
			subtitle="Últimos análisis registrados por el equipo"
			action={
				<Button
					component={Link}
					to="/proyectos"
					size="small"
					endIcon={<FuseSvgIcon size={14}>lucide:arrow-right</FuseSvgIcon>}
				>
					Ver proyectos
				</Button>
			}
			contentClassName="pt-0"
		>
			<TableContainer className="min-h-0 flex-auto overflow-auto">
				<Table
					size="small"
					stickyHeader
				>
					<TableHead>
						<TableRow>
							<TableCell>Proyecto</TableCell>
							<TableCell>Zona</TableCell>
							<TableCell align="right">Rumbo</TableCell>
							<TableCell>Estado</TableCell>
							<TableCell align="right">Tonelaje</TableCell>
							<TableCell align="right">Inversión</TableCell>
							<TableCell>Actualizado</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{projects.map((project) => (
							<TableRow
								key={project.id}
								hover
							>
								<TableCell>
									<div className="flex flex-col">
										<Typography className="font-semibold">{project.name}</Typography>
										<Typography
											className="text-sm"
											color="text.secondary"
										>
											{project.code} · {project.analyst}
										</Typography>
									</div>
								</TableCell>
								<TableCell>{project.zone}</TableCell>
								<TableCell align="right">{formatNumber(project.strike, 1)}°</TableCell>
								<TableCell>
									<StatusChip status={project.status} />
								</TableCell>
								<TableCell align="right">{formatNumber(project.tonnage, 0)} Tn</TableCell>
								<TableCell align="right">{formatMoney(project.cost, currency)}</TableCell>
								<TableCell>
									<Typography color="text.secondary">{formatDate(project.updatedAt)}</Typography>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</SectionCard>
	);
}

export default RecentProjectsTable;
