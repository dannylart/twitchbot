import {Action, IActionResult} from '../Action';
import {EActionType} from '../EActionType';

export class Take extends Action {
    public static keyword: string = ':!take';
    public static types: EActionType[] = [
        EActionType.EXPLORATION
    ];

    public process(): IActionResult {
        return {
            message: `${this.player.name} takes ${this.parts[1]}.`,
            success: true
        };
    }
}
