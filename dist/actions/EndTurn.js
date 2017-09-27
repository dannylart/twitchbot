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
var EndTurn = /** @class */ (function (_super) {
    __extends(EndTurn, _super);
    function EndTurn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EndTurn.prototype.process = function () {
        this.game.endTurn();
        return {
            success: true
        };
    };
    EndTurn.keyword = ':!endturn';
    EndTurn.types = [
        EActionType_1.EActionType.COMBAT,
        EActionType_1.EActionType.EXPLORATION
    ];
    return EndTurn;
}(Action_1.Action));
exports.EndTurn = EndTurn;
//# sourceMappingURL=EndTurn.js.map