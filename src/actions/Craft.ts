import {Action, IActionResult} from '../Action';
import {EActionType} from '../EActionType';

export class Craft extends Action {
    public static keyword: string = ':!craft';
    public static types: EActionType[] = [
        EActionType.GENERAL,
        EActionType.WHISPER,
        EActionType.EXPLORATION
    ];

    public process(): IActionResult {
        return {message: `${this.player.name} crafts.`, success: false};
    }
}
