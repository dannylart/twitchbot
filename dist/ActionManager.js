"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Attack_1 = require("./actions/Attack");
var Cast_1 = require("./actions/Cast");
var Craft_1 = require("./actions/Craft");
var EndTurn_1 = require("./actions/EndTurn");
var Examine_1 = require("./actions/Examine");
var Flee_1 = require("./actions/Flee");
var Go_1 = require("./actions/Go");
var Hide_1 = require("./actions/Hide");
var Inventory_1 = require("./actions/Inventory");
var Level_1 = require("./actions/Level");
var Loot_1 = require("./actions/Loot");
var Status_1 = require("./actions/Status");
var Take_1 = require("./actions/Take");
var Use_1 = require("./actions/Use");
var ActionManager = /** @class */ (function () {
    function ActionManager() {
    }
    ActionManager.getActions = function (actionType) {
        var actions = [];
        for (var _i = 0, _a = ActionManager.actions; _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.types.indexOf(actionType) > -1)
                actions.push(a.keyword.substr(1));
        }
        return actions;
    };
    ActionManager.actionHasType = function (action, t) {
        return action.types.indexOf(t) > -1;
    };
    return ActionManager;
}());
exports.ActionManager = ActionManager;
ActionManager.actions = [];
ActionManager.actions.push(Attack_1.Attack);
ActionManager.actions.push(Cast_1.Cast);
ActionManager.actions.push(Craft_1.Craft);
ActionManager.actions.push(EndTurn_1.EndTurn);
ActionManager.actions.push(Examine_1.Examine);
ActionManager.actions.push(Flee_1.Flee);
ActionManager.actions.push(Go_1.Go);
ActionManager.actions.push(Hide_1.Hide);
ActionManager.actions.push(Inventory_1.Inventory);
ActionManager.actions.push(Level_1.Level);
ActionManager.actions.push(Loot_1.Loot);
ActionManager.actions.push(Status_1.Status);
ActionManager.actions.push(Take_1.Take);
ActionManager.actions.push(Use_1.Use);
//# sourceMappingURL=ActionManager.js.map