import {Action, IActionResult} from '../Action';
import {EActionType} from '../EActionType';

export class Examine extends Action {
    public static keyword: string = ':!examine';
    public static types: EActionType[] = [EActionType.EXPLORATION];

    public process(): IActionResult {
        return {
            message: `${this.player.name} examines ${this.parts[1]}.`,
            success: true
        };
    }
}
