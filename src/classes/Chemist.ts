import {Class} from '../Class';
import {IAttributes} from '../IAttributes';
import {INumberStore} from '../IStore';

export class Chemist extends Class {
    public static keyword: string = 'chemist';
    public static requirements: INumberStore = {
        artisan: 2
    };
    public attributes: IAttributes = {
        health: 10,
        mana: 15,
        strength: 0,
        dexterity: 0,
        intelligence: 1,
        luck: 1
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
        'ether',
        'elixir',
        'antidote',
        'phoenixdown'
    ];
}
