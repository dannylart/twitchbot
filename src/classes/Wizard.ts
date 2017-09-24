import {Class} from '../Class';
import {IAttributes} from '../IAttributes';

export class Wizard extends Class {
    public static keyword: string = 'wizard';
    public attributes: IAttributes = {
        health: 60,
        mana: 40,
        strength: 0,
        dexterity: 0,
        intelligence: 5,
        luck: 1
    };
    public spells: string[] = [
        'frostbolt',
        'stoneskin',
        'shock',
        'firebolt',
        'imp'
    ];
    public recipes: string[] = [
        '',
        '',
        '',
        '',
        ''
    ];
}
