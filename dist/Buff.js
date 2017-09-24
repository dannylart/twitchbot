"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Buff = /** @class */ (function () {
    function Buff(id) {
        this.id = id;
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