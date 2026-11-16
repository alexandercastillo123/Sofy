'use client';

import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';
import type { ApexOptions } from 'apexcharts';
import { ProjectResult } from '../../domain/types';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

function ProjectComparisonChart({ projects }: { projects: ProjectResult[] }) {
	const theme = useTheme();
	const options: ApexOptions = {
		chart: {
			type: 'bar',
			toolbar: { show: false },
			fontFamily: 'inherit',
			foreColor: theme.palette.text.secondary,
			parentHeightOffset: 0
		},
		colors: [theme.palette.primary.main, theme.palette.success.main],
		plotOptions: {
			bar: { horizontal: false, columnWidth: '42%', borderRadius: 4, borderRadiusApplication: 'end' }
		},
		dataLabels: { enabled: false },
		grid: { borderColor: theme.palette.divider, strokeDashArray: 4, xaxis: { lines: { show: false } } },
		xaxis: {
			categories: projects.map((project) => project.name.replace('Proyecto ', '')),
			axisBorder: { show: false },
			axisTicks: { show: false }
		},
		yaxis: {
			labels: {
				formatter: (value: number) => (value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value.toFixed(0))
			}
		},
		legend: { position: 'top', horizontalAlign: 'right', fontSize: '12px' },
		tooltip: { theme: theme.palette.mode }
	};

	return (
		<ApexChart
			type="bar"
			height={260}
			options={options}
			series={[
				{ name: 'Volumen (m³)', data: projects.map((project) => Math.round(project.volume)) },
				{ name: 'Tonelaje (Tn)', data: projects.map((project) => Math.round(project.tonnage)) }
			]}
		/>
	);
}

export default ProjectComparisonChart;
