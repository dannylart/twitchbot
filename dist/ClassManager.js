"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Artisan_1 = require("./classes/Artisan");
var Chemist_1 = require("./classes/Chemist");
var Cleric_1 = require("./classes/Cleric");
var Fighter_1 = require("./classes/Fighter");
var Knight_1 = require("./classes/Knight");
var Ranger_1 = require("./classes/Ranger");
var Rogue_1 = require("./classes/Rogue");
var Wizard_1 = require("./classes/Wizard");
var ClassManager = /** @class */ (function () {
    function ClassManager() {
    }
    ClassManager.getClass = function (cls, level) {
        for (var _i = 0, _a = ClassManager.classes; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.keyword === cls)
                return new c(level);
        }
        return null;
    };
    return ClassManager;
}());
exports.ClassManager = ClassManager;
ClassManager.classes = [];
ClassManager.classes.push(Artisan_1.Artisan);
ClassManager.classes.push(Fighter_1.Fighter);
ClassManager.classes.push(Chemist_1.Chemist);
ClassManager.classes.push(Cleric_1.Cleric);
ClassManager.classes.push(Knight_1.Knight);
ClassManager.classes.push(Ranger_1.Ranger);
ClassManager.classes.push(Rogue_1.Rogue);
ClassManager.classes.push(Wizard_1.Wizard);
//# sourceMappingURL=ClassManager.js.map