import {Action, IActionResult} from '../Action';
import {EActionType} from '../EActionType';

export class Hide extends Action {
    public static keyword: string = ':!hide';
    public static types: EActionType[] = [EActionType.COMBAT];

    public process(): IActionResult {
        return {
            message: `${this.player.name} hides.`,
            success: true
    }   ;
    }
}
