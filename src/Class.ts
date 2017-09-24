import {IAttributes} from './IAttributes';
import {INumberStore} from './IStore';
import {Player} from './Player';

export abstract class Class {
    public static keyword: string;
    public static requirements: INumberStore = {};
    public abstract attributes: IAttributes;
    public abstract spells: string[];
    public abstract recipes: string[];

    constructor(public level: number) {}

    public static isAvailable(p: Player, c: typeof Class): boolean {
        for (const cls in c.requirements) {
            if (!p.classes[cls] || p.classes[cls] < c.requirements[cls])
                return false;
        }

        return true;
    }

    public getBaseClassAttributes(): IAttributes {
        return {
            health: this.attributes.health,
            mana: this.attributes.mana,
            strength: this.attributes.strength,
            dexterity: this.attributes.dexterity,
            intelligence: this.attributes.intelligence,
            luck: this.attributes.luck
        };
    }

    public getClassAttributes(): IAttributes {
        return {
            health: this.attributes.health * this.level,
            mana: this.attributes.mana * this.level,
            strength: this.attributes.strength * this.level,
            dexterity: this.attributes.dexterity * this.level,
            intelligence: this.attributes.intelligence * this.level,
            luck: this.attributes.luck * this.level
        };
    }

    public getClassSpells(): string[] {
        const spells: string[] = [];
        if (this.level >= 1)
            spells.push(this.spells[0]);
        if (this.level >= 2)
            spells.push(this.spells[1]);
        if (this.level >= 3)
            spells.push(this.spells[2]);
        if (this.level >= 4)
            spells.push(this.spells[3]);
        if (this.level >= 5)
            spells.push(this.spells[4]);

        return spells;
    }

    public getClassRecipes(): string[] {
        const recipes: string[] = [];
        if (this.level >= 1)
            recipes.push(this.recipes[0]);
        if (this.level >= 2)
            recipes.push(this.recipes[1]);
        if (this.level >= 3)
            recipes.push(this.recipes[2]);
        if (this.level >= 4)
            recipes.push(this.recipes[3]);
        if (this.level >= 5)
            recipes.push(this.recipes[4]);

        return recipes;
    }
}
