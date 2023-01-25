"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBankEmpty = void 0;
const print_1 = require("./print");
const space = '--------------------------------------------------';
// when player leaves or runs out of money
const isBankEmpty = (player) => {
    if (player.bank < 5) {
        (0, print_1.print)(`${player.name} ran out of money and has left the table`);
        return false;
    }
    else {
        return true;
    }
};
exports.isBankEmpty = isBankEmpty;
