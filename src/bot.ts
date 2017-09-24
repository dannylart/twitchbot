import * as envData from '../env.json';
import {Game} from './Game';
import {IEnvironment} from './IEnvironment';
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
        } else if (this.game && line[1] === 'WHISPER') {
            const info: Message = line.shift();
            const action: Message = line.shift();
            const channel: Message = line.shift();
            const message: Message = line.splice(0).join(' ');
            this.game.processWhisperedAction((username as string).toLowerCase(), message);
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
            this.game.processAction((username as string).toLowerCase(), (message as string).toLowerCase());
        }
    }

    private startGame(): void {
        const players: string = this.participants.join(', ');
        this.sendMessage(`Battle for Corvus has begun! Participants are ${players}.`);
        this.game = new Game(this, this.participants, this.transferred);
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
            const amount = Math.floor(this.game.difficulty / playersRemaining);
            for (const player of this.game.players) {
                if (!player.dead)
                    this.sendMessage(`!give ${player.name} ${amount}`);
                }
        }
        this.game = null;
    }
}

const bot: BattleForCorvusBot = new BattleForCorvusBot(envData);
