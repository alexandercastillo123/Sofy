import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import SectionCard from '../../sofi/components/ui/SectionCard';
import { SubscriptionOverview } from '../../sofi/domain/account';
import { formatDate } from '../../sofi/lib/format';
import { planPriceLabel } from '../../sofi/lib/billing';

function SubscriptionSummaryCard({ subscription }: { subscription: SubscriptionOverview }) {
	const { plan, daysElapsed, daysRemaining, progress, subscription: current } = subscription;
	const { paymentMethod } = current;

	return (
		<SectionCard
			title="Suscripción"
			subtitle="Estado del plan y tiempo restante."
			action={
				<Chip
					size="small"
					label={subscription.isTrial ? 'Prueba' : 'Activa'}
					color={subscription.isTrial ? 'warning' : 'success'}
					className="rounded-md"
					variant="outlined"
				/>
			}
		>
			<div className="flex items-end justify-between gap-3">
				<div>
					<Typography className="text-lg font-bold">{plan.name}</Typography>
					<Typography
						className="text-sm"
						color="text.secondary"
					>
						{planPriceLabel(plan)}
					</Typography>
				</div>
				<div className="text-right">
					<Typography className="text-2xl font-bold tracking-tight">{daysRemaining}</Typography>
					<Typography
						className="text-[10px] tracking-[0.12em] uppercase"
						color="text.secondary"
					>
						días restantes
					</Typography>
				</div>
			</div>

			<LinearProgress
				variant="determinate"
				value={progress}
				className="mt-4 h-2 rounded-full"
			/>
			<div className="mt-1 flex justify-between">
				<Typography
					className="text-xs"
					color="text.secondary"
				>
					{daysElapsed} días transcurridos
				</Typography>
				<Typography
					className="text-xs"
					color="text.secondary"
				>
					{formatDate(subscription.renewalDate)}
				</Typography>
			</div>

			<div className="mt-4 rounded-lg bg-[var(--mui-palette-action-hover)] p-3">
				<Typography className="text-sm font-semibold">
					{paymentMethod.status === 'active' ? 'Culqi configurado' : 'Pago pendiente de configurar'}
				</Typography>
				<Typography
					className="text-xs"
					color="text.secondary"
				>
					{paymentMethod.status === 'active'
						? 'Pasarela lista en modo demostración. No se realizan cobros reales.'
						: 'Configura Culqi para continuar cuando termine la prueba.'}
				</Typography>
			</div>

			<Button
				component={Link}
				to="/suscripciones"
				variant="contained"
				startIcon={
					<FuseSvgIcon size={16}>
						{subscription.isTrial ? 'lucide:sparkles' : 'lucide:credit-card'}
					</FuseSvgIcon>
				}
				className="mt-4 self-start rounded-lg"
			>
				{subscription.isTrial ? 'Elegir un plan' : 'Gestionar suscripción'}
			</Button>
		</SectionCard>
	);
}

export default SubscriptionSummaryCard;
