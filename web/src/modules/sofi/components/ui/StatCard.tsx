import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { alpha } from '@mui/material/styles';
import { ReactNode } from 'react';

type StatCardProps = {
	label: string;
	value: string;
	hint?: string;
	icon: string;
	accent?: 'primary' | 'success' | 'warning' | 'info';
	footer?: ReactNode;
};

function StatCard({ label, value, hint, icon, accent = 'primary', footer }: StatCardProps) {
	return (
		<Paper
			elevation={0}
			className="flex flex-col rounded-xl border p-5"
			sx={{ borderColor: 'divider', backgroundColor: 'background.paper' }}
		>
			<div className="flex items-start justify-between gap-3">
				<div className="min-w-0">
					<Typography
						className="text-[11px] font-semibold tracking-[0.12em] uppercase"
						color="text.secondary"
					>
						{label}
					</Typography>
					<Typography className="mt-2 truncate text-2xl font-bold tracking-tight">{value}</Typography>
					{hint && (
						<Typography
							className="mt-1"
							color="text.secondary"
						>
							{hint}
						</Typography>
					)}
				</div>
				<Box
					className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
					sx={(theme) => ({
						backgroundColor: alpha(theme.palette[accent].main, 0.12),
						color: `${accent}.main`
					})}
				>
					<FuseSvgIcon size={20}>{icon}</FuseSvgIcon>
				</Box>
			</div>
			{footer && <div className="mt-4 border-t border-gray-300 pt-3 dark:border-gray-700">{footer}</div>}
		</Paper>
	);
}

export default StatCard;
