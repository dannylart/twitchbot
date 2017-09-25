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
var Artisan = /** @class */ (function (_super) {
    __extends(Artisan, _super);
    function Artisan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attributes = {
            health: 0,
            mana: 0,
            strength: 4,
            dexterity: 4,
            intelligence: 4,
            luck: 4
        };
        _this.spells = [
            '',
            '',
            '',
            '',
            ''
        ];
        _this.recipes = [
            'potion',
            'torch',
            'antidote',
            '',
            ''
        ];
        return _this;
    }
    Artisan.keyword = 'artisan';
    return Artisan;
}(Class_1.Class));
exports.Artisan = Artisan;
//# sourceMappingURL=Artisan.js.map