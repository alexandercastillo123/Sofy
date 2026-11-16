import { HistoryEntry } from '../../domain/types';
import { MOCK_HISTORY } from '../../data/mockHistory';
import { mockDelay } from '../mockDelay';

/**
 * Mocked history endpoints. They are intentionally not wired to the workspace
 * yet: the UI currently persists history locally so it works without backend.
 */
export async function fetchHistoryEntries(): Promise<HistoryEntry[]> {
	return mockDelay(MOCK_HISTORY);
}

export async function createHistoryEntry(entry: HistoryEntry): Promise<HistoryEntry> {
	return mockDelay(entry);
}

export async function deleteHistoryEntry(id: string): Promise<{ id: string }> {
	return mockDelay({ id });
}
