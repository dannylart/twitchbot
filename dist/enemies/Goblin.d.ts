import { Enemy } from '../Enemy';
import { IAttributes } from '../IAttributes';
export declare class Goblin extends Enemy {
    experienceForKill: number;
    attributes: IAttributes;
    attributesPerLevel: IAttributes;
    readonly name: string;
}
