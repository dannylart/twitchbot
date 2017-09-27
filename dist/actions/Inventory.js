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
var Inventory = /** @class */ (function (_super) {
    __extends(Inventory, _super);
    function Inventory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Inventory.prototype.process = function () {
        var items = [];
        for (var i in this.player.inventory) {
            items.push(this.player.inventory[i] + "x " + i);
        }
        return {
            message: items.length > 0 ? this.player.name + " has the following items: " + items.join(', ') : this.player.name + " has no items.",
            success: items.length > 0
        };
    };
    Inventory.keyword = ':!inventory';
    Inventory.types = [
        EActionType_1.EActionType.GENERAL,
        EActionType_1.EActionType.WHISPER,
        EActionType_1.EActionType.EXPLORATION
    ];
    return Inventory;
}(Action_1.Action));
exports.Inventory = Inventory;
//# sourceMappingURL=Inventory.js.map