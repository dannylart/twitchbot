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
var Fighter = /** @class */ (function (_super) {
    __extends(Fighter, _super);
    function Fighter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attributes = {
            health: 100,
            mana: 0,
            strength: 5,
            dexterity: 1,
            intelligence: 0,
            luck: 0
        };
        _this.spells = [
            'focus',
            'rush',
            'stone',
            'salve',
            'rend'
        ];
        _this.recipes = [
            'torch',
            '',
            'campfire',
            '',
            ''
        ];
        return _this;
    }
    Fighter.keyword = 'fighter';
    return Fighter;
}(Class_1.Class));
exports.Fighter = Fighter;
//# sourceMappingURL=Fighter.js.map