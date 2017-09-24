import {Action, IActionResult} from '../Action';

export class Use extends Action {
    public static keyword: string = ':!use';

    public process(): IActionResult {
        return {
            message: `${this.player.name} uses ${this.parts[1]}.`,
            success: true
        };
    }
}
