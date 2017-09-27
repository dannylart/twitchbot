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
var Action_1 = require("../Action");
var EActionType_1 = require("../EActionType");
var Focus_1 = require("./spells/Focus");
var Rush_1 = require("./spells/Rush");
var SPELLS = [];
SPELLS.push(Focus_1.Focus);
SPELLS.push(Rush_1.Rush);
var Cast = /** @class */ (function (_super) {
    __extends(Cast, _super);
    function Cast() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cast.prototype.process = function () {
        if (!this.parts[1]) {
            return {
                message: "You can cast the following spells: " + this.player.getSpells().join(', '),
                success: false
            };
        }
        if (!this.player.hasSpell(this.parts[1])) {
            return {
                message: "You cannot cast " + this.parts[1] + ".",
                success: false
            };
        }
        for (var _i = 0, SPELLS_1 = SPELLS; _i < SPELLS_1.length; _i++) {
            var spell = SPELLS_1[_i];
            if (spell.keyword === this.parts[1]) {
                var s = new spell(this.game, this.player, this.parts);
                return s.process();
            }
        }
        return {
            message: "The spell fizzles.",
            success: false
        };
    };
    Cast.keyword = ':!cast';
    Cast.types = [EActionType_1.EActionType.COMBAT];
    return Cast;
}(Action_1.Action));
exports.Cast = Cast;
//# sourceMappingURL=Cast.js.map