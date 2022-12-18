"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endGameResults = void 0;
const print_1 = require("./print");
const space = '--------------------------------------------------';
// displays final stats when game is over
const endGameResults = (player, roundNum) => {
    (0, print_1.print)('Game results:');
    (0, print_1.print)(space);
    (0, print_1.print)(`Total rounds played: ${roundNum}`);
    (0, print_1.print)(space);
    for (let i = 0; i < player.length; i++) {
        const loss = (1000 - player[i].bank);
        const gain = (player[i].bank - 1000);
        (0, print_1.print)(`${player[i].name}:`);
        (0, print_1.print)(`Bank: $${player[i].bank}`);
        (0, print_1.print)(`Rounds won: ${player[i].roundsWon}`);
        player[i].bank <= 1000
            ? (0, print_1.print)(`Money lost: $${loss}`)
            : (0, print_1.print)(`Money earned: $${gain}`);
        (0, print_1.print)(space);
    }
};
exports.endGameResults = endGameResults;
