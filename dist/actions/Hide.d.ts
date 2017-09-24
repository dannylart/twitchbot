import { Action, IActionResult } from '../Action';
export declare class Hide extends Action {
    static keyword: string;
    static combat: boolean;
    process(): IActionResult;
}
