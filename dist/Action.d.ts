import { Game } from './Game';
import { Player } from './Player';
import { EActionType } from './EActionType';
export interface IActionResult {
    message?: string;
    success: boolean;
}
export interface IAction {
    process(): IActionResult;
}
export declare abstract class Action implements IAction {
    protected game: Game;
    protected player: Player;
    protected parts: string[];
    static keyword: string;
    static types: EActionType[];
    constructor(game: Game, player: Player, parts: string[]);
    abstract process(): IActionResult;
    protected addPartyExperienceAndGold(experience: number): string;
}
