"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Action = /** @class */ (function () {
    function Action(game, player, parts) {
        this.game = game;
        this.player = player;
        this.parts = parts;
    }
    Action.combat = false;
    Action.whisper = false;
    return Action;
}());
exports.Action = Action;
//# sourceMappingURL=Action.js.map