'use client';

import { useState } from 'react';
import SectionCard from '../../sofi/components/ui/SectionCard';
import VeinScene3D from '../../sofi/components/three/VeinScene3D';
import SceneLegend from '../../sofi/components/three/SceneLegend';
import SceneLayerControls from '../../sofi/components/three/SceneLayerControls';
import { SceneLayerVisibility } from '../../sofi/components/three/VeinScene3DCanvas';
import { ProjectResult, VeinAnalysis, VeinInput } from '../../sofi/domain/types';

type ResultsSceneCardProps = {
	input: VeinInput;
	analysis: VeinAnalysis;
	projects: ProjectResult[];
};

function ResultsSceneCard({ input, analysis, projects }: ResultsSceneCardProps) {
	const [layers, setLayers] = useState<SceneLayerVisibility>({
		vein: true,
		projects: true,
		grid: true,
		labels: true
	});

	return (
		<SectionCard
			className="lg:col-span-2"
			title="Simulación 3D de proyectos"
			subtitle="Escena Three.js calculada desde las coordenadas UTM, el plano de veta y los dos proyectos."
			action={<SceneLegend />}
		>
			<div className="mb-3">
				<SceneLayerControls
					value={layers}
					onChange={setLayers}
				/>
			</div>
			<VeinScene3D
				input={input}
				analysis={analysis}
				projects={projects}
				layers={layers}
				height={480}
			/>
		</SectionCard>
	);
}

export default ResultsSceneCard;
