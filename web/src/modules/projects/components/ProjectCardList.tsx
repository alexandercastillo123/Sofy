import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import StatusChip from '../../sofi/components/ui/StatusChip';
import { MiningProject } from '../../sofi/domain/project';
import { summarizeProject } from '../../sofi/domain/projectSummary';
import { formatDate, formatNumber } from '../../sofi/lib/format';

function ProjectCardList({ projects }: { projects: MiningProject[] }) {
	return (
		<div className="flex flex-col gap-3">
			{projects.map((project) => {
				const summary = summarizeProject(project);

				return (
					<Paper
						key={project.id}
						elevation={0}
						className="rounded-xl border p-4"
						sx={{ borderColor: 'divider' }}
					>
						<div className="flex items-start justify-between gap-3">
							<div className="min-w-0">
								<Typography className="font-semibold">{project.name}</Typography>
								<Typography
									className="text-sm"
									color="text.secondary"
								>
									{project.code} · {project.source.app}
								</Typography>
							</div>
							<StatusChip status={project.status} />
						</div>

						<div className="mt-3 grid grid-cols-2 gap-3 text-sm">
							<div>
								<Typography
									className="text-[10px] tracking-[0.12em] uppercase"
									color="text.secondary"
								>
									Ubicación
								</Typography>
								<Typography>{project.location.sector}</Typography>
								<Typography color="text.secondary">{project.location.zone}</Typography>
							</div>
							<div>
								<Typography
									className="text-[10px] tracking-[0.12em] uppercase"
									color="text.secondary"
								>
									Coordenada
								</Typography>
								<Typography className="tabular-nums">
									E {formatNumber(project.location.coordinates.east, 1)}
								</Typography>
								<Typography
									className="tabular-nums"
									color="text.secondary"
								>
									N {formatNumber(project.location.coordinates.north, 1)}
								</Typography>
							</div>
							<div>
								<Typography
									className="text-[10px] tracking-[0.12em] uppercase"
									color="text.secondary"
								>
									Creado por
								</Typography>
								<Typography>{project.createdBy.name}</Typography>
								<Typography color="text.secondary">{formatDate(project.createdAt)}</Typography>
							</div>
							<div>
								<Typography
									className="text-[10px] tracking-[0.12em] uppercase"
									color="text.secondary"
								>
									Resumen
								</Typography>
								<Typography>{formatNumber(summary.totalTonnage, 0)} Tn</Typography>
								<Typography color="text.secondary">
									{summary.analysis.label} · {project.input.dip}°
								</Typography>
							</div>
						</div>

						<div className="mt-4 flex gap-2">
							<Button
								component={Link}
								to={`/proyectos/${project.id}`}
								size="small"
								variant="contained"
								className="flex-auto rounded-lg"
							>
								Ver detalles
							</Button>
							<Button
								component={Link}
								to={`/proyectos/${project.id}/simulacion-3d`}
								size="small"
								variant="outlined"
								startIcon={
									<FuseSvgIcon size={15}>
										lucide:box
									</FuseSvgIcon>
								}
								className="flex-auto rounded-lg"
							>
								Simulación 3D
							</Button>
						</div>
					</Paper>
				);
			})}
		</div>
	);
}

export default ProjectCardList;
