'use client';

import { createContext } from 'react';
import { HistoryEntry, ProjectResult, Stake, VeinAnalysis, VeinInput } from '../domain/types';
import { StakeDistance } from '../data/defaults';
import { Currency } from '../domain/types';

export type SofiWorkspaceType = {
	input: VeinInput;
	defaultInput: VeinInput;
	analysis: VeinAnalysis;
	projects: ProjectResult[];
	stakes: Stake[];
	stakeDistance: StakeDistance;
	currency: Currency;
	lastUpdated: Date;
	history: HistoryEntry[];
	applyInput: (values: VeinInput) => void;
	resetInput: () => void;
	setStakeDistance: (distance: StakeDistance) => void;
	setCurrency: (currency: Currency) => void;
	saveCurrentAnalysis: (name?: string) => HistoryEntry;
	loadHistoryEntry: (id: string) => HistoryEntry | undefined;
	deleteHistoryEntry: (id: string) => void;
};

export const SofiWorkspaceContext = createContext<SofiWorkspaceType | null>(null);
