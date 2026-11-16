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
import StatusChip from '../../sofi/components/ui/StatusChip';
import { MiningProject } from '../../sofi/domain/project';
import { summarizeProject } from '../../sofi/domain/projectSummary';
import { formatDate, formatNumber } from '../../sofi/lib/format';

function ProjectTable({ projects }: { projects: MiningProject[] }) {
	return (
		<TableContainer className="min-h-0 flex-auto overflow-auto">
			<Table
				size="small"
				stickyHeader
				className="min-w-[1080px]"
			>
				<TableHead>
					<TableRow>
						<TableCell>Proyecto</TableCell>
						<TableCell>Ubicación</TableCell>
						<TableCell>Coordenada</TableCell>
						<TableCell>Creación</TableCell>
						<TableCell>Estado</TableCell>
						<TableCell align="right">Resumen</TableCell>
						<TableCell align="right">Acciones</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{projects.map((project) => {
						const summary = summarizeProject(project);

						return (
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
											{project.code} · {project.source.app}
										</Typography>
										<div className="mt-1 flex flex-wrap gap-1">
											{project.tags.slice(0, 2).map((tag) => (
												<span
													key={tag}
													className="rounded bg-[var(--mui-palette-action-hover)] px-1.5 py-0.5 text-[10px] text-text-secondary"
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								</TableCell>
								<TableCell>
									<Typography>{project.location.sector}</Typography>
									<Typography
										className="text-sm"
										color="text.secondary"
									>
										{project.location.zone} · {project.location.district}
									</Typography>
								</TableCell>
								<TableCell>
									<Typography className="font-medium tabular-nums">
										E {formatNumber(project.location.coordinates.east, 1)}
									</Typography>
									<Typography
										className="text-sm tabular-nums"
										color="text.secondary"
									>
										N {formatNumber(project.location.coordinates.north, 1)} ·{' '}
										{formatNumber(project.location.coordinates.elevation, 1)} msnm
									</Typography>
								</TableCell>
								<TableCell>
									<Typography>{project.createdBy.name}</Typography>
									<Typography
										className="text-sm"
										color="text.secondary"
									>
										{formatDate(project.createdAt)}
									</Typography>
								</TableCell>
								<TableCell>
									<StatusChip status={project.status} />
								</TableCell>
								<TableCell align="right">
									<Typography className="font-medium tabular-nums">
										{formatNumber(summary.totalTonnage, 0)} Tn
									</Typography>
									<Typography
										className="text-sm tabular-nums"
										color="text.secondary"
									>
										{summary.analysis.label} · {project.input.dip}°
									</Typography>
								</TableCell>
								<TableCell align="right">
									<div className="flex justify-end gap-1">
										<Button
											component={Link}
											to={`/proyectos/${project.id}`}
											size="small"
											className="rounded-lg"
										>
											Detalles
										</Button>
										<Button
											component={Link}
											to={`/proyectos/${project.id}/simulacion-3d`}
											size="small"
											variant="outlined"
											startIcon={
												<FuseSvgIcon size={14}>
													lucide:box
												</FuseSvgIcon>
											}
											className="rounded-lg"
										>
											3D
										</Button>
									</div>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default ProjectTable;
