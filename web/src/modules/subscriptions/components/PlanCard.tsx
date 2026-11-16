import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import clsx from 'clsx';
import { PlanTier, SubscriptionPlan } from '../../sofi/domain/account';
import { formatUsd, planMonthlyEquivalent, planPriceLabel } from '../../sofi/lib/billing';

type PlanCardProps = {
	plan: SubscriptionPlan;
	currentTier: PlanTier;
	isCurrent: boolean;
	isPending: boolean;
	onSelect: (plan: SubscriptionPlan) => void;
};

const TIER_ORDER: Record<PlanTier, number> = {
	trial: 0,
	basic: 1,
	premium: 2
};

function getActionLabel(plan: SubscriptionPlan, currentTier: PlanTier, isCurrent: boolean): string {
	if (isCurrent) {
		return 'Plan actual';
	}

	if (plan.id === 'trial') {
		return 'Prueba ya utilizada';
	}

	return TIER_ORDER[plan.tier] > TIER_ORDER[currentTier] ? 'Mejorar plan' : 'Cambiar plan';
}

function PlanCard({ plan, currentTier, isCurrent, isPending, onSelect }: PlanCardProps) {
	const isTrial = plan.id === 'trial';
	const actionLabel = getActionLabel(plan, currentTier, isCurrent);
	const monthlyEquivalent = planMonthlyEquivalent(plan);

	return (
		<Paper
			elevation={0}
			className={clsx(
				'relative flex h-full flex-col rounded-xl border p-5',
				plan.highlighted && 'border-[var(--mui-palette-primary-main)] shadow-md'
			)}
			sx={{ borderColor: plan.highlighted ? 'primary.main' : 'divider' }}
		>
			<div className="flex items-start justify-between gap-2">
				<div>
					<Typography className="text-lg font-bold">{plan.name}</Typography>
					<Typography
						className="mt-1 text-sm"
						color="text.secondary"
					>
						{plan.description}
					</Typography>
				</div>
				{isCurrent ? (
					<Chip
						size="small"
						label="Actual"
						color="success"
						className="rounded-md"
					/>
				) : plan.highlighted ? (
					<Chip
						size="small"
						label="Recomendado"
						color="primary"
						className="rounded-md"
					/>
				) : null}
			</div>

			<div className="mt-5">
				<div className="flex items-baseline gap-1">
					<Typography className="text-3xl font-bold tracking-tight">
						{isTrial ? 'Gratis' : formatUsd(plan.priceUsd)}
					</Typography>
					{!isTrial && (
						<Typography color="text.secondary">
							{plan.billingPeriod === 'annual' ? '/ año' : '/ mes'}
						</Typography>
					)}
				</div>
				<Typography
					className="mt-1 text-sm"
					color="text.secondary"
				>
					{isTrial ? '14 días para probar todo el producto' : planPriceLabel(plan)}
				</Typography>
				{plan.billingPeriod === 'annual' && (
					<Typography
						className="mt-1 text-xs"
						color="text.secondary"
					>
						Equivale a {formatUsd(monthlyEquivalent)} por mes
					</Typography>
				)}
			</div>

			<div className="mt-5 flex flex-1 flex-col gap-2">
				{plan.features.map((feature) => (
					<span
						key={feature}
						className="flex items-start gap-2 text-sm"
					>
						<FuseSvgIcon
							size={16}
							className="mt-0.5 shrink-0 text-green-600"
						>
							lucide:check-circle-2
						</FuseSvgIcon>
						<span>{feature}</span>
					</span>
				))}
			</div>

			{plan.savingsUsd ? (
				<Typography className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 dark:bg-green-950/40 dark:text-green-300">
					Ahorras {formatUsd(plan.savingsUsd)} al año
				</Typography>
			) : null}

			<Button
				variant={isCurrent ? 'outlined' : plan.highlighted ? 'contained' : 'outlined'}
				size="large"
				disabled={isCurrent || isTrial || isPending}
				onClick={() => onSelect(plan)}
				className="mt-5 rounded-lg"
				fullWidth
			>
				{isPending && !isCurrent ? 'Procesando…' : actionLabel}
			</Button>
		</Paper>
	);
}

export default PlanCard;
