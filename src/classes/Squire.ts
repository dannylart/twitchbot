import {Class} from '../Class';
import {IAttributes} from '../IAttributes';

export class Squire extends Class {
    public static keyword: string = 'squire';
    public attributes: IAttributes = {
        health: 25,
        mana: 0,
        strength: 1,
        dexterity: 1,
        intelligence: 0,
        luck: 0
    };
    public spells: string[] = [
        'focus',
        'rush',
        'stone',
        'salve',
        'rend'
    ];
    public recipes: string[] = [
        'torch',
        '',
        'campfire',
        '',
        ''
    ];
}
