import {Action, IActionResult} from '../Action';
import {EActionType} from '../EActionType';

export class EndTurn extends Action {
    public static keyword: string = ':!endturn';
    public static types: EActionType[] = [
        EActionType.COMBAT,
        EActionType.EXPLORATION
    ];

    public process(): IActionResult {
        this.game.endTurn();

        return {
            success: true
        };
    }
}
