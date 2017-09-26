import { Game } from './Game';
import { Player } from './Player';
import { SocketClient } from './SocketClient';
export declare class BattleForCorvusBot extends SocketClient {
    private config;
    private reUser;
    private reTransfer;
    private transferred;
    private brawlAmount;
    private game;
    private gameTimeout;
    private participants;
    private canSendMessage;
    private messageQueue;
    private messageTimeout;
    private lockedPlayers;
    constructor(env: any);
    sendMessage(message: string): void;
    processAction(player: string, message: string): void;
    processWhisperedAction(playerName: string, message: string): void;
    protected _processWhisperedAction(game: Game, player: Player, message: string): void;
    private processMessageQueue();
    private onConnect();
    private getUsername(data);
    private onData(data);
    private onMessage(username, channel, message);
    private startGame();
    private closeGame();
}
