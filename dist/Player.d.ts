import { Character } from './Character';
import { IAttributes } from './IAttributes';
import { INumberStore } from './IStore';
export declare class Player extends Character {
    loaded: boolean;
    experienceForKill: number;
    readonly name: string;
    classes: INumberStore;
    inventory: INumberStore;
    experience: number;
    constructor(name: string);
    addExperience(xp: number): void;
    readonly level: number;
    levelUp(cls: string, attrs: IAttributes): number;
    getSpells(): string[];
    hasSpell(spellName: string): boolean;
    getAvailableClasses(): string[];
    private fileName();
    private open();
    private save();
}
