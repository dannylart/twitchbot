import {Action, IActionResult} from '../Action';

export class Inventory extends Action {
    public static keyword: string = ':!inventory';
    public static whisper: boolean = true;

    public process(): IActionResult {
        return {
            message: `${this.player.name} looks at his items.`,
            success: true
        };
    }
}
