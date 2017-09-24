import { Buff } from './Buff';
import { Character } from './Character';
import { IAttributes } from './IAttributes';
export declare class BuffManager {
    buffs: Buff[];
    constructor(character: Character);
    add(b: Buff): void;
    readonly attributes: IAttributes;
}
