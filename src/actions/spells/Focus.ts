import {Action, IActionResult} from '../../Action';
import {Buff} from '../../Buff';

export class Focus extends Action {
    public static keyword: string = 'focus';
    public static combat: boolean = true;

    public process(): IActionResult {
        if (this.player.mana < 10)
            return {
                message: `OOM!`,
                success: false
            };

        const b: Buff = new Buff('Focus');
        b.attributes.strength = 5 * this.player.level;
        this.player.mana -= 10;
        b.expire(60 * 5);
        this.player.buffs.add(b);

        return {
            message: `${this.player.name} cast Focus increasing their strength by ${b.attributes.strength} for 5 minutes.`,
            success: true
        };
    }
}
