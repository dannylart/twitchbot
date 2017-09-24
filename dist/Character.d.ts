import { EventDispatcher } from 'simple-ts-event-dispatcher';
export declare abstract class Character extends EventDispatcher {
    health: number;
    maxHealth: number;
    mana: number;
    maxMana: number;
    strength: number;
    dexterity: number;
    intelligence: number;
    luck: number;
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
