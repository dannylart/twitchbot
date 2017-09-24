"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Class = /** @class */ (function () {
    function Class(level) {
        this.level = level;
    }
    Class.isAvailable = function (p, c) {
        for (var cls in c.requirements) {
            if (!p.classes[cls] || p.classes[cls] < c.requirements[cls])
                return false;
        }
        return true;
    };
    Class.prototype.getBaseClassAttributes = function () {
        return {
            health: this.attributes.health,
            mana: this.attributes.mana,
            strength: this.attributes.strength,
            dexterity: this.attributes.dexterity,
            intelligence: this.attributes.intelligence,
            luck: this.attributes.luck
        };
    };
    Class.prototype.getClassAttributes = function () {
        return {
            health: this.attributes.health * this.level,
            mana: this.attributes.mana * this.level,
            strength: this.attributes.strength * this.level,
            dexterity: this.attributes.dexterity * this.level,
            intelligence: this.attributes.intelligence * this.level,
            luck: this.attributes.luck * this.level
        };
    };
    Class.prototype.getClassSpells = function () {
        var spells = [];
        if (this.level >= 1)
            spells.push(this.spells[0]);
        if (this.level >= 2)
            spells.push(this.spells[1]);
        if (this.level >= 3)
            spells.push(this.spells[2]);
        if (this.level >= 4)
            spells.push(this.spells[3]);
        if (this.level >= 5)
            spells.push(this.spells[4]);
        return spells;
    };
    Class.prototype.getClassRecipes = function () {
        var recipes = [];
        if (this.level >= 1)
            recipes.push(this.recipes[0]);
        if (this.level >= 2)
            recipes.push(this.recipes[1]);
        if (this.level >= 3)
            recipes.push(this.recipes[2]);
        if (this.level >= 4)
            recipes.push(this.recipes[3]);
        if (this.level >= 5)
            recipes.push(this.recipes[4]);
        return recipes;
    };
    Class.requirements = {};
    return Class;
}());
exports.Class = Class;
//# sourceMappingURL=Class.js.map