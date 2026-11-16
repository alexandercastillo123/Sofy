import ProjectSimulationView from '@/modules/projects/components/ProjectSimulationView';
import { MOCK_MINING_PROJECTS } from '@/modules/sofi/data/mockProjects';

type PageProps = {
	params: Promise<{ id: string }>;
};

export function generateStaticParams() {
	return MOCK_MINING_PROJECTS.map((project) => ({ id: project.id }));
}

export default async function Page({ params }: PageProps) {
	const { id } = await params;

	return <ProjectSimulationView projectId={id} />;
}
