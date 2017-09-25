import {EventDispatcher} from 'simple-ts-event-dispatcher';
import {Action, IAction, IActionResult} from './Action';
import {Attack} from './actions/Attack';
import {Cast} from './actions/Cast';
import {Craft} from './actions/Craft';
import {EndTurn} from './actions/EndTurn';
import {Examine} from './actions/Examine';
import {Flee} from './actions/Flee';
import {Go} from './actions/Go';
import {Hide} from './actions/Hide';
import {Inventory} from './actions/Inventory';
import {Level} from './actions/Level';
import {Loot} from './actions/Loot';
import {Status} from './actions/Status';
import {Take} from './actions/Take';
import {Use} from './actions/Use';
import {BattleForCorvusBot} from './bot';
import {Class} from './Class';
import {Artisan} from './classes/Artisan';
import {Chemist} from './classes/Chemist';
import {Cleric} from './classes/Cleric';
import {Fighter} from './classes/Fighter';
import {Knight} from './classes/Knight';
import {Ranger} from './classes/Ranger';
import {Rogue} from './classes/Rogue';
import {Wizard} from './classes/Wizard';
import {Player} from './Player';
import {IRoom, Room} from './Room';
import {Crypt} from './rooms/Crypt';
import {Entrance} from './rooms/Entrance';
import {Library} from './rooms/Library';
import {Smithy} from './rooms/Smithy';

const DIFFICULTIES: number[] = [1, 50, 200, 500, 1000];

export class Game extends EventDispatcher {
    public static actions: typeof Action[];
    public static roomTypes: typeof Room[];
    public static classes: typeof Class[];
    public players: Player[];
    public commander: Player;
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
        this.players = [];
        this.rooms = [];
        this.exploredRooms = [];
        this.paused = true;
        this.gameOver = false;
        for (const p of particpants) {
            console.log('Adding', p);
            this.players.push(new Player(p));
        }
        this.playerTurn = null;

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
        return Math.floor(this.difficulty / 5 / this.players.length) + 1;
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

            if (this.playerTurn > this.players.length - 1) {
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

        return this.players[this.playerTurn];
    }

    public get alivePlayers(): Player[] {
        const players: Player[] = [];
        for (const p of this.players)
            if (!p.dead)
                players.push(p);

        return players;
    }

    public get playersRemaining(): number {
        let c: number = 0;
        for (const p of this.players)
            if (!p.dead)
                c += 1;

        return c;
    }

    public randomAlivePlayer(): Player | null {
        const players: Player[] = this.alivePlayers;
        if (players.length === 0)
            return null;

        return players[Math.floor(Math.random() * players.length)];
    }

    public getPlayer(playerName: string): Player | null {
        for (const p of this.players) {
            if (p.name === playerName)
                return p;
        }

        return null;
    }

    public processAction(player: string, message: string): void {
        if (this.player === null) return;
        if (this.player.name !== player || this.paused)
            return;

        const parts: string[] = message.trim().split(' ');
        const hasEnemies: boolean = this.room.hasEnemies;
        console.log(parts);
        for (const a of Game.actions) {
            if (a.keyword === parts[0] && a.combat === hasEnemies) {
                const action: IAction = new (a as any)(this, this.player, parts);
                const result: IActionResult = action.process();
                if (result.message)
                    this.bot.sendMessage(result.message);

                // Can only use one action when there are enemies
                if (hasEnemies && result.success)
                    this.endTurn();
            } else if (a.keyword === parts[0] && a.combat !== hasEnemies) {
                this.bot.sendMessage(`Currently cannot use ${parts[0].substr(1)}. Available commands: ${this.getActions().join(', ')}`);
            }
        }
    }

    public processWhisperedAction(playerName: string, message: string): void {
        const player: Player | null = this.getPlayer(playerName);
        if (player === null) return;

        const parts: string[] = message.trim().split(' ');
        console.log(parts);
        for (const a of Game.actions) {
            if (a.keyword === parts[0] && a.whisper) {
                const action: IAction = new (a as any)(this, player, parts);
                const result: IActionResult = action.process();
                if (result.message)
                    this.bot.sendMessage(`/w ${playerName} ${result.message}`);
            } else if (a.keyword === parts[0] && !a.whisper) {
                this.bot.sendMessage(`/w ${playerName} Currently cannot use ${parts[0].substr(1)}. Available whisper commands: ${this.getWhisperActions().join(', ')}`);
            }
        }
    }

    public getActions(): string[] {
        const actions: string[] = [];
        const hasEnemies: boolean = this.room.hasEnemies;

        for (const a of Game.actions) {
            if (a.combat === hasEnemies)
                actions.push(a.keyword.substr(1));
        }

        return actions;
    }

    public getWhisperActions(): string[] {
        const actions: string[] = [];
        for (const a of Game.actions) {
            if (a.whisper)
                actions.push(a.keyword.substr(1));
        }

        return actions;
    }

    public generateRandomRoom(id: number, x: number, y: number): IRoom {
        const room: any = Game.roomTypes[Math.floor(Math.random() * Game.roomTypes.length)];

        return new room(this, id, x, y, this.difficultyLevel + Math.floor(x / 2) + Math.floor(y / 2)) as IRoom;
    }

    public getClass(cls: string, level: number): Class | null {
        for (const c of Game.classes)
            if (c.keyword === cls)
                return new (c as any)(level);

        return null;
    }

    public getPlayerSpells(player: Player): string[] {
        const spells: string[] = [];

        for (const cls in player.classes) {
            const c: Class | null = this.getClass(cls, player.classes[cls]);
            if (c)
                spells.push(...c.getClassSpells());
        }

        return spells;
    }

    public playerHasSpell(player: Player, spellName: string): boolean {
        return this.getPlayerSpells(player).indexOf(spellName) > -1;
    }

    public getAvailableClasses(p: Player): string[] {
        const classes: string[] = [];
        for (const cls of Game.classes)
            if (cls.isAvailable(p, cls))
                classes.push(cls.keyword);

        return classes;
    }

    private loop(): void {
        if (this.gameOver) return;
        if (this.playersRemaining === 0) this.endGame();
        const p: Player | null = this.player;
        if (p === null || p.dead) this.endTurn();
    }
}

Game.actions = [];
Game.actions.push(Attack);
Game.actions.push(Cast);
Game.actions.push(Craft);
Game.actions.push(EndTurn);
Game.actions.push(Examine);
Game.actions.push(Flee);
Game.actions.push(Go);
Game.actions.push(Hide);
Game.actions.push(Inventory);
Game.actions.push(Level);
Game.actions.push(Loot);
Game.actions.push(Status);
Game.actions.push(Take);
Game.actions.push(Use);

Game.roomTypes = [];
Game.roomTypes.push(Library);
Game.roomTypes.push(Smithy);

Game.classes = [];
Game.classes.push(Artisan);
Game.classes.push(Fighter);
Game.classes.push(Chemist);
Game.classes.push(Cleric);
Game.classes.push(Knight);
Game.classes.push(Ranger);
Game.classes.push(Rogue);
Game.classes.push(Wizard);
