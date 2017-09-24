import {Action, IActionResult} from '../Action';

export class Hide extends Action {
    public static keyword: string = ':!hide';
    public static combat: boolean = true;

    public process(): IActionResult {
        return {
            message: `${this.player.name} hides.`,
            success: true
    }   ;
    }
}
