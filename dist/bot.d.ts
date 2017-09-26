import { Game } from './Game';
import { Player } from './Player';
import { SocketClient } from './SocketClient';
export declare class BattleForCorvusBot extends SocketClient {
    private players;
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
    constructor(env: any);
    getPlayer(playerName: string): Player;
    sendMessage(message: string): void;
    processAction(player: Player, message: string): void;
    processWhisperedAction(player: Player, message: string): void;
    protected _processWhisperedAction(game: Game, player: Player, message: string): void;
    private processMessageQueue();
    private onConnect();
    private getUsername(data);
    private onData(data);
    private _onData(player, line);
    private onMessage(player, channel, message);
    private startGame();
    private closeGame();
}
