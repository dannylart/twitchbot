import {Action, IActionResult} from '../Action';

export class Flee extends Action {
    public static keyword: string = ':!flee';

    public process(): IActionResult {
        return {
            message: `${this.player.name} flees.`,
            success: true
        };
    }
}
