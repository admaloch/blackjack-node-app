"use strict";
exports.__esModule = true;
exports.roundResults = void 0;
var print_1 = require("./print");
var space = '--------------------------------------------------';
var roundResults = function (player, dealer) {
    //scenarios if player or dealer get blackjack
    if (player.isBlackjack && dealer.isBlackjack) {
        (0, print_1.print)("".concat(player.name, ": Blackjack -- Push"));
        player.bank += player.bet;
    }
    else if (player.isBlackjack && !dealer.isBlackjack) {
        (0, print_1.print)("".concat(player.name, ": Blackjack! -- ").concat(player.name, " wins!"));
        player.bank += player.bet * 2.5;
        player.roundsWon++;
    }
    else if (!player.isBlackjack && dealer.isBlackjack) {
        (0, print_1.print)("".concat(player.name, "'s sum: ").concat(player.sum, " -- The dealer won"));
    }
    else if (player.sum > 21 && dealer.isBlackjack) {
        (0, print_1.print)("".concat(player.name, "'s sum: ").concat(player.sum, " -- ").concat(player.name, " bust -- The dealer won"));
    }
    //scenarios if player or dealer bust 
    else if (player.sum > 21 && dealer.sum > 21) {
        (0, print_1.print)("".concat(player.name, "'s sum: ").concat(player.sum, " -- ").concat(player.name, " Bust! -- Push "));
        player.bank += player.bet;
    }
    else if (player.sum > 21 && dealer.sum <= 21) {
        (0, print_1.print)("".concat(player.name, "'s sum: ").concat(player.sum, " -- bust! The dealer won"));
    }
    else if (player.sum <= 21 && dealer.sum > 21) {
        (0, print_1.print)("".concat(player.name, "'s sum: ").concat(player.sum, " -- ").concat(player.name, " won!"));
        player.bank += player.bet * 2;
        player.roundsWon++;
    }
    //if neither player nor dealer bust 
    else if (player.sum > dealer.sum) {
        (0, print_1.print)("".concat(player.name, "'s sum: ").concat(player.sum, " -- ").concat(player.name, " won!"));
        player.bank += player.bet * 2;
        player.roundsWon++;
    }
    else if (player.sum === dealer.sum) {
        (0, print_1.print)("".concat(player.name, "'s sum: ").concat(player.sum, " -- Push"));
        player.bank += player.bet;
    }
    else {
        (0, print_1.print)("".concat(player.name, "'s sum: ").concat(player.sum, " -- The dealer won"));
    }
    return player;
};
exports.roundResults = roundResults;
