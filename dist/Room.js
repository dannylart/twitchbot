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
var Room = /** @class */ (function (_super) {
    __extends(Room, _super);
    function Room(game, roomId, x, y, difficulty) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.roomId = roomId;
        _this.x = x;
        _this.y = y;
        _this.difficulty = difficulty;
        _this.enemies = [];
        _this.objects = [];
        _this.doors = [];
        _this.enemyCounter = 1;
        console.log("Room with id " + _this.id + " created.");
        _this.generate();
        return _this;
    }
    Object.defineProperty(Room.prototype, "enemyTargetIds", {
        get: function () {
            var names = [];
            for (var _i = 0, _a = this.enemies; _i < _a.length; _i++) {
                var enemy = _a[_i];
                if (!enemy.dead)
                    names.push(enemy.display);
            }
            return names.join(', ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "name", {
        get: function () {
            return 'A dank room';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "id", {
        get: function () {
            return "r" + this.roomId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "display", {
        get: function () {
            return this.name + "(" + this.id + ")";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "hasEnemies", {
        get: function () {
            for (var _i = 0, _a = this.enemies; _i < _a.length; _i++) {
                var enemy = _a[_i];
                if (!enemy.dead)
                    return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Room.prototype.getEnemy = function (id) {
        for (var _i = 0, _a = this.enemies; _i < _a.length; _i++) {
            var e = _a[_i];
            if (!e.dead && e.id === id)
                return e;
        }
        return null;
    };
    Room.prototype.endGame = function () {
        this.trigger('end');
    };
    Room.prototype.processEnemyTurn = function () {
        var results = [];
        for (var _i = 0, _a = this.enemies; _i < _a.length; _i++) {
            var e = _a[_i];
            if (!e.dead) {
                var p = this.game.randomAlivePlayer();
                if (p !== null)
                    results.push(e.attack(p));
            }
        }
        return results.join(' ');
    };
    Room.prototype.addEnemy = function (t) {
        var enemy = new t(this.enemyCounter, this.difficulty);
        enemy.initialize();
        this.enemies.push(enemy);
        this.enemyCounter += 1;
        return enemy;
    };
    return Room;
}(simple_ts_event_dispatcher_1.EventDispatcher));
exports.Room = Room;
//# sourceMappingURL=Room.js.map