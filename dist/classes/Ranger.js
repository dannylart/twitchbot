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
var Ranger = /** @class */ (function (_super) {
    __extends(Ranger, _super);
    function Ranger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attributes = {
            health: 60,
            mana: 40,
            strength: 0,
            dexterity: 5,
            intelligence: 0,
            luck: 1
        };
        _this.spells = [
            'multishot',
            '',
            '',
            '',
            'snipe'
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
    Ranger.keyword = 'ranger';
    return Ranger;
}(Class_1.Class));
exports.Ranger = Ranger;
//# sourceMappingURL=Ranger.js.map