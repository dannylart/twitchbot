import {Action, IActionResult} from '../Action';

export class Take extends Action {
    public static keyword: string = ':!take';

    public process(): IActionResult {
        return {
            message: `${this.player.name} takes ${this.parts[1]}.`,
            success: true
        };
    }
}
