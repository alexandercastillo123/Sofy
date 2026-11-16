import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import SectionCard from '../../sofi/components/ui/SectionCard';
import { AccountProfile, SubscriptionOverview } from '../../sofi/domain/account';
import { formatDate } from '../../sofi/lib/format';
import { planPriceLabel } from '../../sofi/lib/billing';

type ProfileIdentityCardProps = {
	profile: AccountProfile;
	subscription: SubscriptionOverview;
};

function ProfileIdentityCard({ profile, subscription }: ProfileIdentityCardProps) {
	const initials = `${profile.firstName[0] ?? ''}${profile.lastName[0] ?? ''}`.toUpperCase();
	const planColor = subscription.plan.tier === 'premium' ? 'secondary' : subscription.plan.tier === 'basic' ? 'primary' : 'default';

	return (
		<SectionCard
			title="Tu cuenta"
			subtitle="Identidad y plan asociado a este dispositivo."
		>
			<div className="flex items-center gap-4">
				<Avatar
					className="h-16 w-16 text-xl font-bold"
					sx={{ bgcolor: 'primary.main' }}
				>
					{initials}
				</Avatar>
				<div className="min-w-0">
					<Typography className="truncate text-lg font-bold">{profile.displayName}</Typography>
					<Typography
						className="truncate"
						color="text.secondary"
					>
						{profile.role}
					</Typography>
					<Typography
						className="truncate"
						color="text.secondary"
					>
						{profile.email}
					</Typography>
				</div>
			</div>

			<Divider className="my-4" />

			<div className="flex flex-wrap items-center gap-2">
				<Chip
					size="small"
					label={subscription.plan.name}
					color={planColor}
					className="rounded-md font-semibold"
				/>
				<Chip
					size="small"
					label={subscription.isTrial ? `Quedan ${subscription.daysRemaining} días` : 'Activa'}
					variant="outlined"
					className="rounded-md"
				/>
			</div>

			<div className="mt-4 grid grid-cols-2 gap-3 text-sm">
				<div>
					<Typography
						className="text-[10px] font-semibold tracking-[0.12em] uppercase"
						color="text.secondary"
					>
						Empresa
					</Typography>
					<Typography>{profile.company}</Typography>
				</div>
				<div>
					<Typography
						className="text-[10px] font-semibold tracking-[0.12em] uppercase"
						color="text.secondary"
					>
						Miembro desde
					</Typography>
					<Typography>{formatDate(profile.memberSince)}</Typography>
				</div>
				<div>
					<Typography
						className="text-[10px] font-semibold tracking-[0.12em] uppercase"
						color="text.secondary"
					>
						Plan
					</Typography>
					<Typography>{planPriceLabel(subscription.plan)}</Typography>
				</div>
				<div>
					<Typography
						className="text-[10px] font-semibold tracking-[0.12em] uppercase"
						color="text.secondary"
					>
						Renovación
					</Typography>
					<Typography>{formatDate(subscription.renewalDate)}</Typography>
				</div>
			</div>
		</SectionCard>
	);
}

export default ProfileIdentityCard;
