import { z } from 'zod';
import { AccountProfile } from '../../sofi/domain/account';

export const profileSchema = z.object({
	firstName: z.string().min(1, 'Ingresa tu nombre'),
	lastName: z.string().min(1, 'Ingresa tus apellidos'),
	email: z.string().email('Ingresa un correo válido'),
	phone: z.string().min(6, 'Ingresa un teléfono de contacto'),
	company: z.string().min(1, 'Ingresa tu empresa'),
	role: z.string().min(1, 'Ingresa tu cargo'),
	location: z.string().min(1, 'Ingresa tu ubicación'),
	timezone: z.string().min(1, 'Ingresa tu zona horaria')
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export function toProfileFormValues(profile: AccountProfile): ProfileFormValues {
	return {
		firstName: profile.firstName,
		lastName: profile.lastName,
		email: profile.email,
		phone: profile.phone,
		company: profile.company,
		role: profile.role,
		location: profile.location,
		timezone: profile.timezone
	};
}

export function toProfileUpdate(values: ProfileFormValues): Partial<AccountProfile> {
	return {
		...values,
		displayName: `${values.firstName} ${values.lastName}`.trim()
	};
}

export const passwordSchema = z
	.object({
		currentPassword: z.string().min(1, 'Ingresa tu contraseña actual'),
		newPassword: z.string().min(8, 'Usa al menos 8 caracteres'),
		confirmPassword: z.string().min(8, 'Confirma la nueva contraseña')
	})
	.refine((values) => values.newPassword === values.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Las contraseñas no coinciden'
	});

export type PasswordFormValues = z.infer<typeof passwordSchema>;
