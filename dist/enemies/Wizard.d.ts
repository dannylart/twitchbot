import { Enemy } from '../Enemy';
import { IAttributes } from '../IAttributes';
export declare class Wizard extends Enemy {
    attributes: IAttributes;
    attributesPerLevel: IAttributes;
    readonly name: string;
}
