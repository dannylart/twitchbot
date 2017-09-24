import {Action, IActionResult} from '../Action';

export class Examine extends Action {
    public static keyword: string = ':!examine';

    public process(): IActionResult {
        return {
            message: `${this.player.name} examines ${this.parts[1]}.`,
            success: true
        };
    }
}
