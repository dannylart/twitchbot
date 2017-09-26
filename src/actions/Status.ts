import {Action, IActionResult} from '../Action';

export class Status extends Action {
    public static keyword: string = ':!status';
    public static whisper: boolean = true;

    public process(): IActionResult {
        const attributes: string = `L${this.player.level} ${this.player.name}: HP: ${this.player.health}/${this.player.maxHealth}, str: ${this.player.strength}, dex: ${this.player.dexterity}, int: ${this.player.intelligence}, luck: ${this.player.luck},`;
        const classes: string[] = [];
        for (const c in this.player.classes) {
            classes.push(`L${this.player.classes[c]} ${c}`);
        }

        return {
            message: `${attributes} ${this.player.experience} experience. Classes: ${classes.join(', ')}`,
            success: true
        };
    }
}
