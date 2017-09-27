import {Action, IActionResult} from '../Action';
import {EActionType} from '../EActionType';

export class Flee extends Action {
    public static keyword: string = ':!flee';
    public static types: EActionType[] = [
        EActionType.EXPLORATION
    ];

    public process(): IActionResult {
        return {
            message: `${this.player.name} flees.`,
            success: true
        };
    }
}
