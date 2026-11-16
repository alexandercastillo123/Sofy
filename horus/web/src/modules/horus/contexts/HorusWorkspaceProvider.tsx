'use client';

import { ReactNode, useCallback, useMemo, useState } from 'react';
import { Currency, VeinInput } from '../domain/types';
import { analyzeVein, computeProjects, computeStakes } from '../domain/calculations';
import { DEFAULT_VEIN_INPUT, STAKE_DISTANCES, StakeDistance } from '../data/defaults';
import { HorusWorkspaceContext, HorusWorkspaceType } from './HorusWorkspaceContext';

/**
 * The workspace keeps the last analysis alive while the user moves between
 * Rumbo de Veta, Resultados 3D and Punto de Dirección.
 */
export function HorusWorkspaceProvider({ children }: { children: ReactNode }) {
	const [input, setInput] = useState<VeinInput>(DEFAULT_VEIN_INPUT);
	const [stakeDistance, setStakeDistance] = useState<StakeDistance>(STAKE_DISTANCES[0]);
	const [currency, setCurrency] = useState<Currency>('PEN');
	const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

	const analysis = useMemo(() => analyzeVein(input), [input]);
	const projects = useMemo(() => computeProjects(input, analysis), [input, analysis]);
	const stakes = useMemo(() => computeStakes(input, projects, stakeDistance), [input, projects, stakeDistance]);

	const applyInput = useCallback((values: VeinInput) => {
		setInput(values);
		setLastUpdated(new Date());
	}, []);

	const resetInput = useCallback(() => {
		setInput(DEFAULT_VEIN_INPUT);
		setLastUpdated(new Date());
	}, []);

	const value = useMemo<HorusWorkspaceType>(
		() => ({
			input,
			defaultInput: DEFAULT_VEIN_INPUT,
			analysis,
			projects,
			stakes,
			stakeDistance,
			currency,
			lastUpdated,
			applyInput,
			resetInput,
			setStakeDistance,
			setCurrency
		}),
		[input, analysis, projects, stakes, stakeDistance, currency, lastUpdated, applyInput, resetInput]
	);

	return <HorusWorkspaceContext.Provider value={value}>{children}</HorusWorkspaceContext.Provider>;
}

export default HorusWorkspaceProvider;
