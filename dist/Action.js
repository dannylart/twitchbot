"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Action = /** @class */ (function () {
    function Action(game, player, parts) {
        this.game = game;
        this.player = player;
        this.parts = parts;
    }
    Action.prototype.addPartyExperience = function (experience) {
        for (var _i = 0, _a = this.game.alivePlayers; _i < _a.length; _i++) {
            var player = _a[_i];
            player.addExperience(experience);
        }
        return "The party has gained " + experience + " experience.";
    };
    Action.combat = false;
    Action.whisper = false;
    return Action;
}());
exports.Action = Action;
//# sourceMappingURL=Action.js.map