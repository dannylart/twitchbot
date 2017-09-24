import {Enemy} from '../Enemy';
import {IAttributes} from '../IAttributes';

export class Wizard extends Enemy {
    public attributes: IAttributes = {
        health: 400,
        mana: 50,
        strength: 1,
        dexterity: 1,
        intelligence: 5,
        luck: 2
    };

    public attributesPerLevel: IAttributes = {
        health: 40,
        mana: 10,
        strength: .25,
        dexterity: .25,
        intelligence: 1,
        luck: .5
    };

    public get name(): string {
        return 'Wizard';
    }
}
