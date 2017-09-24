import {Goblin} from '../enemies/Goblin';
import {Room} from '../Room';

export class Smithy extends Room {
    get name(): string {
        return 'Smithy';
    }

    protected generate(): void {
        this.addEnemy(Goblin);
    }
}
