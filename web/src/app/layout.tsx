import clsx from 'clsx';
import 'src/styles/splash-screen.css';
import 'src/styles/index.css';
import '../../public/assets/fonts/material-design-icons/MaterialIconsOutlined.css';
import '../../public/assets/fonts/Geist/geist.css';
import '../../public/assets/fonts/meteocons/style.css';
import '../../public/assets/styles/prism.css';
import generateMetadata from '../utils/generateMetadata';
import App from './App';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = await generateMetadata({
	title: 'SOFI · Inteligencia Artificial Minera',
	description: 'Plataforma de análisis de rumbo de veta, proyectos 3D y punto de dirección.',
	cardImage: '/card.png',
	robots: 'follow, index',
	favicon: '/favicon.ico',
	url: 'https://sofi.pe'
});

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<meta
					name="theme-color"
					content="#000000"
				/>
				<base href="/" />
				<link
					rel="manifest"
					href="/manifest.json"
				/>
				<link
					rel="shortcut icon"
					href="/favicon.ico"
				/>
				<noscript id="emotion-insertion-point" />
			</head>
			<body
				id="root"
				className={clsx('loading')}
			>
				<App>{children}</App>
			</body>
		</html>
	);
}
