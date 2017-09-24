import { Action, IActionResult } from '../Action';
export declare class EndTurn extends Action {
    static keyword: string;
    process(): IActionResult;
}
