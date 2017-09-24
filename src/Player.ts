import * as jsonfile from 'jsonfile';
import {Character} from './Character';
import {INumberStore} from './IStore';
import {IAttributes} from './IAttributes';

export class Player extends Character {
    public readonly name: string;
    public classes: INumberStore;
    public inventory: INumberStore;
    public experience: number;

    constructor(name: string) {
        super();
        this.name = name;
        this.inventory = {};
        this.classes = {};
        this.open();
    }

    public addExperience(xp: number): void {
        this.experience += xp;
        this.save();
    }

    get level(): number {
        let level: number = 0;
        for (const c in this.classes) {
            level += this.classes[c];
        }

        return level;
    }

    public levelUp(cls: string, attrs: IAttributes): number {
        if (!this.classes[cls])
            this.classes[cls] = 0;
        this.classes[cls] += 1;
        this.maxHealth += attrs.health;
        this.maxMana += attrs.mana;
        this.strength += attrs.strength;
        this.dexterity += attrs.dexterity;
        this.intelligence += attrs.intelligence;
        this.luck += attrs.luck;
        this.save();

        // Heal up the character
        this.health = this.maxHealth;
        this.mana = this.maxMana;
        return this.classes[cls];
    }

    private fileName(): string {
        return `./players/${this.name}.json`;
    }

    private open(): void {
        jsonfile.readFile(this.fileName(), (err: string, obj: any) => {
            if (!err) {
                this.experience = obj.experience || 0;
                this.health = this.maxHealth = obj.health || 100;
                this.mana = this.maxMana = obj.mana || 50;
                this.strength = obj.strength || 10;
                this.dexterity = obj.dexterity || 10;
                this.intelligence = obj.intelligence || 10;
                this.luck = obj.luck || 10;

                this.inventory = obj.inventory || {};
                this.classes = obj.classes || {};
            } else {
                this.experience = 0;
                this.inventory = {};
                this.classes = {};
            }
        });
    }

    private save(): void {
        jsonfile.writeFile(this.fileName(), {
            experience: this.experience,
            health: this.maxHealth,
            mana: this.maxMana,
            strength: this.strength,
            dexterity: this.dexterity,
            intelligence: this.intelligence,
            luck: this.luck,
            classes: this.classes,
            inventory: this.inventory
        });
    }
}
