import { Action, IActionResult } from '../../Action';
export declare class Rush extends Action {
    static keyword: string;
    static combat: boolean;
    process(): IActionResult;
}
