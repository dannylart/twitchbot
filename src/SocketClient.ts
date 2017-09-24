import * as net from 'net';
import {EventDispatcher} from 'simple-ts-event-dispatcher';
import {IEnvironment} from './IEnvironment';

export class SocketClient extends EventDispatcher {
    protected socket: net.Socket;

    protected connect(config: IEnvironment): void {
        this.socket = new net.Socket();
        this.socket.setTimeout(0);
        this.socket.setEncoding('ascii');
        this.socket.connect(parseInt(config.port), config.server);
        this.trigger('connected');
    }
}
