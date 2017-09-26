import * as envData from '../env.json';
import {IAction, IActionResult} from './Action';
import {Game} from './Game';
import {IEnvironment} from './IEnvironment';
import {Player} from './Player';
import {SocketClient} from './SocketClient';

type UserName = string | null;
type Message = string | undefined;

export class BattleForCorvusBot extends SocketClient {
    private players: Player[];
    private config: IEnvironment;
    private reUser: RegExp;
    private reTransfer: RegExp;
    private transferred: number;
    private brawlAmount: number;
    private brawlParticipants: string[];
    private brawlTimeout: any;
    private game: Game | null;
    private gameTimeout: any;
    private participants: string[];
    private canSendMessage: boolean;
    private messageQueue: string[];
    private messageTimeout: any;

    constructor(env: any) {
        super();
        this.reUser = new RegExp(':([^!]+).+');
        this.reTransfer = new RegExp(/:transferred (\d+) peggles from ([^\s]+) to battleforcorvus./);
        this.canSendMessage = true;
        this.messageQueue = [];
        this.transferred = 0;
        this.brawlAmount = 0;
        this.brawlParticipants = [];
        this.config = env as IEnvironment;
        this.players = [];
        this.bind('connected', this.onConnect, this);
        this.connect(this.config);
    }

    public getPlayer(playerName: string): Player {
        for (const p of this.players) {
            if (p.name === playerName)
                return p;
        }

        const player: Player = new Player(playerName);
        this.players.push(player);

        return player;
    }

    public sendMessage(message: string): void {
        this.messageQueue.push(message as string);
        if (this.canSendMessage)
            this.processMessageQueue();
    }

    public sendWhisper(player: Player, message: string): void {
        this.sendMessage(`/w ${player.name} ${message}`);
    }

    public processAction(player: Player, message: string): void {
        if (!this.game) return;
        if (this.game.player === null) return;
        if (this.game.player.name !== player.name || this.game.paused)
            return;

        const parts: string[] = message.trim().split(' ');
        const hasEnemies: boolean = this.game.room.hasEnemies;
        console.log(parts);
        for (const a of Game.actions) {
            if (a.keyword === parts[0] && a.combat === hasEnemies) {
                const action: IAction = new (a as any)(this.game, this.game.player, parts);
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

    public processWhisperedAction(player: Player, message: string): void {
        const game: Game = this.game || new Game(this, [player.name], 0);
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
                    this.sendWhisper(player, result.message);
            } else if (a.keyword === parts[0] && !a.whisper) {
                this.sendWhisper(player, `Currently cannot use ${parts[0].substr(1)}. Available whisper commands: ${game.getWhisperActions().join(', ')}`);
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
            return r[1].toLowerCase();

        return null;
    }

    private onData(data: string): void {
        console.log('RECEIVED: ', data);
        const line: string[] = data.split(' ');
        const username: UserName = this.getUsername(data);
        if (line[0] === 'PING') {
            this.socket.write(`PONG ${line[1]}`);
            console.log(`PONG ${line[1]}`);
        } else {
            const player: Player = this.getPlayer(username as string);
            if (player.loaded)
                this._onData(player, line);
            else
                (function(bot: BattleForCorvusBot, _player: Player, _line: string[]) {
                    player.once('loaded', () => {
                        bot._onData(_player, _line);
                    }, bot);
                })(this, player, line);
        }
    }

    private _onData(player: Player, line: string[]) {
        if (line[1] === 'PRIVMSG') {
            const info: Message = line.shift();
            const action: Message = line.shift();
            const channel: Message = line.shift();
            const message: Message = line.splice(0).join(' ');
            this.onMessage(player, channel, message);
        } else if (line[1] === 'WHISPER') {
            const info: Message = line.shift();
            const action: Message = line.shift();
            const channel: Message = line.shift();
            const message: Message = line.splice(0).join(' ');
            this.processWhisperedAction(player, message);
        }
    }

    private onMessage(player: Player, channel: Message, message: Message): void {
        console.log(this.reTransfer.test(message as string), message);
        if (!message)
            return;
        // Remove /r/n
        message = (message as string).trim().toLowerCase();

        // Handle starting a game
        if (player.name === 'maleero' && this.reTransfer.test(message)) {
            if (!this.participants)
                this.participants = [];

            const transfer: any = this.reTransfer.exec(message);
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
        } else if (message.substr(0, 7) === ':!brawl') {
            const parts: string[] = message.split(' ');
            const amount: number = parseInt(parts[1]);
            if (player.gold >= amount) {
                player.removeGold(amount);
                if (this.brawlParticipants.indexOf(player.name) === -1)
                    this.brawlParticipants.push(player.name);
                if (this.brawlAmount === 0)
                    this.sendMessage(`A brawl is going to start soon! Type '!brawl gold_amount' to join!`);
                this.brawlAmount += amount;
                clearTimeout(this.brawlTimeout);
                this.brawlTimeout = setTimeout(this.startBrawl.bind(this), 15000);
            } else {
                this.sendWhisper(player, `You do not have enough gold to !brawl ${amount}. You have ${player.gold}`);
            }
        } else if (this.game) {
            this.processAction(player, message.toLowerCase());
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

    private startBrawl(): void {
        const players: string = this.brawlParticipants.join(', ');
        this.sendMessage(`A brawl has begun! Participants are ${players}.`);
        let collectiveLevel: number = 0;
        for (const name of this.brawlParticipants) {
            collectiveLevel += this.getPlayer(name).level;
        }

        // Open sauce? No cheating!
        let chance: number =  this.brawlAmount * 40 / collectiveLevel;
        if (chance > 60)
            chance = 60;
        const survivors: string[] = [];
        for (const name of this.brawlParticipants) {
            const player: Player = this.getPlayer(name);
            if (Math.random() * 100 <= chance) {
                survivors.push(player.name);
            }
        }

        if (survivors.length === 0) {
            this.sendMessage('No one survived the brawl.');
        } else {
            const xp: number = Math.floor(this.brawlAmount * 1.1 / survivors.length);
            const gold: number = Math.floor(this.brawlAmount * .9 / survivors.length);
            this.sendMessage(`${survivors.join(', ')} barely survived the brawl. ${xp} experience and ${gold} gold has been awarded to the survivors.`);
            for (const name of survivors) {
                const player: Player = this.getPlayer(name);
                player.addExperience(xp);
                player.addGold(gold);
            }
        }

        this.brawlAmount = 0;
        this.brawlParticipants = [];
    }

    private closeGame(): void {
        if (!this.game)
            return;

        const playersRemaining: number = this.game.playersRemaining;
        this.sendMessage('The game has ended!');
        if (playersRemaining > 0) {
            const amount: number = Math.floor(this.game.difficulty / playersRemaining);
            for (const playerName of this.game.participants) {
                const player: Player = this.getPlayer(playerName);
                if (!player.dead)
                    //this.sendMessage(`!give ${player.name} ${amount}`);
                    player.addGold(amount);
                }
        }
        this.game = null;
    }
}

const bot: BattleForCorvusBot = new BattleForCorvusBot(envData);
