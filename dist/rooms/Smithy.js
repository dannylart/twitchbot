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
var Goblin_1 = require("../enemies/Goblin");
var Room_1 = require("../Room");
var Smithy = /** @class */ (function (_super) {
    __extends(Smithy, _super);
    function Smithy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Smithy.prototype, "name", {
        get: function () {
            return 'Smithy';
        },
        enumerable: true,
        configurable: true
    });
    Smithy.prototype.generate = function () {
        this.addEnemy(Goblin_1.Goblin);
    };
    return Smithy;
}(Room_1.Room));
exports.Smithy = Smithy;
//# sourceMappingURL=Smithy.js.map