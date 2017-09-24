import {Enemy} from '../Enemy';
import {IAttributes} from '../IAttributes';

export class Goblin extends Enemy {
    public attributes: IAttributes = {
        health: 10,
        mana: 0,
        strength: 1,
        dexterity: 1,
        intelligence: 1,
        luck: 1
    };

    public get name(): string {
        return 'Goblin';
    }
}
