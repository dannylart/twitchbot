import {Activity} from './Activity';
import {BattleForCorvusBot} from './bot';
import {Player} from './Player';
import {IRoom, Room} from './Room';
import {Crypt} from './rooms/Crypt';
import {Entrance} from './rooms/Entrance';
import {Library} from './rooms/Library';
import {Smithy} from './rooms/Smithy';
import {ActionManager} from './ActionManager';
import {EActionType} from './EActionType';

const DIFFICULTIES: number[] = [1, 50, 200, 500, 1000];

export class Game extends Activity {
    public static roomTypes: typeof Room[];
    public participants: string[];
    public playerTurn: number | null;
    public room: IRoom;
    public bot: BattleForCorvusBot;
    public difficulty: number;
    public rooms: IRoom[];
    public roomWidth: number;
    public exploredRooms: IRoom[];
    public turnTimeout: any;
    public paused: boolean;
    public gameOver: boolean;
    public loopInterval: any;

    constructor(bot: BattleForCorvusBot, particpants: string[], difficulty: number) {
        super();
        this.bot = bot;
        this.difficulty = difficulty;
        this.participants = particpants;
        this.rooms = [];
        this.exploredRooms = [];
        this.paused = true;
        this.gameOver = false;
        this.playerTurn = null;
    }

    public start(): void {
        // Generate rooms
        this.roomWidth = 1;
        for (const d of DIFFICULTIES) {
            if (this.difficulty >= d) {
                this.roomWidth += 1;
            } else {
                break;
            }
        }
        console.log('roomWidth', this.roomWidth);
        let roomId: number = 1;
        for (let x: number = 1; x <= this.roomWidth; x++) {
            for (let y: number = 1; y <= this.roomWidth; y++) {
                if (roomId === 1) {
                    this.rooms.push(new Entrance(this, roomId, x, y, this.difficultyLevel + Math.floor(x / 2) + Math.floor(y / 2)));
                } else if (x === this.roomWidth && y === this.roomWidth) {
                    const bossRoom: IRoom = new Crypt(this, roomId, x, y, this.difficultyLevel + Math.floor(x / 2) + Math.floor(y / 2));
                    this.rooms.push(bossRoom);
                    bossRoom.once('end', this.endGame, this);
                } else {
                    this.rooms.push(this.generateRandomRoom(roomId, x, y));
                }
                roomId += 1;
            }
        }
        this.room = this.rooms[0];
        this.endTurn();
        this.loopInterval = setInterval(this.loop.bind(this), 1000);
    }

    public get difficultyLevel(): number {
        return Math.floor(this.difficulty / 5 / this.participants.length) + 1;
    }

    public endTurn(): void {
        clearTimeout(this.turnTimeout);
        if (this.playersRemaining === 0) {
            this.bot.sendMessage(`There are 0 players remaining.`);
            this.endGame();
        } else if (!this.gameOver) {
            this.turnTimeout = setTimeout(this.endTurn.bind(this), 60000);
            this.paused = false;
            if (this.playerTurn === null) {
                this.playerTurn = 0;
            } else {
                this.playerTurn += 1;
            }

            if (this.playerTurn > this.participants.length - 1) {
                this.playerTurn = 0;
                if (this.room.hasEnemies) {
                    this.bot.sendMessage(this.room.processEnemyTurn());
                }
            }
            if (this.player === null || this.playersRemaining === 0) return;
            this.bot.sendMessage(`It is now ${this.player.name}'s turn for 1 minute. The current party location is ${this.room.display}`);
        }
    }

    public endGame(): void {
        clearTimeout(this.turnTimeout);
        this.gameOver = true;
        setTimeout(() => {
            this.paused = true;
            this.trigger('end');
        }, 2000);
    }

    public changeRoom(room: IRoom): void {
        if (this.exploredRooms.indexOf(this.room) === -1)
            this.exploredRooms.push(this.room);
        this.room = room;
    }

    public getRoomFromCoords(x: number, y: number): IRoom | null {
        for (const room of this.rooms) {
            if (room.x === x && room.y === y)
                return room;
        }

        return null;
    }

    public get player(): Player | null {
        if (this.playerTurn === null)
            return null;

        return this.getPlayer(this.participants[this.playerTurn]);
    }

    public get alivePlayers(): Player[] {
        const players: Player[] = [];
        for (const p of this.participants) {
            const player: Player = this.bot.getPlayer(p);
            if (!player.dead)
                players.push(player);
        }

        return players;
    }

    public get playersRemaining(): number {
        return this.alivePlayers.length;
    }

    public randomAlivePlayer(): Player | null {
        const players: Player[] = this.alivePlayers;
        if (players.length === 0)
            return null;

        return players[Math.floor(Math.random() * players.length)];
    }

    public getPlayer(playerName: string): Player | null {
        if (this.participants.indexOf(playerName) === -1) return null;

        return this.bot.getPlayer(playerName);
    }

    public generateRandomRoom(id: number, x: number, y: number): IRoom {
        const room: any = Game.roomTypes[Math.floor(Math.random() * Game.roomTypes.length)];

        return new room(this, id, x, y, this.difficultyLevel + Math.floor(x / 2) + Math.floor(y / 2)) as IRoom;
    }

    public getActions(): string[] {
        if (this.room && this.room.hasEnemies) {
            return ActionManager.getActions(EActionType.COMBAT);
        } else {
            return ActionManager.getActions(EActionType.EXPLORATION);
        }
    }

    private loop(): void {
        if (this.gameOver) return;
        if (this.playersRemaining === 0) this.endGame();
        const p: Player | null = this.player;
        if (p === null || p.dead) this.endTurn();
    }
}

Game.roomTypes = [];
Game.roomTypes.push(Library);
Game.roomTypes.push(Smithy);
