import {Class} from '../Class';
import {IAttributes} from '../IAttributes';

export class Rogue extends Class {
    public static keyword: string = 'rogue';
    public attributes: IAttributes = {
        health: 40,
        mana: 20,
        strength: 5,
        dexterity: 5,
        intelligence: 1,
        luck: 3
    };
    public spells: string[] = [
        'doublestrike',
        'sap',
        'fanofknives',
        'cloakofshadows',
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
