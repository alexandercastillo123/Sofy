'use client';

import { createContext } from 'react';
import { ProjectResult, Stake, VeinAnalysis, VeinInput } from '../domain/types';
import { StakeDistance } from '../data/defaults';
import { Currency } from '../domain/types';

export type HorusWorkspaceType = {
	input: VeinInput;
	defaultInput: VeinInput;
	analysis: VeinAnalysis;
	projects: ProjectResult[];
	stakes: Stake[];
	stakeDistance: StakeDistance;
	currency: Currency;
	lastUpdated: Date;
	applyInput: (values: VeinInput) => void;
	resetInput: () => void;
	setStakeDistance: (distance: StakeDistance) => void;
	setCurrency: (currency: Currency) => void;
};

export const HorusWorkspaceContext = createContext<HorusWorkspaceType | null>(null);
