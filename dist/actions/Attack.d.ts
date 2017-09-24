import { Action, IActionResult } from '../Action';
export declare class Attack extends Action {
    static keyword: string;
    static combat: boolean;
    process(): IActionResult;
}
