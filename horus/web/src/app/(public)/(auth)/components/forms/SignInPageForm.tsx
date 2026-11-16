'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import useAuth from '@/contexts/auth/useAuth';
import { HORUS_DEMO_CREDENTIALS } from '@/contexts/auth/mockUser';

const schema = z.object({
	email: z.string().email('Ingresa un correo válido').nonempty('Ingresa tu correo'),
	password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').nonempty('Ingresa tu contraseña'),
	remember: z.boolean().optional()
});

type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
	email: HORUS_DEMO_CREDENTIALS.email,
	password: HORUS_DEMO_CREDENTIALS.password,
	remember: true
};

function SignInPageForm() {
	const { signIn } = useAuth();
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);

	const { control, handleSubmit, setValue, formState } = useForm<FormValues>({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { errors, isSubmitting, isValid } = formState;

	const onSubmit = async (values: FormValues) => {
		setFormError(null);
		const result = await signIn(values.email, values.password);

		if (!result.ok) {
			setFormError(result.error ?? 'No se pudo iniciar sesión.');
			return;
		}

		router.replace('/dashboard');
	};

	const fillDemoCredentials = () => {
		setValue('email', HORUS_DEMO_CREDENTIALS.email, { shouldValidate: true, shouldDirty: true });
		setValue('password', HORUS_DEMO_CREDENTIALS.password, { shouldValidate: true, shouldDirty: true });
	};

	return (
		<form
			name="loginForm"
			noValidate
			className="flex w-full flex-col justify-center gap-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			{formError && (
				<Alert
					severity="error"
					onClose={() => setFormError(null)}
				>
					{formError}
				</Alert>
			)}

			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormLabel htmlFor="email">Correo corporativo</FormLabel>
						<TextField
							{...field}
							id="email"
							autoFocus
							type="email"
							placeholder="nombre@horus.pe"
							error={!!errors.email}
							helperText={errors.email?.message}
							fullWidth
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<FuseSvgIcon
												size={18}
												color="action"
											>
												lucide:mail
											</FuseSvgIcon>
										</InputAdornment>
									)
								}
							}}
						/>
					</FormControl>
				)}
			/>

			<Controller
				name="password"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormLabel htmlFor="password">Contraseña</FormLabel>
						<TextField
							{...field}
							id="password"
							type={showPassword ? 'text' : 'password'}
							error={!!errors.password}
							helperText={errors.password?.message}
							fullWidth
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<FuseSvgIcon
												size={18}
												color="action"
											>
												lucide:lock
											</FuseSvgIcon>
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												size="small"
												onClick={() => setShowPassword((value) => !value)}
												edge="end"
												aria-label="Mostrar contraseña"
											>
												<FuseSvgIcon size={18}>
													{showPassword ? 'lucide:eye-off' : 'lucide:eye'}
												</FuseSvgIcon>
											</IconButton>
										</InputAdornment>
									)
								}
							}}
						/>
					</FormControl>
				)}
			/>

			<div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
				<Controller
					name="remember"
					control={control}
					render={({ field }) => (
						<FormControl>
							<FormControlLabel
								label="Recordar sesión"
								control={
									<Checkbox
										size="small"
										checked={!!field.value}
										onChange={(event) => field.onChange(event.target.checked)}
									/>
								}
							/>
						</FormControl>
					)}
				/>

				<Typography
					component="button"
					type="button"
					color="primary"
					className="text-md font-medium hover:underline"
					onClick={fillDemoCredentials}
				>
					Usar credenciales demo
				</Typography>
			</div>

			<Button
				variant="contained"
				color="primary"
				className="h-11 w-full rounded-lg text-sm font-semibold"
				aria-label="Ingresar"
				disabled={!isValid || isSubmitting}
				type="submit"
			>
				{isSubmitting ? (
					<CircularProgress
						size={20}
						color="inherit"
					/>
				) : (
					<>
						Ingresar al workspace
						<FuseSvgIcon
							className="ml-2"
							size={18}
						>
							lucide:arrow-right
						</FuseSvgIcon>
					</>
				)}
			</Button>

			<Box className="rounded-lg border border-dashed border-gray-300 p-3 dark:border-gray-700">
				<Typography
					className="text-[11px] font-semibold tracking-[0.14em] uppercase"
					color="text.secondary"
				>
					Credenciales de demostración
				</Typography>
				<div className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
					<Typography>
						Correo: <b>{HORUS_DEMO_CREDENTIALS.email}</b>
					</Typography>
					<Typography>
						Contraseña: <b>{HORUS_DEMO_CREDENTIALS.password}</b>
					</Typography>
				</div>
			</Box>
		</form>
	);
}

export default SignInPageForm;
