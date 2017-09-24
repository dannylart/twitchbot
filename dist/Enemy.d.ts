import { Character } from './Character';
import { IAttributes } from './IAttributes';
export interface IEnemy extends IAttributes {
    name: string;
    level: number;
    enemyId: number;
    id: string;
    display: string;
    initialize(): void;
}
export declare abstract class Enemy extends Character implements IEnemy {
    readonly enemyId: number;
    readonly level: number;
    abstract attributes: IAttributes;
    abstract attributesPerLevel: IAttributes;
    constructor(enemyId: number, level: number);
    initialize(): void;
    readonly id: string;
    readonly display: string;
}
