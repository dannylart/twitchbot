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
var Chemist = /** @class */ (function (_super) {
    __extends(Chemist, _super);
    function Chemist() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attributes = {
            health: 10,
            mana: 15,
            strength: 0,
            dexterity: 0,
            intelligence: 1,
            luck: 1
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
            'ether',
            'elixir',
            'antidote',
            'phoenixdown'
        ];
        return _this;
    }
    Chemist.keyword = 'chemist';
    Chemist.requirements = {
        artisan: 2
    };
    return Chemist;
}(Class_1.Class));
exports.Chemist = Chemist;
//# sourceMappingURL=Chemist.js.map