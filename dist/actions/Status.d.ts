import { Action, IActionResult } from '../Action';
export declare class Status extends Action {
    static keyword: string;
    static whisper: boolean;
    process(): IActionResult;
}
