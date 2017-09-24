import {Action, IActionResult} from '../Action';

export class EndTurn extends Action {
    public static keyword: string = ':!endturn';

    public process(): IActionResult {
        this.game.endTurn();

        return {
            success: true
        };
    }
}
