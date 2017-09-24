/// <reference types="node" />
import * as net from 'net';
import { EventDispatcher } from 'simple-ts-event-dispatcher';
import { IEnvironment } from './IEnvironment';
export declare class SocketClient extends EventDispatcher {
    protected socket: net.Socket;
    protected connect(config: IEnvironment): void;
}
