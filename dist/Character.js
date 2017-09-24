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
var BuffManager_1 = require("./BuffManager");
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character() {
        var _this = _super.call(this) || this;
        _this.health = 1000;
        _this.maxHealth = 1000;
        _this.mana = 50;
        _this.maxMana = 50;
        _this.strength = 10;
        _this.dexterity = 10;
        _this.intelligence = 10;
        _this.luck = 10;
        _this.buffs = new BuffManager_1.BuffManager(_this);
        return _this;
    }
    Object.defineProperty(Character.prototype, "dead", {
        get: function () {
            return this.health <= 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "attackPower", {
        get: function () {
            return (this.strength + this.buffs.attributes.strength) * 10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "spellPower", {
        get: function () {
            return (this.intelligence + this.buffs.attributes.intelligence) * 10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "attackDamage", {
        get: function () {
            var min = this.attackPower * .75;
            var max = this.attackPower * 1.25;
            return Math.floor(Math.random() * (max - min) + min);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "spellDamage", {
        get: function () {
            var min = this.spellPower * .75;
            var max = this.spellPower * 1.25;
            return Math.floor(Math.random() * (max - min) + min);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "criticalHit", {
        get: function () {
            return Math.floor(Math.random() * 100) <= this.luck + this.buffs.attributes.luck;
        },
        enumerable: true,
        configurable: true
    });
    Character.prototype.attack = function (e) {
        var result = [];
        result.push("" + e.hit(this));
        return result.join(' ');
    };
    Character.prototype.hit = function (attacker, action, multi, melee) {
        if (action === void 0) { action = 'attacked'; }
        if (multi === void 0) { multi = 1; }
        if (melee === void 0) { melee = true; }
        var damage = melee ? attacker.attackDamage : attacker.spellDamage;
        damage = Math.floor(damage * multi);
        var critical = attacker.criticalHit;
        var hit = critical ? 'critically hit' : 'hit';
        if (critical)
            damage = Math.floor(damage * 2);
        this.health -= damage;
        var result = attacker.name + " " + action + " " + this.name + " and was " + hit + " for " + damage + " and has";
        if (!this.dead) {
            return result + " " + this.health + " health remaining.";
        }
        else {
            this.die();
            return result + " died.";
        }
    };
    Character.prototype.die = function () {
        this.trigger('death');
    };
    return Character;
}(simple_ts_event_dispatcher_1.EventDispatcher));
exports.Character = Character;
//# sourceMappingURL=Character.js.map