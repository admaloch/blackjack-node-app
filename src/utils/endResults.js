"use strict";
exports.__esModule = true;
exports.endGameResults = void 0;
var print_1 = require("./print");
var space = '--------------------------------------------------';
// displays final stats when game is over
var endGameResults = function (player, roundNum) {
    (0, print_1.print)('Game results:');
    (0, print_1.print)(space);
    (0, print_1.print)("Total rounds played: ".concat(roundNum));
    (0, print_1.print)(space);
    for (var i = 0; i < player.length; i++) {
        var loss = (1000 - player[i].bank);
        var gain = (player[i].bank - 1000);
        (0, print_1.print)("".concat(player[i].name, ":"));
        (0, print_1.print)("Bank: $".concat(player[i].bank));
        (0, print_1.print)("Rounds won: ".concat(player[i].roundsWon));
        player[i].bank <= 1000
            ? (0, print_1.print)("Money lost: $".concat(loss))
            : (0, print_1.print)("Money earned: $".concat(gain));
        (0, print_1.print)(space);
    }
};
exports.endGameResults = endGameResults;
