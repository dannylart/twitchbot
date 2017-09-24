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
var Examine = /** @class */ (function (_super) {
    __extends(Examine, _super);
    function Examine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Examine.prototype.process = function () {
        return {
            message: this.player.name + " examines " + this.parts[1] + ".",
            success: true
        };
    };
    Examine.keyword = ':!examine';
    return Examine;
}(Action_1.Action));
exports.Examine = Examine;
//# sourceMappingURL=Examine.js.map