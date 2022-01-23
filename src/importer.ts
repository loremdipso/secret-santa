import { findPlayerById, getPlayerId, playerIsEmpty } from "./helpers";
import type { IData, IPair, IPlayer } from "./interfaces";
import { VERSION } from "./interfaces";

export type IResult<T, E> = { value: T, hasValue: true } | { error: E, hasValue: false };

export interface IOnImport {
	(newPlayers: IPlayer[], newExclusions: IPair[]): any;
}

export function parseFile(contentsStr: string): IResult<IPlayer[], string> {
	let contents: IData;
	try {
		contents = JSON.parse(contentsStr);
	} catch (e) {
		console.error(e);
		return { hasValue: false, error: "Cannot parse import file" };
	}

	if (!contents || !contents.players) {
		return { hasValue: false, error: `Invalid import file. Missing "players".` };
	} else if (contents.version != VERSION) {
		return { hasValue: false, error: `Invalid import file. Expected version: ${VERSION}. Actual version: ${contents.version}` };
	} else {
		try {
			let players: IPlayer[] = contents.players
				.map(({ name, email, address }) => {
					let newPlayer = {
						name,
						email,
						address,
						id: getPlayerId(),
						exclusions: [],
					};
					if (playerIsEmpty(newPlayer)) {
						console.info("Skipping a poorly configured player:");
						console.info(newPlayer);
					} else {
						return newPlayer;
					}
				})
				.filter((player) => !!player);

			return { hasValue: true, value: players };
		} catch (e) {
			console.error(e);
			return { hasValue: false, error: "Error processing import file" };
		}
	}
}
