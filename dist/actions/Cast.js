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
var Cast = /** @class */ (function (_super) {
    __extends(Cast, _super);
    function Cast() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cast.prototype.process = function () {
        return {
            message: this.player.name + " casts " + this.parts[1] + " at " + this.parts[2] + ".",
            success: false
        };
    };
    Cast.keyword = ':!cast';
    Cast.combat = true;
    return Cast;
}(Action_1.Action));
exports.Cast = Cast;
//# sourceMappingURL=Cast.js.map