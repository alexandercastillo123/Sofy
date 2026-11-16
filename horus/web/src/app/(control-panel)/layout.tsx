import MainLayout from 'src/components/MainLayout';
import AuthGuardRedirect from '@auth/AuthGuardRedirect';

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<AuthGuardRedirect
			auth={['admin']}
			loginRedirectUrl="/dashboard"
		>
			<MainLayout>{children}</MainLayout>
		</AuthGuardRedirect>
	);
}

export default Layout;
