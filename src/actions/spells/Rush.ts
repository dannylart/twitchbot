import {Action, IActionResult} from '../../Action';
import {Character} from '../../Character';

export class Rush extends Action {
    public static keyword: string = 'rush';
    public static combat: boolean = true;

    public process(): IActionResult {
        if (this.player.mana < 10)
            return {
                message: `OOM!`,
                success: false
            };

        this.player.mana -= 10;

        const enemy: Character |null = this.game.room.getEnemy(this.parts[2]);
        if (!enemy)
            return {
                message: `Invalid target.`,
                success: false
            };

        return {
            message: enemy.hit(this.player, 'used rush on', 1.25),
            success: true
        };
    }
}
