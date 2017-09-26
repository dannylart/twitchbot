import {Action, IActionResult} from '../Action';
import {Character} from '../Character';

export class Attack extends Action {
    public static keyword: string = ':!attack';
    public static combat: boolean = true;

    public process(): IActionResult {
        if (this.parts.length > 1) {
            const e: Character | null = this.game.room.getEnemy(this.parts[1]);
            if (e) {
                let r: string = this.player.attack(e);
                if (e.dead)
                    r += this.addPartyExperienceAndGold(e.getExperienceForKill());

                return {
                    message: r,
                    success: true
                };
            } else {
                return {
                    message: 'Invalid target to attack',
                    success: false
                };
            }
        } else {
            const target: string = this.game.room.enemyTargetIds;
            if (target === '') {
                return {
                    message: 'No targets available',
                    success: false
                };
            } else {
                return {
                    message: `Possible targets to attack are: ${this.game.room.enemyTargetIds}`,
                    success: false
                };
            }
        }
    }
}
