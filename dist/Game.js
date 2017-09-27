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
var Activity_1 = require("./Activity");
var Crypt_1 = require("./rooms/Crypt");
var Entrance_1 = require("./rooms/Entrance");
var Library_1 = require("./rooms/Library");
var Smithy_1 = require("./rooms/Smithy");
var ActionManager_1 = require("./ActionManager");
var EActionType_1 = require("./EActionType");
var DIFFICULTIES = [1, 50, 200, 500, 1000];
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(bot, particpants, difficulty) {
        var _this = _super.call(this) || this;
        _this.bot = bot;
        _this.difficulty = difficulty;
        _this.participants = particpants;
        _this.rooms = [];
        _this.exploredRooms = [];
        _this.paused = true;
        _this.gameOver = false;
        _this.playerTurn = null;
        return _this;
    }
    Game.prototype.start = function () {
        // Generate rooms
        this.roomWidth = 1;
        for (var _i = 0, DIFFICULTIES_1 = DIFFICULTIES; _i < DIFFICULTIES_1.length; _i++) {
            var d = DIFFICULTIES_1[_i];
            if (this.difficulty >= d) {
                this.roomWidth += 1;
            }
            else {
                break;
            }
        }
        console.log('roomWidth', this.roomWidth);
        var roomId = 1;
        for (var x = 1; x <= this.roomWidth; x++) {
            for (var y = 1; y <= this.roomWidth; y++) {
                if (roomId === 1) {
                    this.rooms.push(new Entrance_1.Entrance(this, roomId, x, y, this.difficultyLevel + Math.floor(x / 2) + Math.floor(y / 2)));
                }
                else if (x === this.roomWidth && y === this.roomWidth) {
                    var bossRoom = new Crypt_1.Crypt(this, roomId, x, y, this.difficultyLevel + Math.floor(x / 2) + Math.floor(y / 2));
                    this.rooms.push(bossRoom);
                    bossRoom.once('end', this.endGame, this);
                }
                else {
                    this.rooms.push(this.generateRandomRoom(roomId, x, y));
                }
                roomId += 1;
            }
        }
        this.room = this.rooms[0];
        this.endTurn();
        this.loopInterval = setInterval(this.loop.bind(this), 1000);
    };
    Object.defineProperty(Game.prototype, "difficultyLevel", {
        get: function () {
            return Math.floor(this.difficulty / 5 / this.participants.length) + 1;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.endTurn = function () {
        clearTimeout(this.turnTimeout);
        if (this.playersRemaining === 0) {
            this.bot.sendMessage("There are 0 players remaining.");
            this.endGame();
        }
        else if (!this.gameOver) {
            this.turnTimeout = setTimeout(this.endTurn.bind(this), 60000);
            this.paused = false;
            if (this.playerTurn === null) {
                this.playerTurn = 0;
            }
            else {
                this.playerTurn += 1;
            }
            if (this.playerTurn > this.participants.length - 1) {
                this.playerTurn = 0;
                if (this.room.hasEnemies) {
                    this.bot.sendMessage(this.room.processEnemyTurn());
                }
            }
            if (this.player === null || this.playersRemaining === 0)
                return;
            this.bot.sendMessage("It is now " + this.player.name + "'s turn for 1 minute. The current party location is " + this.room.display);
        }
    };
    Game.prototype.endGame = function () {
        var _this = this;
        clearTimeout(this.turnTimeout);
        this.gameOver = true;
        setTimeout(function () {
            _this.paused = true;
            _this.trigger('end');
        }, 2000);
    };
    Game.prototype.changeRoom = function (room) {
        if (this.exploredRooms.indexOf(this.room) === -1)
            this.exploredRooms.push(this.room);
        this.room = room;
    };
    Game.prototype.getRoomFromCoords = function (x, y) {
        for (var _i = 0, _a = this.rooms; _i < _a.length; _i++) {
            var room = _a[_i];
            if (room.x === x && room.y === y)
                return room;
        }
        return null;
    };
    Object.defineProperty(Game.prototype, "player", {
        get: function () {
            if (this.playerTurn === null)
                return null;
            return this.getPlayer(this.participants[this.playerTurn]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "alivePlayers", {
        get: function () {
            var players = [];
            for (var _i = 0, _a = this.participants; _i < _a.length; _i++) {
                var p = _a[_i];
                var player = this.bot.getPlayer(p);
                if (!player.dead)
                    players.push(player);
            }
            return players;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "playersRemaining", {
        get: function () {
            return this.alivePlayers.length;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.randomAlivePlayer = function () {
        var players = this.alivePlayers;
        if (players.length === 0)
            return null;
        return players[Math.floor(Math.random() * players.length)];
    };
    Game.prototype.getPlayer = function (playerName) {
        if (this.participants.indexOf(playerName) === -1)
            return null;
        return this.bot.getPlayer(playerName);
    };
    Game.prototype.generateRandomRoom = function (id, x, y) {
        var room = Game.roomTypes[Math.floor(Math.random() * Game.roomTypes.length)];
        return new room(this, id, x, y, this.difficultyLevel + Math.floor(x / 2) + Math.floor(y / 2));
    };
    Game.prototype.getActions = function () {
        if (this.room && this.room.hasEnemies) {
            return ActionManager_1.ActionManager.getActions(EActionType_1.EActionType.COMBAT);
        }
        else {
            return ActionManager_1.ActionManager.getActions(EActionType_1.EActionType.EXPLORATION);
        }
    };
    Game.prototype.loop = function () {
        if (this.gameOver)
            return;
        if (this.playersRemaining === 0)
            this.endGame();
        var p = this.player;
        if (p === null || p.dead)
            this.endTurn();
    };
    return Game;
}(Activity_1.Activity));
exports.Game = Game;
Game.roomTypes = [];
Game.roomTypes.push(Library_1.Library);
Game.roomTypes.push(Smithy_1.Smithy);
//# sourceMappingURL=Game.js.map