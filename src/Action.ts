import {Game} from './Game';
import {Player} from './Player';

export interface IActionResult {
    message?: string;
    success: boolean;
}

export interface IAction {
    process(): IActionResult;
}

export abstract class Action implements IAction {
    public static keyword: string;
    public static combat: boolean = false;
    public static whisper: boolean = false;

    constructor(
        protected game: Game,
        protected player: Player,
        protected parts: string[]
    ) {

    }

    public abstract process(): IActionResult;
}
