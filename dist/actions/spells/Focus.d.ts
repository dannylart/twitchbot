import { Action, IActionResult } from '../../Action';
export declare class Focus extends Action {
    static keyword: string;
    static combat: boolean;
    process(): IActionResult;
}
