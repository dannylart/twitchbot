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
var Action_1 = require("../../Action");
var Buff_1 = require("../../Buff");
var Focus = /** @class */ (function (_super) {
    __extends(Focus, _super);
    function Focus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Focus.prototype.process = function () {
        var b = new Buff_1.Buff('Focus');
        b.attributes.strength = 50;
        b.expire(60 * 5);
        this.player.buffs.add(b);
        return {
            message: this.player.name + " cast Focus increasing their strength for a short duration.",
            success: true
        };
    };
    Focus.keyword = 'focus';
    Focus.combat = true;
    return Focus;
}(Action_1.Action));
exports.Focus = Focus;
//# sourceMappingURL=Focus.js.map