'use client';

import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { ProjectResult } from '../../domain/types';

type Project3DPreviewProps = {
	projects: ProjectResult[];
	className?: string;
};

/**
 * Isometric sketch of the front, the vein plane and both projects.
 * It is a UI illustration of the computed geometry, not a full 3D engine.
 */
function Project3DPreview({ projects, className }: Project3DPreviewProps) {
	const theme = useTheme();
	const primary = theme.palette.primary.main;
	const success = theme.palette.success.main;
	const warning = theme.palette.warning.main;
	const paper = theme.palette.background.paper;
	const text = theme.palette.text.secondary;
	const divider = theme.palette.divider;

	const perpendicular = projects.find((project) => project.id === 'perpendicular');
	const diagonal = projects.find((project) => project.id === 'diagonal');

	return (
		<svg
			className={className}
			viewBox="0 0 640 360"
			role="img"
			aria-label="Vista isométrica de los proyectos perpendicular y diagonal"
		>
			<defs>
				<linearGradient
					id="vein-plane"
					x1="0"
					y1="0"
					x2="1"
					y2="1"
				>
					<stop
						offset="0%"
						stopColor={primary}
						stopOpacity={0.24}
					/>
					<stop
						offset="100%"
						stopColor={primary}
						stopOpacity={0.04}
					/>
				</linearGradient>
				<linearGradient
					id="front-face"
					x1="0"
					y1="0"
					x2="0"
					y2="1"
				>
					<stop
						offset="0%"
						stopColor={warning}
						stopOpacity={0.28}
					/>
					<stop
						offset="100%"
						stopColor={warning}
						stopOpacity={0.08}
					/>
				</linearGradient>
			</defs>

			<rect
				x={0}
				y={0}
				width={640}
				height={360}
				fill="none"
			/>

			{/* Ground grid */}
			<g
				stroke={divider}
				strokeWidth={1}
				opacity={0.55}
			>
				{[0, 1, 2, 3, 4, 5].map((index) => (
					<line
						key={`h-${index}`}
						x1={48}
						y1={270 + index * 14}
						x2={592 - index * 14}
						y2={270 + index * 14}
					/>
				))}
				{[0, 1, 2, 3, 4, 5].map((index) => (
					<line
						key={`v-${index}`}
						x1={84 + index * 84}
						y1={270}
						x2={56 + index * 84}
						y2={330}
					/>
				))}
			</g>

			{/* Vein plane */}
			<polygon
				points="118,84 448,54 556,246 214,294"
				fill="url(#vein-plane)"
				stroke={primary}
				strokeWidth={1.5}
			/>
			<text
				x={352}
				y={80}
				fill={primary}
				fontSize={11}
				fontWeight={600}
				textAnchor="middle"
			>
				PLANO DE VETA
			</text>

			{/* Front face */}
			<polygon
				points="246,196 330,184 344,282 258,296"
				fill="url(#front-face)"
				stroke={warning}
				strokeWidth={1.5}
			/>
			<polygon
				points="330,184 344,282 372,266 358,170"
				fill={alpha(warning, 0.06)}
				stroke={warning}
				strokeWidth={1}
			/>
			<text
				x={270}
				y={318}
				fill={text}
				fontSize={10}
			>
				FRENTE
			</text>

			{/* Perpendicular project */}
			<line
				x1={290}
				y1={240}
				x2={392}
				y2={122}
				stroke={success}
				strokeWidth={2.5}
				strokeDasharray="6 4"
			/>
			<circle
				cx={392}
				cy={122}
				r={6}
				fill={success}
			/>
			<text
				x={402}
				y={126}
				fill={theme.palette.text.primary}
				fontSize={11}
				fontWeight={600}
			>
				EP
			</text>

			{/* Diagonal project */}
			<line
				x1={290}
				y1={240}
				x2={508}
				y2={212}
				stroke={primary}
				strokeWidth={2.5}
			/>
			<circle
				cx={508}
				cy={212}
				r={6}
				fill={primary}
			/>
			<text
				x={518}
				y={216}
				fill={theme.palette.text.primary}
				fontSize={11}
				fontWeight={600}
			>
				PC
			</text>

			{/* Labels */}
			<g transform="translate(56 42)">
				<rect
					x={0}
					y={0}
					width={152}
					height={48}
					rx={8}
					fill={paper}
					stroke={divider}
				/>
				<circle
					cx={14}
					cy={16}
					r={4}
					fill={success}
				/>
				<text
					x={24}
					y={20}
					fill={text}
					fontSize={10}
				>
					Perpendicular · {perpendicular ? `${Math.round(perpendicular.distance)} m` : '—'}
				</text>
				<circle
					cx={14}
					cy={34}
					r={4}
					fill={primary}
				/>
				<text
					x={24}
					y={38}
					fill={text}
					fontSize={10}
				>
					Diagonal · {diagonal ? `${Math.round(diagonal.distance)} m` : '—'}
				</text>
			</g>

			{/* Depth guide */}
			<line
				x1={604}
				y1={110}
				x2={604}
				y2={262}
				stroke={divider}
			/>
			<line
				x1={598}
				y1={110}
				x2={610}
				y2={110}
				stroke={divider}
			/>
			<line
				x1={598}
				y1={262}
				x2={610}
				y2={262}
				stroke={divider}
			/>
			<text
				x={616}
				y={190}
				fill={text}
				fontSize={9}
				transform="rotate(90 616 190)"
				textAnchor="middle"
			>
				PROFUNDIDAD
			</text>
		</svg>
	);
}

export default Project3DPreview;
