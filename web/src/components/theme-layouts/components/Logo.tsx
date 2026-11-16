import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import clsx from 'clsx';

const Root = styled('div')(({ theme }) => ({
	'& > .logo-icon': {
		transition: theme.transitions.create(['width', 'height'], {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	},
	'& > .badge': {
		transition: theme.transitions.create('opacity', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	}
}));

type LogoProps = {
	className?: string;
};

/**
 * The SOFI logo.
 */
function Logo(props: LogoProps) {
	const { className = '' } = props;

	return (
		<Root className={clsx('flex flex-shrink-0 flex-grow items-center gap-3', className)}>
			<div className="flex flex-1 items-center gap-2">
				<Box
					component="span"
					className="logo-icon flex h-8 w-8 items-center justify-center rounded-lg"
					sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
				>
					<FuseSvgIcon size={18}>lucide:mountain</FuseSvgIcon>
				</Box>
				<div className="logo-text flex flex-auto flex-col gap-0.5">
					<Typography className="text-lg leading-none font-extrabold tracking-[0.16em]">SOFI</Typography>
					<Typography
						className="text-[9px] leading-none font-semibold tracking-[0.14em] uppercase"
						color="text.secondary"
					>
						Operaciones mineras
					</Typography>
				</div>
			</div>
		</Root>
	);
}

export default Logo;
