import {Wizard} from '../enemies/Wizard';
import {Room} from '../Room';

export class Library extends Room {
    get name(): string {
        return 'Library';
    }

    protected generate(): void {
        this.addEnemy(Wizard);
        this.addEnemy(Wizard);
    }
}
