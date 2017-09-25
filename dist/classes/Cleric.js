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
var Cleric = /** @class */ (function (_super) {
    __extends(Cleric, _super);
    function Cleric() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attributes = {
            health: 40,
            mana: 60,
            strength: 0,
            dexterity: 0,
            intelligence: 6,
            luck: 0
        };
        _this.spells = [
            'heal',
            '',
            '',
            '',
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
    Cleric.keyword = 'cleric';
    return Cleric;
}(Class_1.Class));
exports.Cleric = Cleric;
//# sourceMappingURL=Cleric.js.map