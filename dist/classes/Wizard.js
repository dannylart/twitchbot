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
var Class_1 = require("../Class");
var Wizard = /** @class */ (function (_super) {
    __extends(Wizard, _super);
    function Wizard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attributes = {
            health: 60,
            mana: 40,
            strength: 0,
            dexterity: 0,
            intelligence: 5,
            luck: 1
        };
        _this.spells = [
            'frostbolt',
            'stoneskin',
            'shock',
            'firebolt',
            'imp'
        ];
        _this.recipes = [
            '',
            '',
            '',
            '',
            ''
        ];
        return _this;
    }
    Wizard.keyword = 'wizard';
    return Wizard;
}(Class_1.Class));
exports.Wizard = Wizard;
//# sourceMappingURL=Wizard.js.map