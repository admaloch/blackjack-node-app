"use strict";
exports.__esModule = true;
exports.isBankEmpty = void 0;
var print_1 = require("./print");
var space = '--------------------------------------------------';
// when player leaves or runs out of money
var isBankEmpty = function (player) {
    if (player.bank < 5) {
        (0, print_1.print)("".concat(player.name, " ran out of money and has left the table"));
        (0, print_1.print)(space);
        return false;
    }
    else {
        return true;
    }
};
exports.isBankEmpty = isBankEmpty;
