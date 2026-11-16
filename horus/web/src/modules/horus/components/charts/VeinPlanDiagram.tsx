'use client';

import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { ProjectResult, Stake, VeinAnalysis, VeinInput } from '../../domain/types';

type VeinPlanDiagramProps = {
	input: VeinInput;
	analysis: VeinAnalysis;
	projects: ProjectResult[];
	stakes?: Stake[];
	className?: string;
};

const WIDTH = 640;
const HEIGHT = 360;
const PADDING = 52;

type Point = { east: number; north: number; label: string; kind: 'reference' | 'project' | 'stake' };

function VeinPlanDiagram({ input, analysis, projects, stakes = [], className }: VeinPlanDiagramProps) {
	const theme = useTheme();

	const points = useMemo<Point[]>(() => {
		const reference: Point[] = [
			{ ...input.em, label: 'EM', kind: 'reference' },
			{ ...input.p2, label: 'P2', kind: 'reference' },
			{ ...input.frente, label: 'Frente', kind: 'reference' }
		];
		const projectPoints = projects.map<Point>((project) => ({
			...project.endpoint,
			label: project.id === 'perpendicular' ? 'EP' : 'PC',
			kind: 'project'
		}));
		const stakePoints = stakes.map<Point>((stake) => ({
			...stake.coordinate,
			label: `${stake.distance}m`,
			kind: 'stake'
		}));

		return [...reference, ...projectPoints, ...stakePoints];
	}, [input, projects, stakes]);

	const { projectPoint, scale } = useMemo(() => {
		// Bounds include references and project endpoints, not the stakes, so the
		// diagram stays stable while the user changes the stake distance.
		const boundsPoints = points.filter((point) => point.kind !== 'stake');
		const eastValues = boundsPoints.map((point) => point.east);
		const northValues = boundsPoints.map((point) => point.north);
		const minEast = Math.min(...eastValues);
		const maxEast = Math.max(...eastValues);
		const minNorth = Math.min(...northValues);
		const maxNorth = Math.max(...northValues);
		const eastRange = Math.max(maxEast - minEast, 10);
		const northRange = Math.max(maxNorth - minNorth, 10);
		const localScale = Math.min((WIDTH - PADDING * 2) / eastRange, (HEIGHT - PADDING * 2) / northRange);

		return {
			scale: localScale,
			projectPoint: (point: { east: number; north: number }) => ({
				x: PADDING + (point.east - minEast) * localScale + (WIDTH - PADDING * 2 - eastRange * localScale) / 2,
				y:
					PADDING +
					(maxNorth - point.north) * localScale +
					(HEIGHT - PADDING * 2 - northRange * localScale) / 2
			})
		};
	}, [points]);

	const em = projectPoint(input.em);
	const p2 = projectPoint(input.p2);
	const frente = projectPoint(input.frente);
	const perpendicular = projects[0] ? projectPoint(projects[0].endpoint) : null;
	const diagonal = projects[1] ? projectPoint(projects[1].endpoint) : null;

	const primary = theme.palette.primary.main;
	const success = theme.palette.success.main;
	const warning = theme.palette.warning.main;
	const divider = theme.palette.divider;
	const textColor = theme.palette.text.secondary;

	return (
		<svg
			className={className}
			viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
			role="img"
			aria-label={`Plano de rumbo ${analysis.label}`}
		>
			<defs>
				<pattern
					id="plan-grid"
					width={32}
					height={32}
					patternUnits="userSpaceOnUse"
				>
					<path
						d="M 32 0 L 0 0 0 32"
						fill="none"
						stroke={divider}
						strokeWidth={1}
					/>
				</pattern>
				<marker
					id="plan-arrow"
					viewBox="0 0 10 10"
					refX="9"
					refY="5"
					markerWidth="6"
					markerHeight="6"
					orient="auto-start-reverse"
				>
					<path
						d="M 0 0 L 10 5 L 0 10 z"
						fill={primary}
					/>
				</marker>
			</defs>

			<rect
				x={0}
				y={0}
				width={WIDTH}
				height={HEIGHT}
				fill="url(#plan-grid)"
				rx={12}
			/>

			{/* Vein strike */}
			<line
				x1={em.x}
				y1={em.y}
				x2={p2.x}
				y2={p2.y}
				stroke={primary}
				strokeWidth={2}
				strokeDasharray="7 5"
			/>
			<line
				x1={em.x}
				y1={em.y}
				x2={frente.x}
				y2={frente.y}
				stroke={warning}
				strokeWidth={1.5}
				strokeDasharray="3 5"
				opacity={0.8}
			/>

			{/* Projects from the front */}
			{perpendicular && (
				<line
					x1={frente.x}
					y1={frente.y}
					x2={perpendicular.x}
					y2={perpendicular.y}
					stroke={success}
					strokeWidth={2.5}
					markerEnd="url(#plan-arrow)"
				/>
			)}
			{diagonal && (
				<line
					x1={frente.x}
					y1={frente.y}
					x2={diagonal.x}
					y2={diagonal.y}
					stroke={primary}
					strokeWidth={2.5}
					markerEnd="url(#plan-arrow)"
				/>
			)}

			{stakes.map((stake) => {
				const point = projectPoint(stake.coordinate);
				return (
					<circle
						key={stake.id}
						cx={point.x}
						cy={point.y}
						r={4}
						fill={theme.palette.background.paper}
						stroke={stake.kind === 'perpendicular' ? success : primary}
						strokeWidth={2}
					/>
				);
			})}

			{points.map((point) => {
				const projected = projectPoint(point);
				const isReference = point.kind === 'reference';

				return (
					<g key={`${point.label}-${point.east}`}>
						<circle
							cx={projected.x}
							cy={projected.y}
							r={isReference ? 7 : 5.5}
							fill={
								point.kind === 'project'
									? point.label === 'EP'
										? success
										: primary
									: theme.palette.background.paper
							}
							stroke={point.kind === 'project' ? 'none' : point.kind === 'stake' ? textColor : primary}
							strokeWidth={2}
						/>
						<text
							x={projected.x + 10}
							y={projected.y - 8}
							fill={theme.palette.text.primary}
							fontSize={11}
							fontWeight={600}
						>
							{point.label}
						</text>
					</g>
				);
			})}

			{/* North indicator */}
			<g transform={`translate(${WIDTH - 54} 38)`}>
				<circle
					cx={0}
					cy={0}
					r={20}
					fill={theme.palette.background.paper}
					stroke={divider}
				/>
				<path
					d="M 0 -13 L 5 6 L 0 2 L -5 6 Z"
					fill={primary}
				/>
				<text
					x={0}
					y={31}
					textAnchor="middle"
					fill={textColor}
					fontSize={9}
					fontWeight={600}
				>
					N
				</text>
			</g>

			<g transform={`translate(${PADDING} ${HEIGHT - 26})`}>
				<text
					fill={textColor}
					fontSize={10}
				>
					Rumbo {analysis.label} · {analysis.caseId} · {analysis.zone} · escala 1:
					{Math.round(1 / Math.max(scale, 0.001))}
				</text>
			</g>
		</svg>
	);
}

export default VeinPlanDiagram;
