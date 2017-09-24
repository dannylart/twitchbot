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
var Character_1 = require("./Character");
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(enemyId, level) {
        var _this = _super.call(this) || this;
        _this.enemyId = enemyId;
        _this.level = level;
        _this.attributes = {
            health: 10,
            mana: 0,
            strength: 2,
            dexterity: 2,
            intelligence: 2,
            luck: 2
        };
        _this.health += _this.attributes.health * level;
        _this.maxHealth += _this.attributes.health * level;
        _this.mana += _this.attributes.mana * level;
        _this.maxMana += _this.attributes.mana * level;
        _this.strength += _this.attributes.strength * level;
        _this.dexterity += _this.attributes.dexterity * level;
        _this.intelligence += _this.attributes.intelligence * level;
        _this.luck += _this.attributes.luck * level;
        return _this;
    }
    Object.defineProperty(Enemy.prototype, "id", {
        get: function () {
            return "e" + this.enemyId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Enemy.prototype, "display", {
        get: function () {
            return "L" + this.level + " " + this.name + "(" + this.id + ")";
        },
        enumerable: true,
        configurable: true
    });
    return Enemy;
}(Character_1.Character));
exports.Enemy = Enemy;
//# sourceMappingURL=Enemy.js.map