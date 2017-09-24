import {Action, IActionResult} from '../Action';

export class Cast extends Action {
    public static keyword: string = ':!cast';
    public static combat: boolean = true;

    public process(): IActionResult {
        return {
            message: `${this.player.name} casts ${this.parts[1]} at ${this.parts[2]}.`,
            success: false
        };
    }
}
