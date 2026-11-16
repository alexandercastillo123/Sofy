import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import SectionCard from '../../sofi/components/ui/SectionCard';
import { MiningProject } from '../../sofi/domain/project';
import { formatDate } from '../../sofi/lib/format';

function DataBlock({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div>
			<Typography
				className="text-[10px] font-semibold tracking-[0.14em] uppercase"
				color="text.secondary"
			>
				{label}
			</Typography>
			<div className="mt-1">{children}</div>
		</div>
	);
}

function ProjectIdentityCard({ project }: { project: MiningProject }) {
	const { location, createdBy, source } = project;

	return (
		<SectionCard
			title="Cabecera del proyecto"
			subtitle="Información registrada originalmente en campo y sincronizada con la web."
			action={
				<Chip
					size="small"
					icon={
						<span className="ml-2 inline-block h-2 w-2 rounded-full bg-emerald-500" />
					}
					label={source.channel === 'mobile' ? 'Creado en app móvil' : 'Creado en web'}
					variant="outlined"
					className="rounded-md"
				/>
			}
		>
			<div			className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2 lg:grid-cols-4">
				<DataBlock label="Ubicación">
					<Typography className="font-medium">{location.sector}</Typography>
					<Typography color="text.secondary">
						{location.district}, {location.province}
					</Typography>
					<Typography color="text.secondary">
						{location.region} · {location.country}
					</Typography>
				</DataBlock>

				<DataBlock label="Coordenada de referencia">
					<Typography className="font-semibold tabular-nums">
						E {location.coordinates.east.toFixed(1)} · N {location.coordinates.north.toFixed(1)}
					</Typography>
					<Typography
						className="tabular-nums"
						color="text.secondary"
					>
						Cota {location.coordinates.elevation.toFixed(1)} msnm
					</Typography>
					<Typography color="text.secondary">
						{location.utmZone} · {location.datum}
					</Typography>
				</DataBlock>

				<DataBlock label="Creación">
					<Typography className="font-medium">{createdBy.name}</Typography>
					<Typography color="text.secondary">{createdBy.role}</Typography>
					<Typography color="text.secondary">{formatDate(project.createdAt)}</Typography>
				</DataBlock>

				<DataBlock label="Última actualización">
					<Typography className="font-medium">{formatDate(project.updatedAt)}</Typography>
					<Typography color="text.secondary">
						{source.app} · {source.platform}
					</Typography>
					<Typography color="text.secondary">
						{source.syncedAt ? `Sincronizado ${formatDate(source.syncedAt)}` : 'Sin sincronizar'}
					</Typography>
				</DataBlock>
			</div>

			<div className="mt-5 flex flex-wrap gap-1.5 border-t pt-4">
				<Typography
					className="mr-1 self-center text-[10px] font-semibold tracking-[0.14em] uppercase"
					color="text.secondary"
				>
					Etiquetas
				</Typography>
				{project.tags.map((tag) => (
					<Chip
						key={tag}
						size="small"
						label={tag}
						className="rounded-md"
						variant="outlined"
					/>
				))}
			</div>
		</SectionCard>
	);
}

export default ProjectIdentityCard;
