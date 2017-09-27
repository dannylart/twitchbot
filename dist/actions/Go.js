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
var Action_1 = require("../Action");
var EActionType_1 = require("../EActionType");
var Go = /** @class */ (function (_super) {
    __extends(Go, _super);
    function Go() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Go.prototype.process = function () {
        var direction = this.parts[1];
        var directions = [];
        var coords = [this.game.room.x, this.game.room.y];
        if (this.game.room.y !== 1)
            directions.push('north');
        if (this.game.room.x !== this.game.roomWidth)
            directions.push('east');
        if (this.game.room.y !== this.game.roomWidth)
            directions.push('south');
        if (this.game.room.x !== 1)
            directions.push('west');
        if (!direction)
            return {
                message: "The party is currently at [" + coords[0] + ", " + coords[1] + "], " + this.game.room.display + ". You can go the following directions: " + directions.join(', '),
                success: false
            };
        if (directions.indexOf(direction) === -1)
            return {
                message: this.parts[1] + " is not a valid direction. Choices are: " + directions.join(', '),
                success: false
            };
        if (direction === 'north')
            coords[1] -= 1;
        if (direction === 'east')
            coords[0] += 1;
        if (direction === 'south')
            coords[1] += 1;
        if (direction === 'west')
            coords[0] -= 1;
        var room = this.game.getRoomFromCoords(coords[0], coords[1]);
        if (room) {
            this.game.changeRoom(room);
            return {
                message: this.player.name + " advances the party to " + room.display + ".",
                success: true
            };
        }
        else {
            return {
                message: this.player.name + " advances the party " + this.parts[1] + ".",
                success: false
            };
        }
    };
    Go.keyword = ':!go';
    Go.types = [EActionType_1.EActionType.EXPLORATION];
    return Go;
}(Action_1.Action));
exports.Go = Go;
//# sourceMappingURL=Go.js.map