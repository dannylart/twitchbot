import { Enemy } from '../Enemy';
import { IAttributes } from '../IAttributes';
export declare class Dragon extends Enemy {
    attributes: IAttributes;
    attributesPerLevel: IAttributes;
    readonly name: string;
}
