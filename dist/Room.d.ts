import { EventDispatcher } from 'simple-ts-event-dispatcher';
import { Character } from './Character';
import { Enemy } from './Enemy';
export interface IRoom {
    name: string;
    id: string;
    x: number;
    y: number;
    difficulty: number;
    enemyTargetIds: string;
    display: string;
    hasEnemies: boolean;
    getEnemy(id: string): Character | null;
    once(...args: any[]): number;
    bind(...args: any[]): number;
    processEnemyTurn(): string;
}
export declare abstract class Room extends EventDispatcher implements IRoom {
    readonly game: any;
    readonly roomId: number;
    readonly x: number;
    readonly y: number;
    readonly difficulty: number;
    objects: any[];
    enemies: Enemy[];
    doors: any[];
    private enemyCounter;
    constructor(game: any, roomId: number, x: number, y: number, difficulty: number);
    readonly enemyTargetIds: string;
    readonly name: string;
    readonly id: string;
    readonly display: string;
    readonly hasEnemies: boolean;
    getEnemy(id: string): Character | null;
    endGame(): void;
    processEnemyTurn(): string;
    protected addEnemy<T extends Enemy>(t: any): T;
    protected abstract generate(): void;
}
