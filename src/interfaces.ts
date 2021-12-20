export interface IPlayer {
	name: string;
	id: number;
	email: string;
	address: string;
	exclusions: number[];
}

export interface IPair {
	a: number;
	b: number;
	id: number;
}

export interface IResultPair extends IPair {
	visible?: boolean;
}

export interface IImportFile {
	version: number,
	people: IPlayer[],
	bad_pairs: string[][],
	previous_matchups: string[][]
}

export interface IEntry {
	player: IPlayer;
	url: string;
}