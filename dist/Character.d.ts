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
    buffs: BuffManager;
    constructor();
    readonly dead: boolean;
    readonly abstract name: string;
    readonly attackPower: number;
    readonly attackDamage: number;
    readonly criticalHit: boolean;
    attack(e: Character): string;
    hit(e: Character): string;
    protected die(): void;
}
