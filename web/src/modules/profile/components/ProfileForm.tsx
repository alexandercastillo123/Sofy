'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SectionCard from '../../sofi/components/ui/SectionCard';
import { AccountProfile } from '../../sofi/domain/account';
import {
	ProfileFormValues,
	profileSchema,
	toProfileFormValues
} from '../model/profileSchema';

type ProfileFormProps = {
	profile: AccountProfile;
	isSaving: boolean;
	onSubmit: (values: ProfileFormValues) => Promise<void>;
};

type FieldConfig = {
	name: keyof ProfileFormValues;
	label: string;
	placeholder?: string;
	type?: string;
	autoComplete?: string;
};

const FIELDS: FieldConfig[] = [
	{ name: 'firstName', label: 'Nombres', autoComplete: 'given-name' },
	{ name: 'lastName', label: 'Apellidos', autoComplete: 'family-name' },
	{ name: 'email', label: 'Correo electrónico', type: 'email', autoComplete: 'email' },
	{ name: 'phone', label: 'Teléfono', type: 'tel', autoComplete: 'tel' },
	{ name: 'company', label: 'Empresa', autoComplete: 'organization' },
	{ name: 'role', label: 'Cargo' },
	{ name: 'location', label: 'Ubicación' },
	{ name: 'timezone', label: 'Zona horaria', placeholder: 'America/Lima' }
];

function ProfileForm({ profile, isSaving, onSubmit }: ProfileFormProps) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty }
	} = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: toProfileFormValues(profile)
	});

	useEffect(() => {
		reset(toProfileFormValues(profile));
	}, [profile, reset]);

	return (
		<SectionCard
			title="Datos personales"
			subtitle="Esta información se usará en los reportes y en la cabecera de tus proyectos."
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{FIELDS.map((field) => (
						<TextField
							key={field.name}
							label={field.label}
							type={field.type}
							placeholder={field.placeholder}
							autoComplete={field.autoComplete}
							size="small"
							error={Boolean(errors[field.name])}
							helperText={errors[field.name]?.message}
							{...register(field.name)}
						/>
					))}
				</div>

				<div className="mt-1 flex flex-wrap items-center justify-end gap-2 border-t pt-4">
					<Button
						type="button"
						variant="outlined"
						color="inherit"
						disabled={!isDirty || isSaving}
						onClick={() => reset(toProfileFormValues(profile))}
						className="rounded-lg"
					>
						Descartar
					</Button>
					<Button
						type="submit"
						variant="contained"
						disabled={!isDirty || isSaving}
						className="rounded-lg"
					>
						{isSaving ? 'Guardando…' : 'Guardar cambios'}
					</Button>
				</div>
			</form>
		</SectionCard>
	);
}

export default ProfileForm;
