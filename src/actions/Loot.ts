import {Action, IActionResult} from '../Action';
import {EActionType} from '../EActionType';

export class Loot extends Action {
    public static keyword: string = ':!loot';
    public static types: EActionType[] = [
        EActionType.EXPLORATION
    ];

    public process(): IActionResult {
        return {
            message: `${this.player.name} loots ${this.parts[1]}.`,
            success: true
        };
    }
}
