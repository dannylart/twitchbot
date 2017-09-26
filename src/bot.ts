import * as envData from '../env.json';
import {IAction, IActionResult} from './Action';
import {Game} from './Game';
import {IEnvironment} from './IEnvironment';
import {Player} from './Player';
import {SocketClient} from './SocketClient';

type UserName = string | null;
type Message = string | undefined;

export class BattleForCorvusBot extends SocketClient {
    private config: IEnvironment;
    private reUser: RegExp;
    private reTransfer: RegExp;
    private transferred: number;
    private game: Game | null;
    private gameTimeout: any;
    private participants: string[];
    private canSendMessage: boolean;
    private messageQueue: string[];
    private messageTimeout: any;

    constructor(env: any) {
        super();
        this.reUser = new RegExp(':([^!]+).+');
        this.reTransfer = new RegExp(/:Transferred (\d+) Peggles from ([^\s]+) to battleforcorvus./);
        this.canSendMessage = true;
        this.messageQueue = [];
        this.transferred = 0;
        this.config = env as IEnvironment;
        this.bind('connected', this.onConnect, this);
        this.connect(this.config);
    }

    public sendMessage(message: string): void {
        this.messageQueue.push(message as string);
        if (this.canSendMessage)
            this.processMessageQueue();
    }

    public processAction(player: string, message: string): void {
        if (!this.game) return;
        if (this.game.player === null) return;
        if (this.game.player.name !== player || this.game.paused)
            return;

        const parts: string[] = message.trim().split(' ');
        const hasEnemies: boolean = this.game.room.hasEnemies;
        console.log(parts);
        for (const a of Game.actions) {
            if (a.keyword === parts[0] && a.combat === hasEnemies) {
                const action: IAction = new (a as any)(this, this.game.player, parts);
                const result: IActionResult = action.process();
                if (result.message)
                    this.sendMessage(result.message);

                // Can only use one action when there are enemies
                if (hasEnemies && result.success)
                    this.game.endTurn();
            } else if (a.keyword === parts[0] && a.combat !== hasEnemies) {
                this.sendMessage(`Currently cannot use ${parts[0].substr(1)}. Available commands: ${this.game.getActions().join(', ')}`);
            }
        }
    }

    public processWhisperedAction(playerName: string, message: string): void {
        const game: Game = this.game || new Game(this, [playerName], 0);
        const player: Player | null = game.getPlayer(playerName);
        if (player === null) return;

        if (player.loaded) {
            this._processWhisperedAction(game, player, message);
        } else {
            player.once('loaded', () => {
                this._processWhisperedAction(game, player, message);
            }, this);
        }
    }

    protected _processWhisperedAction(game: Game, player: Player, message: string): void {
        const parts: string[] = message.trim().split(' ');
        for (const a of Game.actions) {
            if (a.keyword === parts[0] && a.whisper) {
                const action: IAction = new (a as any)(game, player, parts);
                const result: IActionResult = action.process();
                if (result.message)
                    this.sendMessage(`/w ${player.name} ${result.message}`);
            } else if (a.keyword === parts[0] && !a.whisper) {
                this.sendMessage(`/w ${player.name} Currently cannot use ${parts[0].substr(1)}. Available whisper commands: ${game.getWhisperActions().join(', ')}`);
            }
        }
    }

    private processMessageQueue(): void {
        clearTimeout(this.messageTimeout);
        this.messageTimeout = setTimeout(this.processMessageQueue.bind(this), 500);

        if (this.messageQueue.length > 0) {
            this.canSendMessage = false;
            const message: string = this.messageQueue.shift() as string;
            console.log('SENDING!', `PRIVMSG #${this.config.channel} :${message}\r\n`);
            this.socket.write(`PRIVMSG #${this.config.channel} :${message}\r\n`);
        } else {
            this.canSendMessage = true;
        }
    }

    private onConnect(): void {
        console.log('onConnect');
        this.socket.write(`PASS ${this.config.oauth}\r\n`);
        this.socket.write(`NICK ${this.config.username}\r\n`);
        this.socket.write(`JOIN #${this.config.channel}\r\n`);
        this.socket.write(`CAP REQ :twitch.tv/commands\r\n`);

        this.socket.addListener('data', this.onData.bind(this));
    }

    private getUsername(data: string): UserName {
        const r: any = this.reUser.exec(data);
        if (r && r.length > 1)
            return r[1];

        return null;
    }

    private onData(data: string): void {
        console.log('RECEIVED: ', data);
        const line: string[] = data.split(' ');
        const username: UserName = this.getUsername(data);
        if (line[0] === 'PING') {
            this.socket.write(`PONG ${line[1]}`);
            console.log(`PONG ${line[1]}`);
        } else if (line[1] === 'PRIVMSG') {
            const info: Message = line.shift();
            const action: Message = line.shift();
            const channel: Message = line.shift();
            const message: Message = line.splice(0).join(' ');
            this.onMessage(username, channel, message);
        } else if (line[1] === 'WHISPER') {
            const info: Message = line.shift();
            const action: Message = line.shift();
            const channel: Message = line.shift();
            const message: Message = line.splice(0).join(' ');
            this.processWhisperedAction((username as string).toLowerCase(), message);
        }
    }

    private onMessage(username: UserName, channel: Message, message: Message): void {
        console.log(this.reTransfer.test(message as string), message);

        // Handle starting a game
        if (username === 'maleero' && this.reTransfer.test(message as string)) {
            if (!this.participants)
                this.participants = [];

            const transfer: any = this.reTransfer.exec(message as string);
            const p: string = transfer[2].toLowerCase();
            this.transferred += parseInt(transfer[1]);

            // Add player to the next game
            if (this.participants.indexOf(p) === -1)
                this.participants.push(p);

            if (this.game) {
                this.sendMessage(`A battle has already started. ${this.transferred} peggles added to the next game.`);
            } else {
                clearTimeout(this.gameTimeout);
                this.gameTimeout = setTimeout(this.startGame.bind(this), 30000);
                this.sendMessage(`Thanks, ${p}! Current game is at ${this.transferred} peggles. Type '!give BattleForCorvus #' to make the next battle more difficult. The next battle will start in 30 seconds. Transferring more peggles will reset the 30 second timer.`);
            }
        } else if (this.game) {
            this.processAction((username as string).toLowerCase(), (message as string).toLowerCase());
        }
    }

    private startGame(): void {
        const players: string = this.participants.join(', ');
        this.sendMessage(`Battle for Corvus has begun! Participants are ${players}.`);
        this.game = new Game(this, this.participants, this.transferred);
        this.game.start();
        this.sendMessage(`Difficulty is set to ${this.game.difficultyLevel}!`);
        this.game.once('end', this.closeGame, this);
        this.transferred = 0;
        this.participants = [];
    }

    private closeGame(): void {
        if (!this.game)
            return;

        const playersRemaining: number = this.game.playersRemaining;
        this.sendMessage('The game has ended!');
        if (playersRemaining > 0) {
            const amount: number = Math.floor(this.game.difficulty / playersRemaining);
            for (const player of this.game.players) {
                if (!player.dead)
                    player.addGold(amount);
                }
        }
        this.game = null;
    }
}

const bot: BattleForCorvusBot = new BattleForCorvusBot(envData);
