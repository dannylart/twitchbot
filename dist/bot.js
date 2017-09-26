"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var envData = require("../env.json");
var Game_1 = require("./Game");
var SocketClient_1 = require("./SocketClient");
var BattleForCorvusBot = /** @class */ (function (_super) {
    __extends(BattleForCorvusBot, _super);
    function BattleForCorvusBot(env) {
        var _this = _super.call(this) || this;
        _this.reUser = new RegExp(':([^!]+).+');
        _this.reTransfer = new RegExp(/:Transferred (\d+) Peggles from ([^\s]+) to battleforcorvus./);
        _this.canSendMessage = true;
        _this.messageQueue = [];
        _this.transferred = 0;
        _this.config = env;
        _this.bind('connected', _this.onConnect, _this);
        _this.connect(_this.config);
        return _this;
    }
    BattleForCorvusBot.prototype.sendMessage = function (message) {
        this.messageQueue.push(message);
        if (this.canSendMessage)
            this.processMessageQueue();
    };
    BattleForCorvusBot.prototype.processAction = function (player, message) {
        if (!this.game)
            return;
        if (this.game.player === null)
            return;
        if (this.game.player.name !== player || this.game.paused)
            return;
        var parts = message.trim().split(' ');
        var hasEnemies = this.game.room.hasEnemies;
        console.log(parts);
        for (var _i = 0, _a = Game_1.Game.actions; _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.keyword === parts[0] && a.combat === hasEnemies) {
                var action = new a(this, this.game.player, parts);
                var result = action.process();
                if (result.message)
                    this.sendMessage(result.message);
                // Can only use one action when there are enemies
                if (hasEnemies && result.success)
                    this.game.endTurn();
            }
            else if (a.keyword === parts[0] && a.combat !== hasEnemies) {
                this.sendMessage("Currently cannot use " + parts[0].substr(1) + ". Available commands: " + this.game.getActions().join(', '));
            }
        }
    };
    BattleForCorvusBot.prototype.processWhisperedAction = function (playerName, message) {
        var game = this.game || new Game_1.Game(this, [playerName], 0);
        var player = game.getPlayer(playerName);
        if (player === null)
            return;
        var parts = message.trim().split(' ');
        console.log(parts);
        for (var _i = 0, _a = Game_1.Game.actions; _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.keyword === parts[0] && a.whisper) {
                var action = new a(game, player, parts);
                var result = action.process();
                if (result.message)
                    this.sendMessage("/w " + playerName + " " + result.message);
            }
            else if (a.keyword === parts[0] && !a.whisper) {
                this.sendMessage("/w " + playerName + " Currently cannot use " + parts[0].substr(1) + ". Available whisper commands: " + game.getWhisperActions().join(', '));
            }
        }
    };
    BattleForCorvusBot.prototype.processMessageQueue = function () {
        clearTimeout(this.messageTimeout);
        this.messageTimeout = setTimeout(this.processMessageQueue.bind(this), 500);
        if (this.messageQueue.length > 0) {
            this.canSendMessage = false;
            var message = this.messageQueue.shift();
            console.log('SENDING!', "PRIVMSG #" + this.config.channel + " :" + message + "\r\n");
            this.socket.write("PRIVMSG #" + this.config.channel + " :" + message + "\r\n");
        }
        else {
            this.canSendMessage = true;
        }
    };
    BattleForCorvusBot.prototype.onConnect = function () {
        console.log('onConnect');
        this.socket.write("PASS " + this.config.oauth + "\r\n");
        this.socket.write("NICK " + this.config.username + "\r\n");
        this.socket.write("JOIN #" + this.config.channel + "\r\n");
        this.socket.write("CAP REQ :twitch.tv/commands\r\n");
        this.socket.addListener('data', this.onData.bind(this));
    };
    BattleForCorvusBot.prototype.getUsername = function (data) {
        var r = this.reUser.exec(data);
        if (r && r.length > 1)
            return r[1];
        return null;
    };
    BattleForCorvusBot.prototype.onData = function (data) {
        console.log('RECEIVED: ', data);
        var line = data.split(' ');
        var username = this.getUsername(data);
        if (line[0] === 'PING') {
            this.socket.write("PONG " + line[1]);
            console.log("PONG " + line[1]);
        }
        else if (line[1] === 'PRIVMSG') {
            var info = line.shift();
            var action = line.shift();
            var channel = line.shift();
            var message = line.splice(0).join(' ');
            this.onMessage(username, channel, message);
        }
        else if (line[1] === 'WHISPER') {
            var info = line.shift();
            var action = line.shift();
            var channel = line.shift();
            var message = line.splice(0).join(' ');
            this.processWhisperedAction(username.toLowerCase(), message);
        }
    };
    BattleForCorvusBot.prototype.onMessage = function (username, channel, message) {
        console.log(this.reTransfer.test(message), message);
        // Handle starting a game
        if (username === 'maleero' && this.reTransfer.test(message)) {
            if (!this.participants)
                this.participants = [];
            var transfer = this.reTransfer.exec(message);
            var p = transfer[2].toLowerCase();
            this.transferred += parseInt(transfer[1]);
            // Add player to the next game
            if (this.participants.indexOf(p) === -1)
                this.participants.push(p);
            if (this.game) {
                this.sendMessage("A battle has already started. " + this.transferred + " peggles added to the next game.");
            }
            else {
                clearTimeout(this.gameTimeout);
                this.gameTimeout = setTimeout(this.startGame.bind(this), 30000);
                this.sendMessage("Thanks, " + p + "! Current game is at " + this.transferred + " peggles. Type '!give BattleForCorvus #' to make the next battle more difficult. The next battle will start in 30 seconds. Transferring more peggles will reset the 30 second timer.");
            }
        }
        else if (this.game) {
            this.processAction(username.toLowerCase(), message.toLowerCase());
        }
    };
    BattleForCorvusBot.prototype.startGame = function () {
        var players = this.participants.join(', ');
        this.sendMessage("Battle for Corvus has begun! Participants are " + players + ".");
        this.game = new Game_1.Game(this, this.participants, this.transferred);
        this.game.start();
        this.sendMessage("Difficulty is set to " + this.game.difficultyLevel + "!");
        this.game.once('end', this.closeGame, this);
        this.transferred = 0;
        this.participants = [];
    };
    BattleForCorvusBot.prototype.closeGame = function () {
        if (!this.game)
            return;
        var playersRemaining = this.game.playersRemaining;
        this.sendMessage('The game has ended!');
        if (playersRemaining > 0) {
            var amount = Math.floor(this.game.difficulty / playersRemaining);
            for (var _i = 0, _a = this.game.players; _i < _a.length; _i++) {
                var player = _a[_i];
                if (!player.dead)
                    this.sendMessage("!give " + player.name + " " + amount);
            }
        }
        this.game = null;
    };
    return BattleForCorvusBot;
}(SocketClient_1.SocketClient));
exports.BattleForCorvusBot = BattleForCorvusBot;
var bot = new BattleForCorvusBot(envData);
//# sourceMappingURL=bot.js.map