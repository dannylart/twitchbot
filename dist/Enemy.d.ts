import { Character } from './Character';
import { IAttributes } from './IAttributes';
export interface IEnemy {
    name: string;
    level: number;
    enemyId: number;
    id: string;
    display: string;
}
export declare abstract class Enemy extends Character implements IEnemy {
    readonly enemyId: number;
    readonly level: number;
    abstract attributes: IAttributes;
    constructor(enemyId: number, level: number);
    readonly id: string;
    readonly display: string;
}
