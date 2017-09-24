import {IAttributes} from './IAttributes';

export class Buff {
    public id: string;
    public expired: boolean;
    public attributes: IAttributes;

    constructor(id: string) {
        this.id = id;
        this.attributes = {
            health: 0,
            mana: 0,
            strength: 0,
            dexterity: 0,
            intelligence: 0,
            luck: 0
        };
        this.expired = false;
    }

    public expire(s: number): void {
        setTimeout(() => {
            this.expired = true;
        }, s * 1000);
    }
}
