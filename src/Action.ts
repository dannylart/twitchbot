import {Game} from './Game';
import {Player} from './Player';
import {EActionType} from './EActionType';

export interface IActionResult {
    message?: string;
    success: boolean;
}

export interface IAction {
    process(): IActionResult;
}

export abstract class Action implements IAction {
    public static keyword: string;
    public static types: EActionType[] = [];

    constructor(
        protected game: Game,
        protected player: Player,
        protected parts: string[]
    ) {

    }

    public abstract process(): IActionResult;

    protected addPartyExperienceAndGold(experience: number): string {
        const gold: number = Math.floor(experience * Math.random() * .1);
        for (const player of this.game.alivePlayers) {
            player.addExperience(experience);
            player.addGold(gold);
        }

        return `The party has gained ${experience} experience and ${gold} gold.`;
    }
}
