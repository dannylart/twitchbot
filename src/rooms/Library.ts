import {Room} from '../Room';
import {Goblin} from '../enemies/Goblin';

export class Library extends Room {
    get name(): string {
        return 'Library';
    }

    protected generate(): void {
        this.addEnemy(Goblin);
    }
}
