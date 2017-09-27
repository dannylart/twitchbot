import {Action, IActionResult} from '../Action';
import {EActionType} from '../EActionType';

export class Use extends Action {
    public static keyword: string = ':!use';
    public static types: EActionType[] = [
        EActionType.EXPLORATION
    ];

    public process(): IActionResult {
        return {
            message: `${this.player.name} uses ${this.parts[1]}.`,
            success: true
        };
    }
}
