
declare module 'jsonfile' {
    export function readFile(file: string, fnc: (error: string, obj: any) => void): void;
    export function writeFile(file: string, obj: any, config?: any, fnc?: (error: string) => void): void;
}
