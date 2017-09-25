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
var Rogue = /** @class */ (function (_super) {
    __extends(Rogue, _super);
    function Rogue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attributes = {
            health: 40,
            mana: 20,
            strength: 5,
            dexterity: 5,
            intelligence: 1,
            luck: 3
        };
        _this.spells = [
            'doublestrike',
            'sap',
            'fanofknives',
            'cloakofshadows',
            ''
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
    Rogue.keyword = 'rogue';
    return Rogue;
}(Class_1.Class));
exports.Rogue = Rogue;
//# sourceMappingURL=Rogue.js.map