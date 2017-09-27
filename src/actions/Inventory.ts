import {Action, IActionResult} from '../Action';
import {EActionType} from '../EActionType';

export class Inventory extends Action {
    public static keyword: string = ':!inventory';
    public static types: EActionType[] = [
        EActionType.GENERAL,
        EActionType.WHISPER,
        EActionType.EXPLORATION
    ];

    public process(): IActionResult {
        const items: string[] = [];
        for (const i in this.player.inventory) {
            items.push(`${this.player.inventory[i]}x ${i}`);
        }

        return {
            message: items.length > 0 ? `${this.player.name} has the following items: ${items.join(', ')}` : `${this.player.name} has no items.`,
            success: items.length > 0
        };
    }
}
