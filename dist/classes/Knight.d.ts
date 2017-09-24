import { Class } from '../Class';
import { IAttributes } from '../IAttributes';
import { INumberStore } from '../IStore';
export declare class Knight extends Class {
    static keyword: string;
    static requirements: INumberStore;
    attributes: IAttributes;
    spells: string[];
    recipes: string[];
}
