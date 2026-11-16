import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

function SignInPageTitle() {
	return (
		<div className="w-full">
			<div className="flex items-center gap-3">
				<Box
					component="span"
					className="flex h-12 w-12 items-center justify-center rounded-xl shadow-lg"
					sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
				>
					<FuseSvgIcon size={24}>lucide:mountain</FuseSvgIcon>
				</Box>
				<div>
					<Typography className="text-xl leading-none font-extrabold tracking-[0.2em]">SOFI</Typography>
					<Typography
						className="mt-1 text-[10px] font-semibold tracking-[0.18em] uppercase"
						color="text.secondary"
					>
						Inteligencia artificial minera
					</Typography>
				</div>
			</div>

			<Typography className="mt-10 text-4xl leading-[1.15] font-extrabold tracking-tight">
				Bienvenido de vuelta
			</Typography>
			<Typography
				className="mt-2"
				color="text.secondary"
			>
				Ingresa tus credenciales para continuar al workspace de análisis.
			</Typography>
		</div>
	);
}

export default SignInPageTitle;
