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
        return _this;
    }
    Enemy.prototype.initialize = function () {
        console.log(this.display, this.attributes);
        this.health = this.attributes.health;
        this.maxHealth = this.attributes.health;
        this.mana = this.attributes.mana;
        this.maxMana = this.attributes.mana;
        this.strength = this.attributes.strength;
        this.dexterity = this.attributes.dexterity;
        this.intelligence = this.attributes.intelligence;
        this.luck = this.attributes.luck;
        this.health += Math.floor(this.attributesPerLevel.health * this.level);
        this.maxHealth += Math.floor(this.attributesPerLevel.health * this.level);
        this.mana += Math.floor(this.attributesPerLevel.mana * this.level);
        this.maxMana += Math.floor(this.attributesPerLevel.mana * this.level);
        this.strength += Math.floor(this.attributesPerLevel.strength * this.level);
        this.dexterity += Math.floor(this.attributesPerLevel.dexterity * this.level);
        this.intelligence += Math.floor(this.attributesPerLevel.intelligence * this.level);
        this.luck += Math.floor(this.attributesPerLevel.luck * this.level);
    };
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