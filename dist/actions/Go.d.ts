import { Action, IActionResult } from '../Action';
import { EActionType } from '../EActionType';
export declare class Go extends Action {
    static keyword: string;
    static types: EActionType[];
    process(): IActionResult;
}
