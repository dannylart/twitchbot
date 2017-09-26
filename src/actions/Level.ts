import {Action, IActionResult} from '../Action';
import {ClassManager} from '../ClassManager';

export class Level extends Action {
    public static keyword: string = ':!level';
    public static whisper: boolean = true;

    public process(): IActionResult {
        const requirement: number = Math.floor((Math.log10(this.player.level + 1) + 1) * 250 * this.player.level + 100);
        if (this.player.experience < requirement)
            return {
                message: `Not enough experience to level. You have ${this.player.experience} experience of the ${requirement} needed.`,
                success: false
            };

        const availble: string[] = this.player.getAvailableClasses();
        if (this.parts.length > 1) {
            if (availble.indexOf(this.parts[1]) > -1) {
                const cls: any = ClassManager.getClass(this.parts[1], 1);
                this.player.experience -= requirement;
                const lvl: number = this.player.levelUp(this.parts[1], cls.getBaseClassAttributes());

                return {
                    message: `${this.player.name} levels ${this.parts[1]} to ${lvl} and is now character level ${this.player.level}.`,
                    success: true
                };
            }

            return {
                message: `Cannot level ${this.parts[1]}.`,
                success: false
            };
        } else {
            return {
                message: `The following can be leveled: ${availble.join(', ')}`,
                success: false
            };
        }
    }
}
