import { Action, IActionResult } from '../Action';
export declare class Cast extends Action {
    static keyword: string;
    static combat: boolean;
    process(): IActionResult;
}
