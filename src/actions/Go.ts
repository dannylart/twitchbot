import {Action, IActionResult} from '../Action';
import {IRoom} from '../Room';

export class Go extends Action {
    public static keyword: string = ':!go';

    public process(): IActionResult {
        const direction: string = this.parts[1];
        const directions: string[] = [];
        let coords: number[] = [this.game.room.x, this.game.room.y];
        if (this.game.room.y !== 1)
            directions.push('north');
        if (this.game.room.x !== this.game.roomWidth)
            directions.push('east');
        if (this.game.room.y !== this.game.roomWidth)
            directions.push('south');
        if (this.game.room.x !== 1)
            directions.push('west');

        if (!direction)
            return {
                message: `The party is currently at [${coords[0]}, ${coords[1]}], ${this.game.room.display}. You can go the following directions: ${directions.join(', ')}`,
                success: false
            };

        if (directions.indexOf(direction) === -1)
            return {
                message: `${this.parts[1]} is not a valid direction. Choices are: ${directions.join(', ')}`,
                success: false
            };

        if (direction === 'north')
            coords[1] -= 1;

        if (direction === 'east')
            coords[0] += 1;

        if (direction === 'south')
            coords[1] += 1;

        if (direction === 'west')
            coords[0] -= 1;

        const room: IRoom | null = this.game.getRoomFromCoords(coords[0], coords[1]);
        if (room) {
            this.game.changeRoom(room);

            return {
                message: `${this.player.name} advances the party to ${room.display}.`,
                success: true
            };
        } else {
            return {
                message: `${this.player.name} advances the party ${this.parts[1]}.`,
                success: false
            };
        }
    }
}
