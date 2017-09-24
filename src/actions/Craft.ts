import {Action, IActionResult} from '../Action';

export class Craft extends Action {
    public static keyword: string = ':!craft';

    public process(): IActionResult {
        return {message: `${this.player.name} crafts.`, success: false};
    }
}
