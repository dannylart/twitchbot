import { EventDispatcher } from 'simple-ts-event-dispatcher';
import { BuffManager } from './BuffManager';
import { IAttributes } from './IAttributes';
export declare abstract class Character extends EventDispatcher implements IAttributes {
    health: number;
    maxHealth: number;
    mana: number;
    maxMana: number;
    strength: number;
    dexterity: number;
    intelligence: number;
    luck: number;
    abstract level: number;
    abstract experienceForKill: number;
    buffs: BuffManager;
    constructor();
    readonly dead: boolean;
    readonly abstract name: string;
    readonly attackPower: number;
    readonly spellPower: number;
    readonly attackDamage: number;
    readonly spellDamage: number;
    readonly criticalHit: boolean;
    attack(e: Character): string;
    getExperienceForKill(): number;
    hit(attacker: Character, action?: string, multi?: number, melee?: boolean): string;
    protected die(): void;
}
