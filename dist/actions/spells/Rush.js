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
var Rush = /** @class */ (function (_super) {
    __extends(Rush, _super);
    function Rush() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rush.prototype.process = function () {
        if (this.player.mana < 10)
            return {
                message: "OOM!",
                success: false
            };
        this.player.mana -= 10;
        var enemy = this.game.room.getEnemy(this.parts[2]);
        if (!enemy)
            return {
                message: "Invalid target.",
                success: false
            };
        return {
            message: enemy.hit(this.player, 'used rush on', 1.25),
            success: true
        };
    };
    Rush.keyword = 'rush';
    Rush.combat = true;
    return Rush;
}(Action_1.Action));
exports.Rush = Rush;
//# sourceMappingURL=Rush.js.map