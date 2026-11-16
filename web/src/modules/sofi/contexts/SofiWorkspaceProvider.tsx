'use client';

import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Currency, HistoryEntry, VeinInput } from '../domain/types';
import { analyzeVein, computeProjects, computeStakes } from '../domain/calculations';
import { DEFAULT_VEIN_INPUT, STAKE_DISTANCES, StakeDistance } from '../data/defaults';
import { MOCK_HISTORY } from '../data/mockHistory';
import { buildHistoryEntry, HISTORY_STORAGE_KEY, MAX_HISTORY_ENTRIES } from '../lib/history';
import { SofiWorkspaceContext, SofiWorkspaceType } from './SofiWorkspaceContext';

function readStoredHistory(): HistoryEntry[] | null {
	try {
		const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);

		if (!raw) {
			return null;
		}

		const parsed = JSON.parse(raw) as HistoryEntry[];
		return Array.isArray(parsed) ? parsed : null;
	} catch {
		return null;
	}
}

/**
 * The workspace keeps the last analysis alive while the user moves between
 * Rumbo de Veta, Resultados 3D and Punto de Dirección.
 */
export function SofiWorkspaceProvider({ children }: { children: ReactNode }) {
	const [input, setInput] = useState<VeinInput>(DEFAULT_VEIN_INPUT);
	const [stakeDistance, setStakeDistance] = useState<StakeDistance>(STAKE_DISTANCES[0]);
	const [currency, setCurrency] = useState<Currency>('PEN');
	const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
	const [history, setHistory] = useState<HistoryEntry[]>([]);
	const [historyReady, setHistoryReady] = useState(false);

	const analysis = useMemo(() => analyzeVein(input), [input]);
	const projects = useMemo(() => computeProjects(input, analysis), [input, analysis]);
	const stakes = useMemo(() => computeStakes(input, projects, stakeDistance), [input, projects, stakeDistance]);

	useEffect(() => {
		setHistory(readStoredHistory() ?? MOCK_HISTORY);
		setHistoryReady(true);
	}, []);

	useEffect(() => {
		if (!historyReady) {
			return;
		}

		try {
			window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
		} catch {
			// Storage can be unavailable in private mode; the in-memory history still works.
		}
	}, [history, historyReady]);

	const applyInput = useCallback((values: VeinInput) => {
		setInput(values);
		setLastUpdated(new Date());
	}, []);

	const resetInput = useCallback(() => {
		setInput(DEFAULT_VEIN_INPUT);
		setLastUpdated(new Date());
	}, []);

	const saveCurrentAnalysis = useCallback(
		(name?: string) => {
			const fallbackName = `Veta ${analysis.label} · ${new Date().toLocaleDateString('es-PE', {
				day: '2-digit',
				month: 'short'
			})}`;
			const entry = buildHistoryEntry({
				name: name?.trim() || fallbackName,
				input
			});

			setHistory((current) => [entry, ...current].slice(0, MAX_HISTORY_ENTRIES));
			return entry;
		},
		[analysis.label, input]
	);

	const loadHistoryEntry = useCallback(
		(id: string) => {
			const entry = history.find((item) => item.id === id);

			if (!entry) {
				return undefined;
			}

			setInput(entry.input);
			setLastUpdated(new Date());
			return entry;
		},
		[history]
	);

	const deleteHistoryEntry = useCallback((id: string) => {
		setHistory((current) => current.filter((entry) => entry.id !== id));
	}, []);

	const value = useMemo<SofiWorkspaceType>(
		() => ({
			input,
			defaultInput: DEFAULT_VEIN_INPUT,
			analysis,
			projects,
			stakes,
			stakeDistance,
			currency,
			lastUpdated,
			history,
			applyInput,
			resetInput,
			setStakeDistance,
			setCurrency,
			saveCurrentAnalysis,
			loadHistoryEntry,
			deleteHistoryEntry
		}),
		[
			input,
			analysis,
			projects,
			stakes,
			stakeDistance,
			currency,
			lastUpdated,
			history,
			applyInput,
			resetInput,
			saveCurrentAnalysis,
			loadHistoryEntry,
			deleteHistoryEntry
		]
	);

	return <SofiWorkspaceContext.Provider value={value}>{children}</SofiWorkspaceContext.Provider>;
}

export default SofiWorkspaceProvider;
