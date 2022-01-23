export const VERSION = 1;

export interface IData {
	players: IPlayer[];
	version: number;
}

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
}

export interface IResultPair extends IPair {
	visible?: boolean;
}

export interface IEntry {
	player: IPlayer;
	url: string;
}