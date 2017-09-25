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
var Goblin_1 = require("../enemies/Goblin");
var Room_1 = require("../Room");
var Entrance = /** @class */ (function (_super) {
    __extends(Entrance, _super);
    function Entrance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Entrance.prototype, "name", {
        get: function () {
            return 'Dungeon Entrance';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entrance.prototype, "description", {
        get: function () {
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Entrance.prototype.generate = function () {
        var count = 2 + Math.floor(this.difficulty / 5);
        for (var i = 1; i <= count; i++)
            this.addEnemy(Goblin_1.Goblin);
    };
    return Entrance;
}(Room_1.Room));
exports.Entrance = Entrance;
//# sourceMappingURL=Entrance.js.map