import {Action, IActionResult} from '../Action';

export class Loot extends Action {
    public static keyword: string = ':!loot';

    public process(): IActionResult {
        return {
            message: `${this.player.name} loots ${this.parts[1]}.`,
            success: true
        };
    }
}
