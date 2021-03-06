import {Action, IActionResult} from '../Action';
import {EActionType} from '../EActionType';

export class Status extends Action {
    public static keyword: string = ':!status';
    public static types: EActionType[] = [
        EActionType.GENERAL,
        EActionType.WHISPER,
        EActionType.EXPLORATION,
        EActionType.COMBAT
    ];

    public process(): IActionResult {
        const attributes: string = `L${this.player.level} ${this.player.name}: HP: ${this.player.health}/${this.player.maxHealth}, str: ${this.player.strength}, dex: ${this.player.dexterity}, int: ${this.player.intelligence}, luck: ${this.player.luck},`;
        const classes: string[] = [];
        for (const c in this.player.classes) {
            classes.push(`L${this.player.classes[c]} ${c}`);
        }

        return {
            message: `${attributes} ${this.player.experience} experience, ${this.player.gold} gold. Classes: ${classes.join(', ')}`,
            success: true
        };
    }
}
