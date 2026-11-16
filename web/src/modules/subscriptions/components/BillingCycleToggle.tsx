import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

export type BillingCycle = 'monthly' | 'annual';

type BillingCycleToggleProps = {
	value: BillingCycle;
	onChange: (value: BillingCycle) => void;
};

function BillingCycleToggle({ value, onChange }: BillingCycleToggleProps) {
	return (
		<div className="flex flex-col items-start gap-2">
			<ToggleButtonGroup
				value={value}
				exclusive
				size="small"
				onChange={(_, next: BillingCycle | null) => next && onChange(next)}
			>
				<ToggleButton
					value="monthly"
					className="px-4"
				>
					Mensual
				</ToggleButton>
				<ToggleButton
					value="annual"
					className="px-4"
				>
					Anual
				</ToggleButton>
			</ToggleButtonGroup>
			<Typography
				className="text-xs"
				color="text.secondary"
			>
				El plan anual equivale a dos meses de ahorro.
			</Typography>
		</div>
	);
}

export default BillingCycleToggle;
