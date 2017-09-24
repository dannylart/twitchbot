import {EventDispatcher} from 'simple-ts-event-dispatcher';
import {BuffManager} from './BuffManager';
import {IAttributes} from './IAttributes';

export abstract class Character extends EventDispatcher implements IAttributes {
    // Attributes
    public health: number;
    public maxHealth: number;
    public mana: number;
    public maxMana: number;

    public strength: number; // melee attack power
    public dexterity: number; // ranged attack power
    public intelligence: number; // spell power
    public luck: number; // crit & other misc.

    public buffs: BuffManager;

    constructor() {
        super();
        this.health = 1000;
        this.maxHealth = 1000;
        this.mana = 50;
        this.maxMana = 50;
        this.strength = 10;
        this.dexterity = 10;
        this.intelligence = 10;
        this.luck = 10;
        this.buffs = new BuffManager(this);
    }

    public get dead(): boolean {
        return this.health <= 0;
    }

    public abstract get name(): string;

    get attackPower(): number {
        return (this.strength + this.buffs.attributes.strength) * 10;
    }

    get attackDamage(): number {
        const min: number = this.attackPower * .75;
        const max: number = this.attackPower * 1.25;

        return Math.floor(Math.random() * (max - min) + min);
    }

    get criticalHit(): boolean {
        return Math.floor(Math.random() * 100) <= this.luck + this.buffs.attributes.luck;
    }

    public attack(e: Character): string {
        const result: string[] = [];
        result.push(`${e.hit(this)}`);

        return result.join(' ');
    }

    public hit(e: Character): string {
        let damage: number = e.attackDamage;
        const critical: boolean = e.criticalHit;
        const hit: string = critical ? 'critically hit' : 'hit';
        if (critical)
            damage *= 2;

        this.health -= damage;
        const result: string = `${e.name} attacked ${this.name} and was ${hit} for ${damage} and has`;
        if (!this.dead) {
            return `${result} ${this.health} health remaining.`;
        } else {
            this.die();
            return `${result} died.`;
        }
    }

    protected die(): void {
        this.trigger('death');
    }
}
