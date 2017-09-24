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
var Wizard = /** @class */ (function (_super) {
    __extends(Wizard, _super);
    function Wizard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attributes = {
            health: 400,
            mana: 50,
            strength: 1,
            dexterity: 1,
            intelligence: 5,
            luck: 2
        };
        _this.attributesPerLevel = {
            health: 40,
            mana: 10,
            strength: .25,
            dexterity: .25,
            intelligence: 1,
            luck: .5
        };
        return _this;
    }
    Object.defineProperty(Wizard.prototype, "name", {
        get: function () {
            return 'Wizard';
        },
        enumerable: true,
        configurable: true
    });
    return Wizard;
}(Enemy_1.Enemy));
exports.Wizard = Wizard;
//# sourceMappingURL=Wizard.js.map