import {Enemy} from '../Enemy';
import {IAttributes} from '../IAttributes';

export class Dragon extends Enemy {
    public experienceForKill: number = 200;

    public attributes: IAttributes = {
        health: 1500,
        mana: 100,
        strength: 15,
        dexterity: 10,
        intelligence: 10,
        luck: 10
    };

    public attributesPerLevel: IAttributes = {
        health: 200,
        mana: 20,
        strength: 2.5,
        dexterity: 2,
        intelligence: 2,
        luck: .5
    };

    public get name(): string {
        return 'Dragon';
    }
}
