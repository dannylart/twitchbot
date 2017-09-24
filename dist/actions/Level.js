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
var Level = /** @class */ (function (_super) {
    __extends(Level, _super);
    function Level() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Level.prototype.process = function () {
        var requirement = Math.floor((Math.log10(this.player.level + 1) + 1) * 500 * this.player.level + 100);
        if (this.player.experience < requirement)
            return {
                message: "Not enough experience to level. You have " + this.player.experience + " experience of the " + requirement + " needed.",
                success: false
            };
        var availble = this.game.getAvailableClasses(this.player);
        if (this.parts.length > 1) {
            if (availble.indexOf(this.parts[1]) > -1) {
                var cls = this.game.getClass(this.parts[1], 1);
                this.player.experience -= requirement;
                var lvl = this.player.levelUp(this.parts[1], cls.getBaseClassAttributes());
                return {
                    message: this.player.name + " levels " + this.parts[1] + " to " + lvl + " and is now character level " + this.player.level + ".",
                    success: true
                };
            }
            return {
                message: "Cannot level " + this.parts[1] + ".",
                success: false
            };
        }
        else {
            return {
                message: "The following can be leveled: " + availble.join(', '),
                success: false
            };
        }
    };
    Level.keyword = ':!level';
    Level.whisper = true;
    return Level;
}(Action_1.Action));
exports.Level = Level;
//# sourceMappingURL=Level.js.map