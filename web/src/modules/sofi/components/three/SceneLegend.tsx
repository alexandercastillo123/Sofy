import Typography from '@mui/material/Typography';

const ITEMS = [
	{ label: 'Plano de veta', color: '#2f7df6' },
	{ label: 'Frente', color: '#f59e0b' },
	{ label: 'Perpendicular (EP)', color: '#22c55e' },
	{ label: 'Diagonal (PC)', color: '#6366f1' }
];

function SceneLegend() {
	return (
		<div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
			{ITEMS.map((item) => (
				<span
					key={item.label}
					className="flex items-center gap-1.5"
				>
					<span
						className="inline-block h-2 w-2 rounded-full"
						style={{ backgroundColor: item.color }}
					/>
					<Typography
						color="text.secondary"
						className="text-xs"
					>
						{item.label}
					</Typography>
				</span>
			))}
		</div>
	);
}

export default SceneLegend;
