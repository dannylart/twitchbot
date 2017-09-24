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
var Dragon = /** @class */ (function (_super) {
    __extends(Dragon, _super);
    function Dragon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attributes = {
            health: 1500,
            mana: 100,
            strength: 15,
            dexterity: 10,
            intelligence: 10,
            luck: 10
        };
        _this.attributesPerLevel = {
            health: 200,
            mana: 20,
            strength: 2.5,
            dexterity: 2,
            intelligence: 2,
            luck: .5
        };
        return _this;
    }
    Object.defineProperty(Dragon.prototype, "name", {
        get: function () {
            return 'Dragon';
        },
        enumerable: true,
        configurable: true
    });
    return Dragon;
}(Enemy_1.Enemy));
exports.Dragon = Dragon;
//# sourceMappingURL=Dragon.js.map