'use client';

import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';
import type { ApexOptions } from 'apexcharts';
import { DashboardData } from '../../domain/types';
import { formatNumber } from '../../lib/format';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function ProductionChart({ data }: { data: DashboardData['production'] }) {
	const theme = useTheme();
	const options: ApexOptions = {
		chart: {
			type: 'area',
			toolbar: { show: false },
			zoom: { enabled: false },
			fontFamily: 'inherit',
			foreColor: theme.palette.text.secondary,
			parentHeightOffset: 0
		},
		colors: [theme.palette.primary.main, theme.palette.warning.main],
		dataLabels: { enabled: false },
		stroke: { curve: 'smooth', width: [3, 2] },
		fill: {
			type: ['gradient', 'solid'],
			gradient: {
				shadeIntensity: 1,
				opacityFrom: 0.3,
				opacityTo: 0.02,
				stops: [0, 90, 100]
			}
		},
		grid: {
			borderColor: theme.palette.divider,
			strokeDashArray: 4,
			xaxis: { lines: { show: false } },
			yaxis: { lines: { show: true } }
		},
		xaxis: {
			categories: data.map((item) => item.month),
			axisBorder: { show: false },
			axisTicks: { show: false }
		},
		yaxis: [
			{
				labels: {
					formatter: (value: number) => `${formatNumber(value / 1000, 0)}k`,
					style: { fontSize: '11px' }
				}
			},
			{
				opposite: true,
				labels: {
					formatter: (value: number) => `S/ ${formatNumber(value / 1000, 0)}k`,
					style: { fontSize: '11px' }
				}
			}
		],
		legend: { show: false },
		tooltip: { theme: theme.palette.mode }
	};

	return (
		<ApexChart
			type="area"
			height={260}
			options={options}
			series={[
				{ name: 'Tonelaje', data: data.map((item) => item.tonnage) },
				{ name: 'Costo', data: data.map((item) => item.cost) }
			]}
		/>
	);
}

export function ZonesChart({ data }: { data: DashboardData['zones'] }) {
	const theme = useTheme();
	const options: ApexOptions = {
		chart: { type: 'donut', fontFamily: 'inherit', foreColor: theme.palette.text.secondary },
		colors: [
			theme.palette.primary.main,
			theme.palette.success.main,
			theme.palette.warning.main,
			theme.palette.info.main
		],
		labels: data.map((item) => item.zone),
		legend: { position: 'bottom', fontSize: '12px' },
		dataLabels: { enabled: false },
		stroke: { width: 0 },
		plotOptions: {
			pie: {
				donut: {
					size: '68%',
					labels: {
						show: true,
						total: {
							show: true,
							label: 'Proyectos',
							formatter: () => `${data.reduce((total, item) => total + item.projects, 0)}`
						}
					}
				}
			}
		},
		tooltip: { theme: theme.palette.mode }
	};

	return (
		<ApexChart
			type="donut"
			height={260}
			options={options}
			series={data.map((item) => item.projects)}
		/>
	);
}
