import {EventDispatcher} from 'simple-ts-event-dispatcher';
import {Character} from './Character';
import {Enemy} from './Enemy';
import {Player} from './Player';

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

export abstract class Room extends EventDispatcher implements IRoom {
    public objects: any[];
    public enemies: Enemy[];
    public doors: any[];
    private enemyCounter: number;

    constructor(
        public readonly game: any,
        public readonly roomId: number,
        public readonly x: number,
        public readonly y: number,
        public readonly difficulty: number
    ) {
        super();
        this.enemies = [];
        this.objects = [];
        this.doors = [];
        this.enemyCounter = 1;
        console.log(`Room with id ${this.id} created.`);
        this.generate();
    }

    public get enemyTargetIds(): string {
        const names: string[] = [];
        for (const enemy of this.enemies) {
            if (!enemy.dead)
                names.push(enemy.display);
        }

        return names.join(', ');
    }

    get name(): string {
        return 'A dank room';
    }

    get id(): string {
        return `r${this.roomId}`;
    }

    get display(): string {
        return `${this.name}(${this.id})`;
    }

    get hasEnemies(): boolean {
        for (const enemy of this.enemies) {
            if (!enemy.dead)
                return true;
        }

        return false;
    }

    public getEnemy(id: string): Character | null {
        for (const e of this.enemies) {
            if (!e.dead && e.id === id)
                return e;
        }

        return null;
    }

    public endGame(): void {
        this.trigger('end');
    }

    public processEnemyTurn(): string {
        const results: string[] = [];
        for (const e of this.enemies) {
            if (!e.dead) {
                const p: Player | null = this.game.randomAlivePlayer();
                if (p !== null)
                    results.push(e.attack(p));
            }
        }

        return results.join(' ');
    }

    protected addEnemy<T extends Enemy>(t: any): T {
        const enemy: T = new t(this.enemyCounter, this.difficulty);
        enemy.initialize();
        this.enemies.push(enemy);
        this.enemyCounter += 1;

        return enemy;
    }

    protected abstract generate(): void;
}
