import { Action, IActionResult } from '../Action';
import { EActionType } from '../EActionType';
export declare class Level extends Action {
    static keyword: string;
    static types: EActionType[];
    process(): IActionResult;
}
