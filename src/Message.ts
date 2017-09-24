import {TStr} from './TStr';

class Message {
    constructor(
        public username: TStr,
        public channel: TStr,
        public message: TStr,
        public line: string[]
    ) {

    }
}
