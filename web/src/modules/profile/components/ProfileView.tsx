'use client';

import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import PageHeader from '../../sofi/components/ui/PageHeader';
import SectionCard from '../../sofi/components/ui/SectionCard';
import useAuth from '@/contexts/auth/useAuth';
import { useProfile } from '../../sofi/hooks/useProfile';
import { useSubscription } from '../../sofi/hooks/useSubscription';
import { updateProfile } from '../../sofi/api/profile/profileApi';
import { AccountProfile } from '../../sofi/domain/account';
import { ProfileFormValues, toProfileUpdate } from '../model/profileSchema';
import ProfileIdentityCard from './ProfileIdentityCard';
import ProfileForm from './ProfileForm';
import SecurityCard from './SecurityCard';
import SubscriptionSummaryCard from './SubscriptionSummaryCard';

function ProfileSkeleton() {
	return (
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
			<div className="flex flex-col gap-4">
				<Skeleton
					variant="rounded"
					height={360}
				/>
				<Skeleton
					variant="rounded"
					height={300}
				/>
			</div>
			<div className="flex flex-col gap-4">
				<Skeleton
					variant="rounded"
					height={420}
				/>
				<Skeleton
					variant="rounded"
					height={180}
				/>
			</div>
		</div>
	);
}

function ProfileView() {
	const { updateUser } = useAuth();
	const { enqueueSnackbar } = useSnackbar();
	const queryClient = useQueryClient();
	const { data: profile, isLoading: profileLoading, isError } = useProfile();
	const { data: subscription, isLoading: subscriptionLoading } = useSubscription();

	const mutation = useMutation({
		mutationFn: updateProfile,
		onSuccess: (next: AccountProfile) => {
			queryClient.setQueryData(['sofi', 'profile'], next);
			updateUser({ displayName: next.displayName, email: next.email });
			enqueueSnackbar('Datos de perfil actualizados.', { variant: 'success' });
		},
		onError: () => {
			enqueueSnackbar('No se pudieron guardar los cambios.', { variant: 'error' });
		}
	});

	const handleSubmit = async (values: ProfileFormValues) => {
		await mutation.mutateAsync(toProfileUpdate(values));
	};

	return (
		<div className="flex flex-auto flex-col p-4 md:p-6 lg:p-8">
			<PageHeader
				eyebrow="Cuenta"
				title="Mi perfil"
				subtitle="Administra tus datos, la seguridad de la cuenta y el plan con el que estás usando SOFI."
				actions={
					<Button
						component={Link}
						to="/suscripciones"
						variant="contained"
						startIcon={<FuseSvgIcon size={16}>lucide:credit-card</FuseSvgIcon>}
						className="rounded-lg"
					>
						Ver suscripción
					</Button>
				}
			/>

			{profileLoading || subscriptionLoading ? (
				<ProfileSkeleton />
			) : isError || !profile || !subscription ? (
				<SectionCard
					title="No se pudo cargar el perfil"
					subtitle="La fuente de datos simulada no respondió."
				>
					<Button
						variant="outlined"
						onClick={() => queryClient.invalidateQueries({ queryKey: ['sofi', 'profile'] })}
						className="self-start rounded-lg"
					>
						Reintentar
					</Button>
				</SectionCard>
			) : (
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
					<div className="flex flex-col gap-4">
						<ProfileIdentityCard
							profile={profile}
							subscription={subscription}
						/>
						<SubscriptionSummaryCard subscription={subscription} />
					</div>
					<div className="flex flex-col gap-4">
						<ProfileForm
							profile={profile}
							isSaving={mutation.isPending}
							onSubmit={handleSubmit}
						/>
						<SecurityCard />
					</div>
				</div>
			)}
		</div>
	);
}

export default ProfileView;
