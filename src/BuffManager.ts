import {Buff} from './Buff';
import {Character} from './Character';
import {IAttributes} from './IAttributes';

export class BuffManager {
    public buffs: Buff[];

    constructor(character: Character) {
        this.buffs = [];
    }

    public add(b: Buff): void {
        for (const buff of this.buffs) {
            if (b.id === buff.id && !buff.expired)
                buff.expired = true;
        }

        this.buffs.push(b);
    }

    public get attributes(): IAttributes {
        const attrs: IAttributes = {
            health: 0,
            mana: 0,
            strength: 0,
            dexterity: 0,
            intelligence: 0,
            luck: 0
        };

        for (const buff of this.buffs) {
            if (buff.expired) continue;

            attrs.health += buff.attributes.health;
            attrs.mana += buff.attributes.mana;
            attrs.strength += buff.attributes.strength;
            attrs.dexterity += buff.attributes.dexterity;
            attrs.intelligence += buff.attributes.intelligence;
            attrs.luck += buff.attributes.luck;
        }

        return attrs;
    }
}
