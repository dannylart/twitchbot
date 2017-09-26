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
var Status = /** @class */ (function (_super) {
    __extends(Status, _super);
    function Status() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Status.prototype.process = function () {
        var attributes = "L" + this.player.level + " " + this.player.name + ": HP: " + this.player.health + "/" + this.player.maxHealth + ", str: " + this.player.strength + ", dex: " + this.player.dexterity + ", int: " + this.player.intelligence + ", luck: " + this.player.luck + ",";
        var classes = [];
        for (var c in this.player.classes) {
            classes.push("L" + this.player.classes[c] + " " + c);
        }
        return {
            message: attributes + " " + this.player.experience + " experience, " + this.player.gold + " gold. Classes: " + classes.join(', '),
            success: true
        };
    };
    Status.keyword = ':!status';
    Status.whisper = true;
    return Status;
}(Action_1.Action));
exports.Status = Status;
//# sourceMappingURL=Status.js.map