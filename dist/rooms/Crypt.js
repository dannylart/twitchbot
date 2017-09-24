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
var Dragon_1 = require("../enemies/Dragon");
var Room_1 = require("../Room");
var Crypt = /** @class */ (function (_super) {
    __extends(Crypt, _super);
    function Crypt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Crypt.prototype, "name", {
        get: function () {
            return 'The Crypt';
        },
        enumerable: true,
        configurable: true
    });
    Crypt.prototype.generate = function () {
        var dragon = this.addEnemy(Dragon_1.Dragon);
        dragon.once('death', this.endGame, this);
    };
    return Crypt;
}(Room_1.Room));
exports.Crypt = Crypt;
//# sourceMappingURL=Crypt.js.map