import { SocketClient } from './SocketClient';
export declare class BattleForCorvusBot extends SocketClient {
    private config;
    private reUser;
    private reTransfer;
    private transferred;
    private game;
    private gameTimeout;
    private participants;
    private canSendMessage;
    private messageQueue;
    private messageTimeout;
    constructor(env: any);
    sendMessage(message: string): void;
    private processMessageQueue();
    private onConnect();
    private getUsername(data);
    private onData(data);
    private onMessage(username, channel, message);
    private startGame();
    private closeGame();
}
