import {Goblin} from '../enemies/Goblin';
import {Room} from '../Room';

export class Entrance extends Room {
    get name(): string {
        return 'Dungeon Entrance';
    }

    protected generate(): void {
        const count: number = Math.floor(this.difficulty / 5);
        for (let i: number = 1; i <= count; i++)
            this.enemies.push(new Goblin(1, this.difficulty));
    }
}
