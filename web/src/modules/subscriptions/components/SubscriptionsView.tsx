'use client';

import { useState } from 'react';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import PageHeader from '../../sofi/components/ui/PageHeader';
import SectionCard from '../../sofi/components/ui/SectionCard';
import { useSubscription } from '../../sofi/hooks/useSubscription';
import {
	changeSubscriptionPlan,
	configureCulqiPaymentMethod
} from '../../sofi/api/subscriptions/subscriptionsApi';
import { SubscriptionOverview, SubscriptionPlan } from '../../sofi/domain/account';
import CurrentPlanCard from './CurrentPlanCard';
import PlanGrid from './PlanGrid';
import PaymentMethodCard from './PaymentMethodCard';
import PlanChangeDialog from './PlanChangeDialog';
import { BillingCycle } from './BillingCycleToggle';

function SubscriptionSkeleton() {
	return (
		<div className="flex flex-col gap-4">
			<Skeleton
				variant="rounded"
				height={250}
			/>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				{Array.from({ length: 3 }).map((_, index) => (
					<Skeleton
						key={index}
						variant="rounded"
						height={480}
					/>
				))}
			</div>
		</div>
	);
}

function SubscriptionsView() {
	const { enqueueSnackbar } = useSnackbar();
	const queryClient = useQueryClient();
	const { data: subscription, isLoading, isError } = useSubscription();
	const [cycle, setCycle] = useState<BillingCycle>('monthly');
	const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

	const updateCache = (next: SubscriptionOverview) => {
		queryClient.setQueryData(['sofi', 'subscription'], next);
	};

	const changeMutation = useMutation({
		mutationFn: changeSubscriptionPlan,
		onSuccess: (next) => {
			updateCache(next);
			setSelectedPlan(null);
			enqueueSnackbar(`Plan actualizado a ${next.plan.name}.`, { variant: 'success' });
		},
		onError: () => {
			enqueueSnackbar('No se pudo cambiar el plan. Intenta nuevamente.', { variant: 'error' });
		}
	});

	const paymentMutation = useMutation({
		mutationFn: configureCulqiPaymentMethod,
		onSuccess: (next) => {
			updateCache(next);
			enqueueSnackbar('Culqi quedó configurado en modo demostración.', { variant: 'success' });
		},
		onError: () => {
			enqueueSnackbar('No se pudo configurar Culqi en este entorno.', { variant: 'error' });
		}
	});

	return (
		<div className="flex flex-auto flex-col p-4 md:p-6 lg:p-8">
			<PageHeader
				eyebrow="Cuenta"
				title="Suscripción"
				subtitle="Consulta tu plan, los días restantes y las opciones para continuar usando SOFI."
				actions={
					<Button
						component={Link}
						to="/perfil"
						variant="outlined"
						color="inherit"
						startIcon={<FuseSvgIcon size={16}>lucide:user-round</FuseSvgIcon>}
						className="rounded-lg"
					>
						Mi perfil
					</Button>
				}
			/>

			{isLoading ? (
				<SubscriptionSkeleton />
			) : isError || !subscription ? (
				<SectionCard
					title="No se pudo cargar la suscripción"
					subtitle="La fuente de datos simulada no respondió."
				>
					<Button
						variant="outlined"
						onClick={() => queryClient.invalidateQueries({ queryKey: ['sofi', 'subscription'] })}
						className="self-start rounded-lg"
					>
						Reintentar
					</Button>
				</SectionCard>
			) : (
				<>
					<CurrentPlanCard subscription={subscription} />

					<div className="mt-8">
						<PlanGrid
							overview={subscription}
							cycle={cycle}
							onCycleChange={setCycle}
							isPending={changeMutation.isPending}
							onSelect={setSelectedPlan}
						/>
					</div>

					<div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
						<PaymentMethodCard
							subscription={subscription}
							isConfiguring={paymentMutation.isPending}
							onConfigure={() => paymentMutation.mutate()}
						/>
						<SectionCard
							title="Cómo funciona"
							subtitle="El cambio de plan en el entorno actual."
						>
							<ol className="flex list-decimal flex-col gap-3 pl-4">
								<li>
									<Typography className="font-medium">Elige el plan y la periodicidad.</Typography>
									<Typography
										className="text-sm"
										color="text.secondary"
									>
										Verás el monto antes de confirmar. Los precios están en dólares.
									</Typography>
								</li>
								<li>
									<Typography className="font-medium">Confirma el cambio.</Typography>
									<Typography
										className="text-sm"
										color="text.secondary"
									>
										En este demo el plan se activa al instante y queda guardado en este dispositivo.
									</Typography>
								</li>
								<li>
									<Typography className="font-medium">Configura Culqi para el cobro real.</Typography>
									<Typography
										className="text-sm"
										color="text.secondary"
									>
										La pasarela está preparada, pero la conexión de producción se hará en la siguiente
										etapa.
									</Typography>
								</li>
							</ol>
						</SectionCard>
					</div>
				</>
			)}

			<PlanChangeDialog
				plan={selectedPlan}
				isPending={changeMutation.isPending}
				onClose={() => setSelectedPlan(null)}
				onConfirm={() => selectedPlan && changeMutation.mutate(selectedPlan.id)}
			/>
		</div>
	);
}

export default SubscriptionsView;
