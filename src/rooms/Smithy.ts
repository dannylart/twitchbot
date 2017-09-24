import {Goblin} from '../enemies/Goblin';
import {Room} from '../Room';

export class Smithy extends Room {
    get name(): string {
        return 'Smithy';
    }

    protected generate(): void {
        this.enemies.push(new Goblin(1, this.difficulty));
    }
}
