import {Character} from './Character';
import {IAttributes} from './IAttributes';

export interface IEnemy extends IAttributes {
    name: string;
    level: number;
    enemyId: number;
    id: string;
    display: string;
    initialize(): void;
}

export abstract class Enemy extends Character implements IEnemy {
    public abstract attributes: IAttributes;
    public abstract attributesPerLevel: IAttributes;

    constructor(
        public readonly enemyId: number,
        public readonly level: number
    ) {
        super();
    }

    public initialize(): void {
        this.health = this.attributes.health;
        this.maxHealth = this.attributes.health;
        this.mana = this.attributes.mana;
        this.maxMana = this.attributes.mana;
        this.strength = this.attributes.strength;
        this.dexterity = this.attributes.dexterity;
        this.intelligence = this.attributes.intelligence;
        this.luck = this.attributes.luck;

        this.health += Math.floor(this.attributesPerLevel.health * this.level);
        this.maxHealth += Math.floor(this.attributesPerLevel.health * this.level);
        this.mana += Math.floor(this.attributesPerLevel.mana * this.level);
        this.maxMana += Math.floor(this.attributesPerLevel.mana * this.level);
        this.strength += Math.floor(this.attributesPerLevel.strength * this.level);
        this.dexterity += Math.floor(this.attributesPerLevel.dexterity * this.level);
        this.intelligence += Math.floor(this.attributesPerLevel.intelligence * this.level);
        this.luck += Math.floor(this.attributesPerLevel.luck * this.level);
    }

    public get id(): string {
        return `e${this.enemyId}`;
    }

    public get display(): string {
        return `L${this.level} ${this.name}(${this.id})`;
    }
}
