import { IAttributes } from './IAttributes';
export declare class Buff {
    id: string;
    expired: boolean;
    attributes: IAttributes;
    constructor(id: string);
    expire(s: number): void;
}
