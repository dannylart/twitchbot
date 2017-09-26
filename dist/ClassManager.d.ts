import { Class } from './Class';
export declare class ClassManager {
    static classes: typeof Class[];
    static getClass(cls: string, level: number): Class | null;
}
