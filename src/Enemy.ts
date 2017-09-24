import {Character} from './Character';
import {IAttributes} from './IAttributes';

export interface IEnemy {
    name: string;
    level: number;
    enemyId: number;
    id: string;
    display: string;
}

export abstract class Enemy extends Character implements IEnemy {
    public abstract attributes: IAttributes = {
        health: 10,
        mana: 0,
        strength: 2,
        dexterity: 2,
        intelligence: 2,
        luck: 2
    };

    constructor(
        public readonly enemyId: number,
        public readonly level: number
    ) {
        super();
        this.health += this.attributes.health * level;
        this.maxHealth += this.attributes.health * level;
        this.mana += this.attributes.mana * level;
        this.maxMana += this.attributes.mana * level;
        this.strength += this.attributes.strength * level;
        this.dexterity += this.attributes.dexterity * level;
        this.intelligence += this.attributes.intelligence * level;
        this.luck += this.attributes.luck * level;
    }

    public get id(): string {
        return `e${this.enemyId}`;
    }

    public get display(): string {
        return `L${this.level} ${this.name}(${this.id})`;
    }
}
