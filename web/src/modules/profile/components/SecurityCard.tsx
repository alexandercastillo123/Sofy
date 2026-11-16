'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import SectionCard from '../../sofi/components/ui/SectionCard';
import { changePassword } from '../../sofi/api/profile/profileApi';
import { PasswordFormValues, passwordSchema } from '../model/profileSchema';

function SecurityCard() {
	const { enqueueSnackbar } = useSnackbar();
	const [isSaving, setIsSaving] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<PasswordFormValues>({
		resolver: zodResolver(passwordSchema),
		defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' }
	});

	const onSubmit = async (values: PasswordFormValues) => {
		setIsSaving(true);
		const result = await changePassword(values.currentPassword, values.newPassword);
		setIsSaving(false);

		if (result.ok) {
			reset();
			enqueueSnackbar('Contraseña actualizada en el entorno de demostración.', { variant: 'success' });
		} else {
			enqueueSnackbar('No se pudo actualizar la contraseña. Revisa los datos.', { variant: 'error' });
		}
	};

	return (
		<SectionCard
			title="Seguridad"
			subtitle="Cambia la contraseña de acceso a tu cuenta."
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<TextField
						label="Contraseña actual"
						type="password"
						autoComplete="current-password"
						size="small"
						error={Boolean(errors.currentPassword)}
						helperText={errors.currentPassword?.message}
						{...register('currentPassword')}
					/>
					<TextField
						label="Nueva contraseña"
						type="password"
						autoComplete="new-password"
						size="small"
						error={Boolean(errors.newPassword)}
						helperText={errors.newPassword?.message}
						{...register('newPassword')}
					/>
					<TextField
						label="Confirmar contraseña"
						type="password"
						autoComplete="new-password"
						size="small"
						error={Boolean(errors.confirmPassword)}
						helperText={errors.confirmPassword?.message}
						{...register('confirmPassword')}
					/>
				</div>
				<div className="flex flex-wrap items-center justify-between gap-3">
					<Typography
						className="text-sm"
						color="text.secondary"
					>
						La autenticación real se conectará al backend cuando esté disponible.
					</Typography>
					<Button
						type="submit"
						variant="outlined"
						disabled={isSaving}
						className="rounded-lg"
					>
						{isSaving ? 'Actualizando…' : 'Actualizar contraseña'}
					</Button>
				</div>
			</form>
		</SectionCard>
	);
}

export default SecurityCard;
