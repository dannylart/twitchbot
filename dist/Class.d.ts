import { IAttributes } from './IAttributes';
import { INumberStore } from './IStore';
import { Player } from './Player';
export declare abstract class Class {
    level: number;
    static keyword: string;
    static requirements: INumberStore;
    abstract attributes: IAttributes;
    abstract spells: string[];
    abstract recipes: string[];
    constructor(level: number);
    static isAvailable(p: Player, c: typeof Class): boolean;
    getBaseClassAttributes(): IAttributes;
    getClassAttributes(): IAttributes;
    getClassSpells(): string[];
    getClassRecipes(): string[];
}
