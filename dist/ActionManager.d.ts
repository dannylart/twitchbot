import { Action } from './Action';
import { EActionType } from './EActionType';
export declare class ActionManager {
    static actions: typeof Action[];
    static getActions(actionType: EActionType): string[];
}
