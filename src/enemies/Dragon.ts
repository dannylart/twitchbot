import {Enemy} from '../Enemy';
import {IAttributes} from '../IAttributes';

export class Dragon extends Enemy {
    public attributes: IAttributes = {
        health: 100,
        mana: 0,
        strength: 10,
        dexterity: 10,
        intelligence: 10,
        luck: 3
    };

    public get name(): string {
        return 'Dragon';
    }
}
