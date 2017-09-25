import {Action, IActionResult} from '../Action';
import {Focus} from './spells/Focus';
import {Rush} from './spells/Rush';

const SPELLS: any[] = [];
SPELLS.push(Focus);
SPELLS.push(Rush);

export class Cast extends Action {
    public static keyword: string = ':!cast';
    public static combat: boolean = true;

    public process(): IActionResult {
        if (!this.parts[1]) {
            return {
                message: `You can cast the following spells: ${this.game.getPlayerSpells(this.player).join(', ')}`,
                success: false
            };
        }

        if (!this.game.playerHasSpell(this.player, this.parts[1])) {
            return {
                message: `You cannot cast ${this.parts[1]}.`,
                success: false
            };
        }

        for (const spell of SPELLS) {
            if (spell.keyword === this.parts[1]) {
                const s: Action = new spell(this.game, this.player, this.parts);

                return s.process();
            }
        }

        return {
            message: `The spell fizzles.`,
            success: false
        };
    }
}
