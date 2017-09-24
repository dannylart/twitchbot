import {Action, IActionResult} from '../../Action';
import {Buff} from '../../Buff';

export class Focus extends Action {
    public static keyword: string = 'focus';
    public static combat: boolean = true;

    public process(): IActionResult {
        const b: Buff = new Buff('Focus');
        b.attributes.strength = 50;
        b.expire(60 * 5);
        this.player.buffs.add(b);

        return {
            message: `${this.player.name} cast Focus increasing their strength for a short duration.`,
            success: true
        };
    }
}
