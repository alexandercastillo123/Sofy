import Grid from '@mui/material/Grid';
import { SubscriptionOverview, SubscriptionPlan } from '../../sofi/domain/account';
import BillingCycleToggle, { BillingCycle } from './BillingCycleToggle';
import PlanCard from './PlanCard';

type PlanGridProps = {
	overview: SubscriptionOverview;
	cycle: BillingCycle;
	onCycleChange: (cycle: BillingCycle) => void;
	isPending: boolean;
	onSelect: (plan: SubscriptionPlan) => void;
};

function PlanGrid({ overview, cycle, onCycleChange, isPending, onSelect }: PlanGridProps) {
	const trial = overview.plans.find((plan) => plan.id === 'trial');
	const paidPlans = overview.plans.filter(
		(plan) => plan.tier !== 'trial' && plan.billingPeriod === cycle
	);
	const visiblePlans = trial ? [trial, ...paidPlans] : paidPlans;

	return (
		<div
			id="planes"
			className="scroll-mt-24"
		>
			<div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
				<div>
					<h2 className="text-xl font-bold tracking-tight">Planes disponibles</h2>
					<p className="text-sm text-text-secondary">
						Elige cómo quieres continuar. Puedes cambiarlo cuando quieras.
					</p>
				</div>
				<BillingCycleToggle
					value={cycle}
					onChange={onCycleChange}
				/>
			</div>

			<Grid
				container
				spacing={2}
			>
				{visiblePlans.map((plan) => (
					<Grid
						key={plan.id}
						size={{ xs: 12, md: 6, lg: 4 }}
					>
						<PlanCard
							plan={plan}
							currentTier={overview.plan.tier}
							isCurrent={plan.id === overview.plan.id}
							isPending={isPending}
							onSelect={onSelect}
						/>
					</Grid>
				))}
			</Grid>
		</div>
	);
}

export default PlanGrid;
