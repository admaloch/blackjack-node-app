"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handReset = void 0;
// resets hand info in playerHands array
const handReset = (player) => {
    if ("betDoubled" in player)
        player.betDoubled = false;
    player.hand = [];
    player.handValues = [];
    player.sum = 0;
    player.isBlackjack = false;
    return player;
};
exports.handReset = handReset;
