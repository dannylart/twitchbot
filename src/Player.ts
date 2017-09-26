import * as jsonfile from 'jsonfile';
import {Character} from './Character';
import {Class} from './Class';
import {ClassManager} from './ClassManager';
import {IAttributes} from './IAttributes';
import {INumberStore} from './IStore';

export class Player extends Character {
    public loaded: boolean;
    public experienceForKill: number = 0;
    public readonly name: string;
    public classes: INumberStore;
    public inventory: INumberStore;
    public gold: number;
    public experience: number;

    constructor(name: string) {
        super();
        this.name = name;
        this.inventory = {};
        this.classes = {};
        this.loaded = false;
        this.open();
    }

    public addGold(gold: number): void {
        this.gold += gold;
        this.save();
    }

    public removeGold(gold: number): void {
        this.gold -= gold;
        this.save();
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

    public getSpells(): string[] {
        const spells: string[] = [];

        for (const cls in this.classes) {
            const c: Class | null = ClassManager.getClass(cls, this.classes[cls]);
            if (c)
                spells.push(...c.getClassSpells());
        }

        return spells;
    }

    public hasSpell(spellName: string): boolean {
        return this.getSpells().indexOf(spellName) > -1;
    }

    public getAvailableClasses(): string[] {
        const classes: string[] = [];
        for (const cls of ClassManager.classes)
            if (cls.isAvailable(this, cls))
                classes.push(cls.keyword);

        return classes;
    }

    private fileName(): string {
        return `./players/${this.name}.json`;
    }

    private open(): void {
        jsonfile.readFile(this.fileName(), (err: string, obj: any) => {
            if (!err) {
                this.gold = obj.gold || 100;
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
                this.gold = 100;
                this.experience = 0;
                this.inventory = {};
                this.classes = {};
            }
            this.loaded = true;
            this.trigger('loaded', this);
        });
    }

    private save(): void {
        jsonfile.writeFile(this.fileName(), {
            gold: this.gold,
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
