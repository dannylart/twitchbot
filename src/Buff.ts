import {IAttributes} from './IAttributes';

export class Buff {
    public id: string;
    public expired: boolean;
    public attributes: IAttributes;

    constructor(id: string) {
        this.id = id;
        this.attributes = {};
        this.expired = false;
    }

    public expire(s: number): void {
        setTimeout(() => {
            this.expired = true;
        }, s * 1000);
    }
}
