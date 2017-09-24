import {Class} from '../Class';
import {IAttributes} from '../IAttributes';
import {INumberStore} from '../IStore';

export class Knight extends Class {
    public static keyword: string = 'knight';
    public static requirements: INumberStore = {
        figther: 5
    };

    public attributes: IAttributes = {
        health: 50,
        mana: 0,
        strength: 3,
        dexterity: 0,
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
