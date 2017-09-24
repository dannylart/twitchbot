import { Character } from './Character';
import { INumberStore } from './IStore';
import { IAttributes } from './IAttributes';
export declare class Player extends Character {
    readonly name: string;
    classes: INumberStore;
    inventory: INumberStore;
    experience: number;
    constructor(name: string);
    addExperience(xp: number): void;
    readonly level: number;
    levelUp(cls: string, attrs: IAttributes): number;
    private fileName();
    private open();
    private save();
}
