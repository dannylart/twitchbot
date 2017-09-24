import {Class} from '../Class';
import {IAttributes} from '../IAttributes';

export class Ranger extends Class {
    public static keyword: string = 'ranger';
    public attributes: IAttributes = {
        health: 60,
        mana: 40,
        strength: 0,
        dexterity: 5,
        intelligence: 0,
        luck: 1
    };
    public spells: string[] = [
        'multishot',
        '',
        '',
        '',
        'snipe'
    ];
    public recipes: string[] = [
        '',
        '',
        '',
        '',
        ''
    ];
}
