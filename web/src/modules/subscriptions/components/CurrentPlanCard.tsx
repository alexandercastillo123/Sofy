import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { SubscriptionOverview, SubscriptionStatus } from '../../sofi/domain/account';
import { formatDate } from '../../sofi/lib/format';
import { planPriceLabel } from '../../sofi/lib/billing';

const STATUS_LABEL: Record<SubscriptionStatus, string> = {
	trialing: 'Prueba gratuita',
	active: 'Activa',
	past_due: 'Pago pendiente',
	canceled: 'Cancelada'
};

function CurrentPlanCard({ subscription }: { subscription: SubscriptionOverview }) {
	const { plan, daysElapsed, daysRemaining, progress, renewalDate, isTrial } = subscription;
	const { status, paymentMethod, autoRenew } = subscription.subscription;

	return (
		<Paper
			elevation={0}
			className="overflow-hidden rounded-xl border p-5 md:p-6"
			sx={{
				borderColor: 'divider',
				background:
					'linear-gradient(135deg, rgba(47,125,246,0.16) 0%, rgba(99,102,241,0.10) 45%, rgba(15,23,42,0.02) 100%)'
			}}
		>
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center">
				<div>
					<div className="flex flex-wrap items-center gap-2">
						<Typography
							className="text-[11px] font-semibold tracking-[0.15em] uppercase"
							color="primary"
						>
							Plan actual
						</Typography>
						<Chip
							size="small"
							label={STATUS_LABEL[status]}
							color={isTrial ? 'warning' : status === 'active' ? 'success' : 'default'}
							variant="outlined"
							className="rounded-md"
						/>
					</div>
					<Typography className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
						{plan.name}
					</Typography>
					<Typography
						className="mt-1"
						color="text.secondary"
					>
						{planPriceLabel(plan)} ·{' '}
						{isTrial
							? `termina el ${formatDate(renewalDate)}`
							: autoRenew
								? `se renueva el ${formatDate(renewalDate)}`
								: `vence el ${formatDate(renewalDate)}`}
					</Typography>

					<div className="mt-5 max-w-xl">
						<div className="mb-1 flex items-center justify-between text-sm">
							<Typography color="text.secondary">{daysElapsed} días transcurridos</Typography>
							<Typography className="font-semibold">{daysRemaining} días restantes</Typography>
						</div>
						<LinearProgress
							variant="determinate"
							value={progress}
							className="h-2 rounded-full"
							color={daysRemaining <= 3 ? 'warning' : 'primary'}
						/>
					</div>

					<div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
						<span className="flex items-center gap-1.5">
							<FuseSvgIcon
								size={15}
								className={paymentMethod.status === 'active' ? 'text-green-600' : 'text-text-secondary'}
							>
								lucide:credit-card
							</FuseSvgIcon>
							<Typography color="text.secondary">
								{paymentMethod.status === 'active' ? 'Culqi configurado' : 'Culqi pendiente'}
							</Typography>
						</span>
						<span className="flex items-center gap-1.5">
							<FuseSvgIcon
								size={15}
								className="text-text-secondary"
							>
								lucide:calendar-days
							</FuseSvgIcon>
							<Typography color="text.secondary">
								{formatDate(subscription.subscription.startedAt)} — {formatDate(renewalDate)}
							</Typography>
						</span>
					</div>
				</div>

				<div className="rounded-xl border bg-[var(--mui-palette-background-paper)] p-5">
					<Typography className="text-[11px] font-semibold tracking-[0.12em] uppercase text-text-secondary">
						{isTrial ? 'Para continuar' : '¿Quieres cambiar?'}
					</Typography>
					<Typography className="mt-1 text-lg font-bold">
						{isTrial ? 'Elige un plan antes del vencimiento' : 'Mejora o ajusta tu plan'}
					</Typography>
					<Typography
						className="mt-1 text-sm"
						color="text.secondary"
					>
						{isTrial
							? 'No se realizará ningún cobro hasta que confirmes un plan y configures Culqi.'
							: 'El cambio se aplica de inmediato en este entorno de demostración.'}
					</Typography>
					<Button
						component="a"
						href="#planes"
						variant="contained"
						startIcon={<FuseSvgIcon size={16}>lucide:arrow-down</FuseSvgIcon>}
						className="mt-4 rounded-lg"
						fullWidth
					>
						{isTrial ? 'Ver planes' : 'Cambiar plan'}
					</Button>
				</div>
			</div>
		</Paper>
	);
}

export default CurrentPlanCard;
