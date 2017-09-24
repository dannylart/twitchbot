import {Enemy} from '../Enemy';
import {IAttributes} from '../IAttributes';

export class Goblin extends Enemy {
    public attributes: IAttributes = {
        health: 100,
        mana: 0,
        strength: 4,
        dexterity: 2,
        intelligence: 0,
        luck: 0
    };

    public attributesPerLevel: IAttributes = {
        health: 20,
        mana: 0,
        strength: 2,
        dexterity: 1,
        intelligence: .25,
        luck: 0
    };

    public get name(): string {
        return 'Goblin';
    }
}
