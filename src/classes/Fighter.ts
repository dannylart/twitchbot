import {Class} from '../Class';
import {IAttributes} from '../IAttributes';

export class Fighter extends Class {
    public static keyword: string = 'fighter';
    public attributes: IAttributes = {
        health: 100,
        mana: 0,
        strength: 5,
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
