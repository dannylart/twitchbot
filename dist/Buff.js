"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Buff = /** @class */ (function () {
    function Buff(id) {
        this.id = id;
        this.attributes = {
            health: 0,
            mana: 0,
            strength: 0,
            dexterity: 0,
            intelligence: 0,
            luck: 0
        };
        this.expired = false;
    }
    Buff.prototype.expire = function (s) {
        var _this = this;
        setTimeout(function () {
            _this.expired = true;
        }, s * 1000);
    };
    return Buff;
}());
exports.Buff = Buff;
//# sourceMappingURL=Buff.js.map