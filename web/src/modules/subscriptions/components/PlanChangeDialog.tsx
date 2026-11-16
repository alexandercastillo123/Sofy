import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { SubscriptionPlan } from '../../sofi/domain/account';
import { formatUsd, planPriceLabel } from '../../sofi/lib/billing';

type PlanChangeDialogProps = {
	plan: SubscriptionPlan | null;
	isPending: boolean;
	onClose: () => void;
	onConfirm: () => void;
};

function PlanChangeDialog({ plan, isPending, onClose, onConfirm }: PlanChangeDialogProps) {
	return (
		<Dialog
			open={Boolean(plan)}
			onClose={isPending ? undefined : onClose}
			maxWidth="xs"
			fullWidth
		>
			<DialogTitle>Cambiar a {plan?.name}</DialogTitle>
			<DialogContent>
				{plan ? (
					<div className="flex flex-col gap-3">
						<div className="rounded-lg bg-[var(--mui-palette-action-hover)] p-4">
							<Typography
								className="text-[10px] font-semibold tracking-[0.12em] uppercase"
								color="text.secondary"
							>
								Cargo hoy
							</Typography>
							<Typography className="mt-1 text-2xl font-bold">
								{plan.priceUsd === 0 ? 'Gratis' : formatUsd(plan.priceUsd)}
							</Typography>
							<Typography
								className="text-sm"
								color="text.secondary"
							>
								{planPriceLabel(plan)}
							</Typography>
						</div>
						<Typography className="text-sm">
							El plan quedará activo durante {plan.durationDays} días. En este entorno de
							demostración no se realizará ningún cobro real con Culqi.
						</Typography>
						<Typography
							className="text-sm"
							color="text.secondary"
						>
							Podrás conectar la pasarela y revisar el monto final antes de habilitar los pagos.
						</Typography>
					</div>
				) : null}
			</DialogContent>
			<DialogActions className="px-6 pb-5">
				<Button
					onClick={onClose}
					disabled={isPending}
					color="inherit"
				>
					Cancelar
				</Button>
				<Button
					onClick={onConfirm}
					variant="contained"
					disabled={isPending}
				>
					{isPending ? 'Procesando…' : 'Confirmar cambio'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default PlanChangeDialog;
