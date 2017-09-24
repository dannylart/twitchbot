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
var Flee = /** @class */ (function (_super) {
    __extends(Flee, _super);
    function Flee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Flee.prototype.process = function () {
        return {
            message: this.player.name + " flees.",
            success: true
        };
    };
    Flee.keyword = ':!flee';
    return Flee;
}(Action_1.Action));
exports.Flee = Flee;
//# sourceMappingURL=Flee.js.map