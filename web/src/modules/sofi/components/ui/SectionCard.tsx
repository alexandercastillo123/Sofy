import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import clsx from 'clsx';

type SectionCardProps = {
	title?: string;
	subtitle?: string;
	action?: ReactNode;
	children: ReactNode;
	className?: string;
	contentClassName?: string;
};

function SectionCard({ title, subtitle, action, children, className, contentClassName }: SectionCardProps) {
	return (
		<Paper
			elevation={0}
			className={clsx('flex flex-col rounded-xl border', className)}
			sx={{ borderColor: 'divider', backgroundColor: 'background.paper' }}
		>
			{(title || action) && (
				<div className="flex items-start justify-between gap-4 px-5 pt-5 pb-3">
					<div className="min-w-0">
						{title && <Typography className="text-lg font-semibold tracking-tight">{title}</Typography>}
						{subtitle && (
							<Typography
								className="mt-0.5"
								color="text.secondary"
							>
								{subtitle}
							</Typography>
						)}
					</div>
					{action}
				</div>
			)}
			<div className={clsx('flex min-h-0 flex-auto flex-col px-5 pt-2 pb-5', contentClassName)}>{children}</div>
		</Paper>
	);
}

export default SectionCard;
