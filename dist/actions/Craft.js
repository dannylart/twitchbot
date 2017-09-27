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
var Craft = /** @class */ (function (_super) {
    __extends(Craft, _super);
    function Craft() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Craft.prototype.process = function () {
        return { message: this.player.name + " crafts.", success: false };
    };
    Craft.keyword = ':!craft';
    Craft.types = [
        EActionType_1.EActionType.GENERAL,
        EActionType_1.EActionType.WHISPER,
        EActionType_1.EActionType.EXPLORATION
    ];
    return Craft;
}(Action_1.Action));
exports.Craft = Craft;
//# sourceMappingURL=Craft.js.map