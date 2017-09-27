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
var Attack = /** @class */ (function (_super) {
    __extends(Attack, _super);
    function Attack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Attack.prototype.process = function () {
        if (this.parts.length > 1) {
            var e = this.game.room.getEnemy(this.parts[1]);
            if (e) {
                var r = this.player.attack(e);
                if (e.dead)
                    r += this.addPartyExperienceAndGold(e.getExperienceForKill());
                return {
                    message: r,
                    success: true
                };
            }
            else {
                return {
                    message: 'Invalid target to attack',
                    success: false
                };
            }
        }
        else {
            var target = this.game.room.enemyTargetIds;
            if (target === '') {
                return {
                    message: 'No targets available',
                    success: false
                };
            }
            else {
                return {
                    message: "Possible targets to attack are: " + this.game.room.enemyTargetIds,
                    success: false
                };
            }
        }
    };
    Attack.keyword = ':!attack';
    Attack.types = [EActionType_1.EActionType.COMBAT];
    return Attack;
}(Action_1.Action));
exports.Attack = Attack;
//# sourceMappingURL=Attack.js.map