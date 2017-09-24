import { Game } from './Game';
import { Player } from './Player';
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
    static combat: boolean;
    static whisper: boolean;
    constructor(game: Game, player: Player, parts: string[]);
    abstract process(): IActionResult;
}
