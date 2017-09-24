import { Action } from './Action';
import { BattleForCorvusBot } from './bot';
import { Class } from './Class';
import { Player } from './Player';
import { IRoom, Room } from './Room';
import { EventDispatcher } from 'simple-ts-event-dispatcher';
export declare class Game extends EventDispatcher {
    static actions: typeof Action[];
    static roomTypes: typeof Room[];
    static classes: typeof Class[];
    players: Player[];
    commander: Player;
    playerTurn: number | null;
    room: IRoom;
    bot: BattleForCorvusBot;
    difficulty: number;
    rooms: IRoom[];
    roomWidth: number;
    exploredRooms: IRoom[];
    turnTimeout: any;
    paused: boolean;
    gameOver: boolean;
    loopInterval: any;
    constructor(bot: BattleForCorvusBot, particpants: string[], difficulty: number);
    readonly difficultyLevel: number;
    endTurn(): void;
    endGame(): void;
    changeRoom(room: IRoom): void;
    getRoomFromCoords(x: number, y: number): IRoom | null;
    readonly player: Player | null;
    readonly alivePlayers: Player[];
    readonly playersRemaining: number;
    randomAlivePlayer(): Player | null;
    getPlayer(playerName: string): Player | null;
    processAction(player: string, message: string): void;
    processWhisperedAction(playerName: string, message: string): void;
    getActions(): string[];
    getWhisperActions(): string[];
    generateRandomRoom(id: number, x: number, y: number): IRoom;
    getClass(cls: string, level: number): Class | null;
    getAvailableClasses(p: Player): string[];
    private loop();
}
