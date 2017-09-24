import { Action, IActionResult } from '../Action';
export declare class Level extends Action {
    static keyword: string;
    static whisper: boolean;
    process(): IActionResult;
}
