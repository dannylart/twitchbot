import { EventDispatcher } from 'simple-ts-event-dispatcher';
export declare class Activity extends EventDispatcher {
    participants: string[];
    gameOver: boolean;
    loopInterval: any;
}
