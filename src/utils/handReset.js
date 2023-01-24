"use strict";
exports.__esModule = true;
exports.handReset = void 0;
// resets hand info in playerHands array
var handReset = function (player) {
    if ("betDoubled" in player)
        player.betDoubled = false;
    player.hand = [];
    player.handValues = [];
    player.sum = 0;
    player.isBlackjack = false;
    return player;
};
exports.handReset = handReset;
