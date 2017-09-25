import { Class } from '../Class';
import { IAttributes } from '../IAttributes';
export declare class Cleric extends Class {
    static keyword: string;
    attributes: IAttributes;
    spells: string[];
    recipes: string[];
}
