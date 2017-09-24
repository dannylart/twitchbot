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
var Wizard_1 = require("../enemies/Wizard");
var Room_1 = require("../Room");
var Library = /** @class */ (function (_super) {
    __extends(Library, _super);
    function Library() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Library.prototype, "name", {
        get: function () {
            return 'Library';
        },
        enumerable: true,
        configurable: true
    });
    Library.prototype.generate = function () {
        this.addEnemy(Wizard_1.Wizard);
        this.addEnemy(Wizard_1.Wizard);
    };
    return Library;
}(Room_1.Room));
exports.Library = Library;
//# sourceMappingURL=Library.js.map