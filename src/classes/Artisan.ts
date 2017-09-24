import {Class} from '../Class';
import {IAttributes} from '../IAttributes';

export class Artisan extends Class {
    public static keyword: string = 'artisan';
    public attributes: IAttributes = {
        health: 0,
        mana: 0,
        strength: 4,
        dexterity: 4,
        intelligence: 4,
        luck: 4
    };
    public spells: string[] = [
        '',
        '',
        '',
        '',
        ''
    ];
    public recipes: string[] = [
        'potion',
        'torch',
        'antidote',
        '',
        ''
    ];
}
