import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import SectionCard from '../../sofi/components/ui/SectionCard';
import { SubscriptionOverview } from '../../sofi/domain/account';

type PaymentMethodCardProps = {
	subscription: SubscriptionOverview;
	isConfiguring: boolean;
	onConfigure: () => void;
};

function PaymentMethodCard({ subscription, isConfiguring, onConfigure }: PaymentMethodCardProps) {
	const { paymentMethod } = subscription.subscription;
	const isActive = paymentMethod.status === 'active';

	return (
		<SectionCard
			title="Método de pago"
			subtitle="Culqi es la pasarela prevista para los cobros."
			action={
				<Chip
					size="small"
					label={isActive ? 'Listo (demo)' : 'Pendiente'}
					color={isActive ? 'success' : 'warning'}
					variant="outlined"
					className="rounded-md"
				/>
			}
		>
			<div className="flex items-start gap-3">
				<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--mui-palette-action-hover)]">
					<FuseSvgIcon size={20}>lucide:credit-card</FuseSvgIcon>
				</div>
				<div>
					<Typography className="font-semibold">Culqi · tarjeta</Typography>
					<Typography
						className="text-sm"
						color="text.secondary"
					>
						Tarjetas de crédito y débito. El cobro real se habilitará cuando se conecten las llaves de
						producción.
					</Typography>
				</div>
			</div>

			<div className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
				<span className="rounded-lg bg-[var(--mui-palette-action-hover)] px-3 py-2">Cobro en US$</span>
				<span className="rounded-lg bg-[var(--mui-palette-action-hover)] px-3 py-2">Pago seguro</span>
				<span className="rounded-lg bg-[var(--mui-palette-action-hover)] px-3 py-2">Facturación automática</span>
			</div>

			<div className="mt-4 flex flex-wrap items-center justify-between gap-3">
				<Typography
					className="text-sm"
					color="text.secondary"
				>
					No se realizará ningún cargo en este entorno.
				</Typography>
				<Button
					variant={isActive ? 'outlined' : 'contained'}
					disabled={isConfiguring || isActive}
					onClick={onConfigure}
					startIcon={<FuseSvgIcon size={16}>lucide:shield-check</FuseSvgIcon>}
					className="rounded-lg"
				>
					{isActive ? 'Culqi ya configurado' : isConfiguring ? 'Configurando…' : 'Configurar Culqi (demo)'}
				</Button>
			</div>
		</SectionCard>
	);
}

export default PaymentMethodCard;
