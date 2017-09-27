import {EventDispatcher} from 'simple-ts-event-dispatcher';

export class Activity extends EventDispatcher {
    public participants: string[];
    public gameOver: boolean;
    public loopInterval: any;
}
