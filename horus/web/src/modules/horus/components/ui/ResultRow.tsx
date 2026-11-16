import Typography from '@mui/material/Typography';
import clsx from 'clsx';

type ResultRowProps = {
	label: string;
	value: string;
	unit?: string;
	highlight?: boolean;
	className?: string;
};

function ResultRow({ label, value, unit, highlight, className }: ResultRowProps) {
	return (
		<div
			className={clsx(
				'flex items-center justify-between gap-4 border-b border-dashed border-gray-300 py-2 last:border-0 dark:border-gray-700',
				highlight && 'border-solid',
				className
			)}
		>
			<Typography color="text.secondary">{label}</Typography>
			<div className="flex items-baseline gap-1">
				<Typography
					color={highlight ? 'primary' : 'inherit'}
					className="font-semibold tabular-nums"
				>
					{value}
				</Typography>
				{unit && (
					<Typography
						className="text-sm"
						color="text.secondary"
					>
						{unit}
					</Typography>
				)}
			</div>
		</div>
	);
}

export default ResultRow;
