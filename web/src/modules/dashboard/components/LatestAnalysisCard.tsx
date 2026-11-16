import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import SectionCard from '../../sofi/components/ui/SectionCard';
import { ProjectResult, VeinAnalysis, VeinInput } from '../../sofi/domain/types';
import { formatNumber } from '../../sofi/lib/format';

type LatestAnalysisCardProps = {
	analysis: VeinAnalysis;
	input: VeinInput;
	projects: ProjectResult[];
};

function LatestAnalysisCard({ analysis, input, projects }: LatestAnalysisCardProps) {
	return (
		<SectionCard
			title="Último análisis"
			subtitle="Workspace activo compartido entre módulos"
		>
			<Box
				className="mb-4 rounded-lg p-4"
				sx={(theme) => ({
					backgroundColor: theme.palette.action.hover
				})}
			>
				<Typography
					className="text-[11px] font-semibold tracking-[0.12em] uppercase"
					color="text.secondary"
				>
					Rumbo de veta
				</Typography>
				<Typography className="mt-1 text-3xl font-bold tracking-tight">{analysis.label}</Typography>
				<Typography
					className="mt-1"
					color="text.secondary"
				>
					{analysis.caseId} · {analysis.zone} · Formato {analysis.format} · Buzamiento {input.dip}° hacia{' '}
					{analysis.dipDirection}
				</Typography>
			</Box>

			<div className="grid grid-cols-2 gap-3">
				<div className="rounded-lg border p-3">
					<Typography
						color="text.secondary"
						className="text-[11px] tracking-wide uppercase"
					>
						Perpendicular
					</Typography>
					<Typography className="mt-1 text-lg font-semibold">
						{formatNumber(projects[0].distance, 1)} m
					</Typography>
					<Typography color="text.secondary">{formatNumber(projects[0].tonnage, 0)} Tn</Typography>
				</div>
				<div className="rounded-lg border p-3">
					<Typography
						color="text.secondary"
						className="text-[11px] tracking-wide uppercase"
					>
						Diagonal
					</Typography>
					<Typography className="mt-1 text-lg font-semibold">
						{formatNumber(projects[1].distance, 1)} m
					</Typography>
					<Typography color="text.secondary">{formatNumber(projects[1].tonnage, 0)} Tn</Typography>
				</div>
			</div>

			<Button
				component={Link}
				to="/resultados-3d"
				variant="outlined"
				fullWidth
				className="mt-4 rounded-lg"
				startIcon={<FuseSvgIcon size={16}>lucide:box</FuseSvgIcon>}
			>
				Abrir resultados 3D
			</Button>
		</SectionCard>
	);
}

export default LatestAnalysisCard;
