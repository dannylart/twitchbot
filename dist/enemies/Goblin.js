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
var Enemy_1 = require("../Enemy");
var Goblin = /** @class */ (function (_super) {
    __extends(Goblin, _super);
    function Goblin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attributes = {
            health: 10,
            mana: 0,
            strength: 1,
            dexterity: 1,
            intelligence: 1,
            luck: 1
        };
        return _this;
    }
    Object.defineProperty(Goblin.prototype, "name", {
        get: function () {
            return 'Goblin';
        },
        enumerable: true,
        configurable: true
    });
    return Goblin;
}(Enemy_1.Enemy));
exports.Goblin = Goblin;
//# sourceMappingURL=Goblin.js.map