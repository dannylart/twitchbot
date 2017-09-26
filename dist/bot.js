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
var Player_1 = require("./Player");
var SocketClient_1 = require("./SocketClient");
var BattleForCorvusBot = /** @class */ (function (_super) {
    __extends(BattleForCorvusBot, _super);
    function BattleForCorvusBot(env) {
        var _this = _super.call(this) || this;
        _this.reUser = new RegExp(':([^!]+).+');
        _this.reTransfer = new RegExp(/:transferred (\d+) peggles from ([^\s]+) to battleforcorvus./);
        _this.canSendMessage = true;
        _this.messageQueue = [];
        _this.transferred = 0;
        _this.brawlAmount = 0;
        _this.brawlParticipants = [];
        _this.config = env;
        _this.players = [];
        _this.bind('connected', _this.onConnect, _this);
        _this.connect(_this.config);
        return _this;
    }
    BattleForCorvusBot.prototype.getPlayer = function (playerName) {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var p = _a[_i];
            if (p.name === playerName)
                return p;
        }
        var player = new Player_1.Player(playerName);
        this.players.push(player);
        return player;
    };
    BattleForCorvusBot.prototype.sendMessage = function (message) {
        this.messageQueue.push(message);
        if (this.canSendMessage)
            this.processMessageQueue();
    };
    BattleForCorvusBot.prototype.sendWhisper = function (player, message) {
        this.sendMessage("/w " + player.name + " " + message);
    };
    BattleForCorvusBot.prototype.processAction = function (player, message) {
        if (!this.game)
            return;
        if (this.game.player === null)
            return;
        if (this.game.player.name !== player.name || this.game.paused)
            return;
        var parts = message.trim().split(' ');
        var hasEnemies = this.game.room.hasEnemies;
        console.log(parts);
        for (var _i = 0, _a = Game_1.Game.actions; _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.keyword === parts[0] && a.combat === hasEnemies) {
                var action = new a(this.game, this.game.player, parts);
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
    BattleForCorvusBot.prototype.processWhisperedAction = function (player, message) {
        var _this = this;
        var game = this.game || new Game_1.Game(this, [player.name], 0);
        if (player === null)
            return;
        if (player.loaded) {
            this._processWhisperedAction(game, player, message);
        }
        else {
            player.once('loaded', function () {
                _this._processWhisperedAction(game, player, message);
            }, this);
        }
    };
    BattleForCorvusBot.prototype._processWhisperedAction = function (game, player, message) {
        var parts = message.trim().split(' ');
        for (var _i = 0, _a = Game_1.Game.actions; _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.keyword === parts[0] && a.whisper) {
                var action = new a(game, player, parts);
                var result = action.process();
                if (result.message)
                    this.sendWhisper(player, result.message);
            }
            else if (a.keyword === parts[0] && !a.whisper) {
                this.sendWhisper(player, "Currently cannot use " + parts[0].substr(1) + ". Available whisper commands: " + game.getWhisperActions().join(', '));
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
            return r[1].toLowerCase();
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
        else {
            var player_1 = this.getPlayer(username);
            if (player_1.loaded)
                this._onData(player_1, line);
            else
                (function (bot, _player, _line) {
                    player_1.once('loaded', function () {
                        bot._onData(_player, _line);
                    }, bot);
                })(this, player_1, line);
        }
    };
    BattleForCorvusBot.prototype._onData = function (player, line) {
        if (line[1] === 'PRIVMSG') {
            var info = line.shift();
            var action = line.shift();
            var channel = line.shift();
            var message = line.splice(0).join(' ');
            this.onMessage(player, channel, message);
        }
        else if (line[1] === 'WHISPER') {
            var info = line.shift();
            var action = line.shift();
            var channel = line.shift();
            var message = line.splice(0).join(' ');
            this.processWhisperedAction(player, message);
        }
    };
    BattleForCorvusBot.prototype.onMessage = function (player, channel, message) {
        console.log(this.reTransfer.test(message), message);
        if (!message)
            return;
        // Remove /r/n
        message = message.trim().toLowerCase();
        // Handle starting a game
        if (player.name === 'maleero' && this.reTransfer.test(message)) {
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
        else if (message.substr(0, 7) === ':!brawl') {
            var parts = message.split(' ');
            var amount = parseInt(parts[1]);
            if (player.gold >= amount) {
                player.removeGold(amount);
                if (this.brawlParticipants.indexOf(player.name) === -1)
                    this.brawlParticipants.push(player.name);
                if (this.brawlAmount === 0)
                    this.sendMessage("A brawl is going to start soon! Type '!brawl gold_amount' to join!");
                this.brawlAmount += amount;
                clearTimeout(this.brawlTimeout);
                this.brawlTimeout = setTimeout(this.startBrawl.bind(this), 15000);
            }
            else {
                this.sendWhisper(player, "You do not have enough gold to !brawl " + amount + ". You have " + player.gold);
            }
        }
        else if (this.game) {
            this.processAction(player, message.toLowerCase());
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
    BattleForCorvusBot.prototype.startBrawl = function () {
        var players = this.brawlParticipants.join(', ');
        this.sendMessage("A brawl has begun! Participants are " + players + ".");
        var collectiveLevel = 0;
        for (var _i = 0, _a = this.brawlParticipants; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            collectiveLevel += this.getPlayer(name_1).level;
        }
        // Open sauce? No cheating!
        var chance = this.brawlAmount * 10 / collectiveLevel;
        if (chance > 60)
            chance = 60;
        var survivors = [];
        for (var _b = 0, _c = this.brawlParticipants; _b < _c.length; _b++) {
            var name_2 = _c[_b];
            var player = this.getPlayer(name_2);
            if (Math.random() * 100 <= chance) {
                survivors.push(player.name);
            }
        }
        if (survivors.length === 0) {
            this.sendMessage('No one survived the brawl.');
        }
        else {
            var xp = Math.floor(this.brawlAmount * 1.1 / survivors.length);
            var gold = Math.floor(this.brawlAmount * .9 / survivors.length);
            this.sendMessage(survivors.join(', ') + " barely survived the brawl. " + xp + " experience and " + gold + " gold has been awarded to the survivors.");
            for (var _d = 0, survivors_1 = survivors; _d < survivors_1.length; _d++) {
                var name_3 = survivors_1[_d];
                var player = this.getPlayer(name_3);
                player.addExperience(xp);
                player.addGold(gold);
            }
        }
        this.brawlAmount = 0;
        this.brawlParticipants = [];
    };
    BattleForCorvusBot.prototype.closeGame = function () {
        if (!this.game)
            return;
        var playersRemaining = this.game.playersRemaining;
        this.sendMessage('The game has ended!');
        if (playersRemaining > 0) {
            var amount = Math.floor(this.game.difficulty / playersRemaining);
            for (var _i = 0, _a = this.game.participants; _i < _a.length; _i++) {
                var playerName = _a[_i];
                var player = this.getPlayer(playerName);
                if (!player.dead)
                    //this.sendMessage(`!give ${player.name} ${amount}`);
                    player.addGold(amount);
            }
        }
        this.game = null;
    };
    return BattleForCorvusBot;
}(SocketClient_1.SocketClient));
exports.BattleForCorvusBot = BattleForCorvusBot;
var bot = new BattleForCorvusBot(envData);
//# sourceMappingURL=bot.js.map