import {Dragon} from '../enemies/Dragon';
import {Room} from '../Room';

export class Crypt extends Room {
    get name(): string {
        return 'The Crypt';
    }

    protected generate(): void {
        const dragon: Dragon = new Dragon(1, this.difficulty);
        this.enemies.push(dragon);
        dragon.once('death', this.endGame, this);
    }
}
