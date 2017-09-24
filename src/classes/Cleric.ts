import {Class} from '../Class';
import {IAttributes} from '../IAttributes';

export class Cleric extends Class {
    public static keyword: string = 'cleric';
    public attributes: IAttributes = {
        health: 40,
        mana: 60,
        strength: 0,
        dexterity: 0,
        intelligence: 6,
        luck: 0
    };
    public spells: string[] = [
        'heal',
        '',
        '',
        '',
        ''
    ];
    public recipes: string[] = [
        '',
        '',
        '',
        '',
        ''
    ];
}
