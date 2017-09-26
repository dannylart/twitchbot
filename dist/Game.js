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
var simple_ts_event_dispatcher_1 = require("simple-ts-event-dispatcher");
var Attack_1 = require("./actions/Attack");
var Cast_1 = require("./actions/Cast");
var Craft_1 = require("./actions/Craft");
var EndTurn_1 = require("./actions/EndTurn");
var Examine_1 = require("./actions/Examine");
var Flee_1 = require("./actions/Flee");
var Go_1 = require("./actions/Go");
var Hide_1 = require("./actions/Hide");
var Inventory_1 = require("./actions/Inventory");
var Level_1 = require("./actions/Level");
var Loot_1 = require("./actions/Loot");
var Status_1 = require("./actions/Status");
var Take_1 = require("./actions/Take");
var Use_1 = require("./actions/Use");
var Player_1 = require("./Player");
var Crypt_1 = require("./rooms/Crypt");
var Entrance_1 = require("./rooms/Entrance");
var Library_1 = require("./rooms/Library");
var Smithy_1 = require("./rooms/Smithy");
var DIFFICULTIES = [1, 50, 200, 500, 1000];
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(bot, particpants, difficulty) {
        var _this = _super.call(this) || this;
        _this.bot = bot;
        _this.difficulty = difficulty;
        _this.players = [];
        _this.rooms = [];
        _this.exploredRooms = [];
        _this.paused = true;
        _this.gameOver = false;
        for (var _i = 0, particpants_1 = particpants; _i < particpants_1.length; _i++) {
            var p = particpants_1[_i];
            console.log('Adding', p);
            _this.players.push(new Player_1.Player(p));
        }
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
            return Math.floor(this.difficulty / 5 / this.players.length) + 1;
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
            if (this.playerTurn > this.players.length - 1) {
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
            return this.players[this.playerTurn];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "alivePlayers", {
        get: function () {
            var players = [];
            for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
                var p = _a[_i];
                if (!p.dead)
                    players.push(p);
            }
            return players;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "playersRemaining", {
        get: function () {
            var c = 0;
            for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
                var p = _a[_i];
                if (!p.dead)
                    c += 1;
            }
            return c;
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
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var p = _a[_i];
            if (p.name === playerName)
                return p;
        }
        return null;
    };
    Game.prototype.getActions = function () {
        var actions = [];
        var hasEnemies = this.room.hasEnemies;
        for (var _i = 0, _a = Game.actions; _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.combat === hasEnemies)
                actions.push(a.keyword.substr(1));
        }
        return actions;
    };
    Game.prototype.getWhisperActions = function () {
        var actions = [];
        for (var _i = 0, _a = Game.actions; _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.whisper)
                actions.push(a.keyword.substr(1));
        }
        return actions;
    };
    Game.prototype.generateRandomRoom = function (id, x, y) {
        var room = Game.roomTypes[Math.floor(Math.random() * Game.roomTypes.length)];
        return new room(this, id, x, y, this.difficultyLevel + Math.floor(x / 2) + Math.floor(y / 2));
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
}(simple_ts_event_dispatcher_1.EventDispatcher));
exports.Game = Game;
Game.actions = [];
Game.actions.push(Attack_1.Attack);
Game.actions.push(Cast_1.Cast);
Game.actions.push(Craft_1.Craft);
Game.actions.push(EndTurn_1.EndTurn);
Game.actions.push(Examine_1.Examine);
Game.actions.push(Flee_1.Flee);
Game.actions.push(Go_1.Go);
Game.actions.push(Hide_1.Hide);
Game.actions.push(Inventory_1.Inventory);
Game.actions.push(Level_1.Level);
Game.actions.push(Loot_1.Loot);
Game.actions.push(Status_1.Status);
Game.actions.push(Take_1.Take);
Game.actions.push(Use_1.Use);
Game.roomTypes = [];
Game.roomTypes.push(Library_1.Library);
Game.roomTypes.push(Smithy_1.Smithy);
//# sourceMappingURL=Game.js.map