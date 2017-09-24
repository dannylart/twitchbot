"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BuffManager = /** @class */ (function () {
    function BuffManager(character) {
        this.buffs = [];
    }
    BuffManager.prototype.add = function (b) {
        for (var _i = 0, _a = this.buffs; _i < _a.length; _i++) {
            var buff = _a[_i];
            if (b.id === buff.id && !buff.expired)
                buff.expired = true;
        }
        this.buffs.push(b);
    };
    Object.defineProperty(BuffManager.prototype, "attributes", {
        get: function () {
            var attrs = {
                health: 0,
                mana: 0,
                strength: 0,
                dexterity: 0,
                intelligence: 0,
                luck: 0
            };
            for (var _i = 0, _a = this.buffs; _i < _a.length; _i++) {
                var buff = _a[_i];
                if (buff.expired)
                    continue;
                attrs.health += buff.attributes.health;
                attrs.mana += buff.attributes.mana;
                attrs.strength += buff.attributes.strength;
                attrs.dexterity += buff.attributes.dexterity;
                attrs.intelligence += buff.attributes.intelligence;
                attrs.luck += buff.attributes.luck;
            }
            return attrs;
        },
        enumerable: true,
        configurable: true
    });
    return BuffManager;
}());
exports.BuffManager = BuffManager;
//# sourceMappingURL=BuffManager.js.map