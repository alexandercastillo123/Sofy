import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import clsx from 'clsx';

type PageHeaderProps = {
	title: string;
	subtitle?: string;
	eyebrow?: string;
	actions?: ReactNode;
	className?: string;
};

function PageHeader({ title, subtitle, eyebrow, actions, className }: PageHeaderProps) {
	return (
		<div className={clsx('mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between', className)}>
			<div className="min-w-0">
				{eyebrow && (
					<Typography
						color="primary"
						className="mb-1 text-[11px] font-semibold tracking-[0.18em] uppercase"
					>
						{eyebrow}
					</Typography>
				)}
				<Typography className="text-2xl font-bold tracking-tight md:text-3xl">{title}</Typography>
				{subtitle && (
					<Typography
						className="mt-1 max-w-2xl"
						color="text.secondary"
					>
						{subtitle}
					</Typography>
				)}
			</div>
			{actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
		</div>
	);
}

export default PageHeader;
