import { Coordinate3D, ProjectStatus, VeinInput } from './types';

export type ProjectAuthor = {
	id: string;
	name: string;
	shortName: string;
	role: string;
	email: string;
};

export type ProjectSource = {
	channel: 'mobile' | 'web';
	app: string;
	platform: string;
	syncedAt?: string;
};

export type ProjectLocation = {
	zone: string;
	sector: string;
	district: string;
	province: string;
	region: string;
	country: string;
	utmZone: string;
	datum: string;
	coordinates: Coordinate3D;
};

/**
 * A project stored by the mobile app and displayed read-only on the web.
 * The full `VeinInput` is kept so the 3D simulation and the summary can be
 * rebuilt without duplicating calculations in the mock data.
 */
export type MiningProject = {
	id: string;
	code: string;
	name: string;
	description: string;
	status: ProjectStatus;
	createdAt: string;
	updatedAt: string;
	createdBy: ProjectAuthor;
	location: ProjectLocation;
	source: ProjectSource;
	input: VeinInput;
	tags: string[];
};
