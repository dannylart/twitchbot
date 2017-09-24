import {Goblin} from '../enemies/Goblin';
import {Room} from '../Room';

export class Smithy extends Room {
    get name(): string {
        return 'Smithy';
    }

    protected generate(): void {
        const count: number = 2 + Math.floor(this.difficulty / 5);
        for (let i: number = 1; i <= count; i++)
            this.addEnemy(Goblin);
    }
}
