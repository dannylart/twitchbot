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
var jsonfile = require("jsonfile");
var Character_1 = require("./Character");
var ClassManager_1 = require("./ClassManager");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(name) {
        var _this = _super.call(this) || this;
        _this.experienceForKill = 0;
        _this.name = name;
        _this.inventory = {};
        _this.classes = {};
        _this.loaded = false;
        _this.open();
        return _this;
    }
    Player.prototype.addExperience = function (xp) {
        this.experience += xp;
        this.save();
    };
    Object.defineProperty(Player.prototype, "level", {
        get: function () {
            var level = 0;
            for (var c in this.classes) {
                level += this.classes[c];
            }
            return level;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.levelUp = function (cls, attrs) {
        if (!this.classes[cls])
            this.classes[cls] = 0;
        this.classes[cls] += 1;
        this.maxHealth += attrs.health;
        this.maxMana += attrs.mana;
        this.strength += attrs.strength;
        this.dexterity += attrs.dexterity;
        this.intelligence += attrs.intelligence;
        this.luck += attrs.luck;
        this.save();
        // Heal up the character
        this.health = this.maxHealth;
        this.mana = this.maxMana;
        return this.classes[cls];
    };
    Player.prototype.getSpells = function () {
        var spells = [];
        for (var cls in this.classes) {
            var c = ClassManager_1.ClassManager.getClass(cls, this.classes[cls]);
            if (c)
                spells.push.apply(spells, c.getClassSpells());
        }
        return spells;
    };
    Player.prototype.hasSpell = function (spellName) {
        return this.getSpells().indexOf(spellName) > -1;
    };
    Player.prototype.getAvailableClasses = function () {
        var classes = [];
        for (var _i = 0, _a = ClassManager_1.ClassManager.classes; _i < _a.length; _i++) {
            var cls = _a[_i];
            if (cls.isAvailable(this, cls))
                classes.push(cls.keyword);
        }
        return classes;
    };
    Player.prototype.fileName = function () {
        return "./players/" + this.name + ".json";
    };
    Player.prototype.open = function () {
        var _this = this;
        jsonfile.readFile(this.fileName(), function (err, obj) {
            if (!err) {
                _this.experience = obj.experience || 0;
                _this.health = _this.maxHealth = obj.health || 100;
                _this.mana = _this.maxMana = obj.mana || 50;
                _this.strength = obj.strength || 10;
                _this.dexterity = obj.dexterity || 10;
                _this.intelligence = obj.intelligence || 10;
                _this.luck = obj.luck || 10;
                _this.inventory = obj.inventory || {};
                _this.classes = obj.classes || {};
            }
            else {
                _this.experience = 0;
                _this.inventory = {};
                _this.classes = {};
            }
            _this.loaded = true;
            _this.trigger('loaded');
        });
    };
    Player.prototype.save = function () {
        jsonfile.writeFile(this.fileName(), {
            experience: this.experience,
            health: this.maxHealth,
            mana: this.maxMana,
            strength: this.strength,
            dexterity: this.dexterity,
            intelligence: this.intelligence,
            luck: this.luck,
            classes: this.classes,
            inventory: this.inventory
        });
    };
    return Player;
}(Character_1.Character));
exports.Player = Player;
//# sourceMappingURL=Player.js.map